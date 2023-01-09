import { PartyTracker } from "./partytracker";
import type { MeterData } from "./data";
import { readFileSync, writeFileSync } from "fs";

export enum StatusEffecType {
    Party = 0,
    Local = 1,
}
export interface StatusEffect {
    instanceId: number;
    statusEffectId: number;
    targetId: TargetId;
    sourceId: TargetId;
    started: Date;
    type: StatusEffecType;
    value: number;
    isPlayer: boolean;
    sourceIsPlayer: boolean;
}
type StatusEffectInstanceId = number;
type TargetId = bigint;
type StatusEffectRegistry = Map<StatusEffectInstanceId, StatusEffect>;
type PlayerStatusEffectRegistry = Map<TargetId, StatusEffectRegistry>;
export class StatusTracker {
    private static instance: StatusTracker;

    PartyStatusEffectRegistry: PlayerStatusEffectRegistry;
    LocalStatusEffectRegistry: PlayerStatusEffectRegistry;
    foundEffects: Map<number, string[]>;

    private constructor() {
        this.PartyStatusEffectRegistry = new Map();
        this.LocalStatusEffectRegistry = new Map();
        this.foundEffects = new Map();
        process.on('exit', this.persistFoundStatusEffects.bind(this));
        process.on('SIGTERM', this.persistFoundStatusEffects.bind(this));
        process.on('SIGINT', this.persistFoundStatusEffects.bind(this));
        process.on('SIGUSR1', this.persistFoundStatusEffects.bind(this));
        process.on('SIGUSR2', this.persistFoundStatusEffects.bind(this));
        this.loadFoundStatusEffects();
    }

    public static getInstance(): StatusTracker {
        if (!StatusTracker.instance) {
            StatusTracker.instance = new StatusTracker();
        }
        return StatusTracker.instance;
    }

    private getStatusEffectRegistryForPlayer(id: TargetId, t: StatusEffecType) : StatusEffectRegistry {
        var registry: PlayerStatusEffectRegistry = this.getPlayerRegistry(t);
        if (registry.has(id)) return registry.get(id)!;
        var newEntry : StatusEffectRegistry = new Map();
        registry.set(id, newEntry);
        return newEntry;
    }

    private getPlayerRegistry(t: StatusEffecType) : PlayerStatusEffectRegistry {
        switch (t) {
            case StatusEffecType.Local:
                return this.LocalStatusEffectRegistry;
            case StatusEffecType.Party:
                return this.PartyStatusEffectRegistry;
            default:
                break;
        }
        return this.LocalStatusEffectRegistry;
    }

    private sendCancelEffectInfo(seNew: StatusEffect, seOld: StatusEffect) {
        // TODO: Implement some callback or something
    }

    public RegisterValueUpdate(se: StatusEffect) {
        // TODO: Implement
    }

    public RegisterStatusEffect(se: StatusEffect, md: MeterData, sourceName: string, sourceClassName: string) {
        if (!se.isPlayer) {
            var skillBuff = md.getStatusEffectName(se.statusEffectId);
            this.foundEffects.set(se.statusEffectId, [skillBuff ? skillBuff.name : "", sourceName, sourceClassName]);
        }
        var registry = this.getStatusEffectRegistryForPlayer(se.targetId, se.type);
        // look if this effect already in on the target by instance id
        var effect = registry.get(se.instanceId);
        if (effect) {
            this.sendCancelEffectInfo(se, effect);
        }
        registry.set(se.instanceId, se);
    }

    public HasAnyStatusEffect(id: TargetId, t: StatusEffecType, statusEffectIds:number[]) : boolean {
        var registry: StatusEffectRegistry = this.getStatusEffectRegistryForPlayer(id, t);
        for (const effectId of registry) {
            for (const key of statusEffectIds) {
                if (key == effectId[1].statusEffectId)
                    return true;
            }
        }
        return false;
    }

    public HasAnyStatusEffectFromParty(targetId: TargetId, et: StatusEffecType, partyId: number, statusEffectIds:number[]) : boolean {
        var registry = this.getStatusEffectRegistryForPlayer(targetId, et);
        for (const effect of registry) {
            if (statusEffectIds.includes(effect[1].statusEffectId)) {
                var partyIdOfSource = PartyTracker.getInstance().getPartyIdFromEntityId(effect[1].sourceId);
                if (partyIdOfSource === partyId) return true;
            }
        }
        return false;
    }

    public RemoveStatusEffect(targetId: TargetId, statusEffectId: number, et: StatusEffecType) {
        var registry = this.getStatusEffectRegistryForPlayer(targetId, et);
        registry.delete(statusEffectId);
    }

    public persistFoundStatusEffects() {
        writeFileSync("foundeffects.json", JSON.stringify(Array.from(this.foundEffects)));
    }

    public loadFoundStatusEffects() {
        try {
            var data:Array<Array<number|Array<string>>> = JSON.parse(readFileSync("foundeffects.json", {encoding: "utf8"}))
            for (const e of data) {
                const key = e[0] as number;
                var valueArray = e[1] as Array<string>;
                const skillName = valueArray[0]!;
                const skillCasterName = valueArray[1]!;
                const mval:string[] = [];
                mval.push(skillName);
                mval.push(skillCasterName);
                if (valueArray.length > 2) {
                    mval.push(valueArray[2] as string);
                } else {
                    mval.push("");
                }
                this.foundEffects.set(key, mval);
            }
        } catch(err) {
            console.error(err);
        }
    }
}