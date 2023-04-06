// Auto Generated, do not edit.
import type { PKT } from "../../pkt-stream";
import type * as types from "./types";
export interface PKTStreamEvents {
  PKTAbilityChangeNotify: (pkt: PKT<types.PKTAbilityChangeNotify>) => void;
  PKTActiveAbilityNotify: (pkt: PKT<types.PKTActiveAbilityNotify>) => void;
  PKTAddonSkillFeatureChangeNotify: (pkt: PKT<types.PKTAddonSkillFeatureChangeNotify>) => void;
  PKTAuthTokenResult: (pkt: PKT<types.PKTAuthTokenResult>) => void;
  PKTBlockSkillStateNotify: (pkt: PKT<types.PKTBlockSkillStateNotify>) => void;
  PKTCounterAttackNotify: (pkt: PKT<types.PKTCounterAttackNotify>) => void;
  PKTDeathNotify: (pkt: PKT<types.PKTDeathNotify>) => void;
  PKTInitAbility: (pkt: PKT<types.PKTInitAbility>) => void;
  PKTInitEnv: (pkt: PKT<types.PKTInitEnv>) => void;
  PKTInitPC: (pkt: PKT<types.PKTInitPC>) => void;
  PKTInitLocal: (pkt: PKT<types.PKTInitLocal>) => void;
  PKTMigrationExecute: (pkt: PKT<types.PKTMigrationExecute>) => void;
  PKTNewNpc: (pkt: PKT<types.PKTNewNpc>) => void;
  PKTNewNpcSummon: (pkt: PKT<types.PKTNewNpcSummon>) => void;
  PKTNewPC: (pkt: PKT<types.PKTNewPC>) => void;
  PKTNewProjectile: (pkt: PKT<types.PKTNewProjectile>) => void;
  PKTParalyzationStateNotify: (pkt: PKT<types.PKTParalyzationStateNotify>) => void;
  PKTPartyInfo: (pkt: PKT<types.PKTPartyInfo>) => void;
  PKTPartyLeaveResult: (pkt: PKT<types.PKTPartyLeaveResult>) => void;
  PKTPartyPassiveStatusEffectAddNotify: (pkt: PKT<types.PKTPartyPassiveStatusEffectAddNotify>) => void;
  PKTPartyPassiveStatusEffectRemoveNotify: (pkt: PKT<types.PKTPartyPassiveStatusEffectRemoveNotify>) => void;
  PKTPartyStatusEffectAddNotify: (pkt: PKT<types.PKTPartyStatusEffectAddNotify>) => void;
  PKTPartyStatusEffectRemoveNotify: (pkt: PKT<types.PKTPartyStatusEffectRemoveNotify>) => void;
  PKTPartyStatusEffectResultNotify: (pkt: PKT<types.PKTPartyStatusEffectResultNotify>) => void;
  PKTPassiveStatusEffectAddNotify: (pkt: PKT<types.PKTPassiveStatusEffectAddNotify>) => void;
  PKTPassiveStatusEffectRemoveNotify: (pkt: PKT<types.PKTPassiveStatusEffectRemoveNotify>) => void;
  PKTRaidBossKillNotify: (pkt: PKT<types.PKTRaidBossKillNotify>) => void;
  PKTRaidResult: (pkt: PKT<types.PKTRaidResult>) => void;
  PKTRemoveObject: (pkt: PKT<types.PKTRemoveObject>) => void;
  PKTSkillDamageAbnormalMoveNotify: (pkt: PKT<types.PKTSkillDamageAbnormalMoveNotify>) => void;
  PKTSkillDamageNotify: (pkt: PKT<types.PKTSkillDamageNotify>) => void;
  PKTSkillStageNotify: (pkt: PKT<types.PKTSkillStageNotify>) => void;
  PKTSkillStartNotify: (pkt: PKT<types.PKTSkillStartNotify>) => void;
  PKTStatChangeOriginNotify: (pkt: PKT<types.PKTStatChangeOriginNotify>) => void;
  PKTStatusEffectAddNotify: (pkt: PKT<types.PKTStatusEffectAddNotify>) => void;
  PKTStatusEffectRemoveNotify: (pkt: PKT<types.PKTStatusEffectRemoveNotify>) => void;
  PKTStatusEffectDurationNotify: (pkt: PKT<types.PKTStatusEffectDurationNotify>) => void;
  PKTStatusEffectSyncDataNotify: (pkt: PKT<types.PKTStatusEffectSyncDataNotify>) => void;
  PKTTriggerBossBattleStatus: (pkt: PKT<types.PKTTriggerBossBattleStatus>) => void;
  PKTTriggerFinishNotify: (pkt: PKT<types.PKTTriggerFinishNotify>) => void;
  PKTTriggerStartNotify: (pkt: PKT<types.PKTTriggerStartNotify>) => void;
  PKTTroopMemberUpdateMinNotify: (pkt: PKT<types.PKTTroopMemberUpdateMinNotify>) => void;
  PKTIdentityGaugeChangeNotify: (pkt: PKT<types.PKTIdentityGaugeChangeNotify>) => void;
  PKTZoneObjectUnpublishNotify: (pkt: PKT<types.PKTZoneObjectUnpublishNotify>) => void;
  "*": (data: Buffer, opcode: number, compression: number, xor: boolean) => void;
}
