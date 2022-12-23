import"./chunk-C4F6RPWQ.mjs";import{TypedEmitter as p}from"tiny-typed-emitter";var h=(a=>(a[a.InitEnv=1]="InitEnv",a[a.PhaseTransition=2]="PhaseTransition",a[a.NewPC=3]="NewPC",a[a.NewNpc=4]="NewNpc",a[a.Death=5]="Death",a[a.SkillStart=6]="SkillStart",a[a.SkillStage=7]="SkillStage",a[a.Damage=8]="Damage",a[a.Heal=9]="Heal",a[a.Buff=10]="Buff",a[a.BuffRemove=11]="BuffRemove",a[a.CounterAttack=12]="CounterAttack",a[a.Line15=15]="Line15",a[a.Debug=251]="Debug",a[a.PacketDump=252]="PacketDump",a[a.Version=253]="Version",a[a.Error=254]="Error",a))(h||{}),g=class extends p{#a;emitText;emitLines;emitObjects;#g;#i;#d;#m;#n;constructor(s,n,l={}){super(),this.#a=n,this.emitText=l.emitText||!0,this.emitLines=l.emitLines||!0,this.emitObjects=l.emitObjects||!1,this.#g=new Set,this.#i=new m,this.#d=!1,this.#m=!1,this.#n={name:"You",class:0,gearLevel:0},s.on("PKTAuthTokenResult",t=>{}).on("PKTCounterAttackNotify",t=>{if(this.#t){let e=t.parsed;this.#e(12,e.SourceId,this.#s(e.SourceId),e.TargetId,this.#s(e.TargetId))}}).on("PKTDeathNotify",t=>{if(this.#t){let e=t.parsed;this.#e(5,e.TargetId,this.#s(e.TargetId),e.SourceId,this.#s(e.SourceId))}}).on("PKTInitEnv",t=>{let e=t.parsed;this.#i=new m;let i={entityId:e.PlayerId,entityType:d.Player,name:this.#n.name,class:this.#n.class,gearLevel:this.#n.gearLevel};this.#i.entities.set(i.entityId,i),this.#t&&this.#e(1,i.entityId)}).on("PKTInitPC",t=>{let e=t.parsed;this.#n={name:e.Name,class:e.ClassId,gearLevel:this.#c(e.GearLevel)};let i={entityId:e.PlayerId,entityType:d.Player,name:e.Name,class:e.ClassId,gearLevel:this.#c(e.GearLevel)};if(this.#i.entities.set(i.entityId,i),this.#t){let o=this.#r(t.parsed.statPair);this.#e(3,i.entityId,i.name,i.class,this.#a.getClassName(i.class),e.Level,i.gearLevel,Number(o.get(1))||0,Number(o.get(27))||0)}}).on("PKTNewNpc",t=>{let e=t.parsed,i={entityId:e.NpcStruct.ObjectId,entityType:d.Npc,name:this.#a.getNpcName(e.NpcStruct.TypeId),typeId:e.NpcStruct.TypeId};if(this.#i.entities.set(i.entityId,i),this.#t){let o=this.#r(t.parsed.NpcStruct.statPair);this.#e(4,i.entityId,i.typeId,i.name,Number(o.get(1))||0,Number(o.get(27))||0)}}).on("PKTNewNpcSummon",t=>{let e=t.parsed,i={entityId:e.NpcData.ObjectId,entityType:d.Summon,name:e.NpcData.ObjectId.toString(16),ownerId:e.OwnerId};this.#i.entities.set(i.entityId,i)}).on("PKTNewPC",t=>{let e=t.parsed,i={entityId:e.PCStruct.PlayerId,entityType:d.Player,name:e.PCStruct.Name,class:e.PCStruct.ClassId,gearLevel:this.#c(e.PCStruct.GearLevel)};if(this.#i.entities.set(i.entityId,i),this.#t){let o=this.#r(t.parsed.PCStruct.statPair);this.#e(3,i.entityId,i.name,i.class,this.#a.getClassName(i.class),e.PCStruct.Level,i.gearLevel,Number(o.get(1))||0,Number(o.get(27))||0)}}).on("PKTNewProjectile",t=>{let e=t.parsed,i={entityId:e.projectileInfo.ProjectileId,entityType:d.Projectile,name:e.projectileInfo.ProjectileId.toString(16),ownerId:e.projectileInfo.OwnerId};this.#i.entities.set(i.entityId,i)}).on("PKTParalyzationStateNotify",t=>{}).on("PKTPartyInfo",t=>{}).on("PKTPartyLeaveResult",t=>{}).on("PKTPartyStatusEffectAddNotify",t=>{}).on("PKTPartyStatusEffectRemoveNotify",t=>{}).on("PKTPartyStatusEffectResultNotify",t=>{}).on("PKTRaidBossKillNotify",t=>{this.#t&&this.#e(2,1)}).on("PKTRaidResult",t=>{this.#t&&this.#e(2,0)}).on("PKTRemoveObject",t=>{}).on("PKTSkillDamageAbnormalMoveNotify",t=>{if(this.#t){let e=t.parsed,i=this.#l(e.SourceId),o=this.#a.getSkillName(e.SkillId),c=this.#a.getSkillEffectComment(e.SkillEffectId);i=this.#o(i,e.SkillId),e.SkillDamageAbnormalMoveEvents.forEach(r=>{(r.skillDamageEvent.Modifier&15)===11&&e.SkillId===0&&e.SkillEffectId===0||(e.SkillId===0&&e.SkillEffectId===0&&r.skillDamageEvent.Modifier&12&&(o="Bleed"),this.#e(8,i.entityId,i.name,e.SkillId,o,e.SkillEffectId,c,r.skillDamageEvent.TargetId,this.#s(r.skillDamageEvent.TargetId),Number(r.skillDamageEvent.Damage),r.skillDamageEvent.Modifier.toString(16),Number(r.skillDamageEvent.CurHp),Number(r.skillDamageEvent.MaxHp)))})}}).on("PKTSkillDamageNotify",t=>{if(this.#t){let e=t.parsed,i=this.#l(e.SourceId),o=this.#a.getSkillName(e.SkillId),c=this.#a.getSkillEffectComment(e.SkillEffectId);i=this.#o(i,e.SkillId),e.SkillDamageEvents.forEach(r=>{(r.Modifier&15)===11&&e.SkillId===0&&e.SkillEffectId===0||(e.SkillId===0&&e.SkillEffectId===0&&r.Modifier&12&&(o="Bleed"),this.#e(8,i.entityId,i.name,e.SkillId,o,e.SkillEffectId,c,r.TargetId,this.#s(r.TargetId),Number(r.Damage),r.Modifier.toString(16),Number(r.CurHp),Number(r.MaxHp)))})}}).on("PKTSkillStageNotify",t=>{if(this.#t){let e=t.parsed,i=this.#l(e.SourceId);i=this.#o(i,e.SkillId),this.#e(7,i.entityId,i.name,e.SkillId,this.#a.getSkillName(e.SkillId),e.Stage)}}).on("PKTSkillStartNotify",t=>{if(this.#t){let e=t.parsed,i=this.#l(e.SourceId);i=this.#o(i,e.SkillId),this.#e(6,i.entityId,i.name,e.SkillId,this.#a.getSkillName(e.SkillId))}}).on("PKTStatChangeOriginNotify",t=>{if(this.#t){let e=t.parsed,i=this.#r(t.parsed.StatPairList),o=this.#r(t.parsed.Unk1);this.#e(9,e.ObjectId,this.#s(e.ObjectId),Number(o.get(1))||0,Number(i.get(1))||0)}}).on("PKTStatusEffectAddNotify",t=>{}).on("PKTStatusEffectRemoveNotify",t=>{}).on("PKTTriggerBossBattleStatus",t=>{this.#t&&this.#e(2,2)}).on("PKTTriggerFinishNotify",t=>{}).on("PKTTriggerStartNotify",t=>{switch(t.parsed.TriggerSignalType){case 57:case 59:case 61:case 63:case 74:case 76:this.#m=!0,this.#d=!1;break;case 58:case 60:case 62:case 64:case 75:case 77:this.#m=!1,this.#d=!0;break}})}#e(s,...n){if(this.emitText){let l=`${s}|${new Date().toISOString()}|${n.map(t=>typeof t=="bigint"?t.toString(16):t).join("|")}`;this.emit("line",l)}this.emitLines&&this.emit(s,...n)}get#t(){return this.emitText||this.emitLines}#l(s){let n=this.#i.entities.get(s);if((n?.entityType===d.Projectile||n?.entityType===d.Summon)&&(s=n.ownerId),n=this.#i.entities.get(s),n)return n;let l={entityId:s,entityType:d.Npc,name:s.toString(16)};return this.#i.entities.set(s,l),l}#o(s,n){let l=this.#a.getSkillClassId(n);if(l!==0){let t;if(s.entityType===d.Player){let e=s;if(e.class==l)return e;t={entityId:e.entityId,entityType:d.Player,name:e.name,class:l,gearLevel:e.gearLevel}}else t={entityId:s.entityId,entityType:d.Player,name:s.name,class:l,gearLevel:0};return this.#i.entities.set(s.entityId,t),this.#e(3,t.entityId,t.name,t.class,this.#a.getClassName(t.class),1,t.gearLevel,0,0),t}return s}#s(s){return this.#i.entities.get(s)?.name||s.toString(16)}#r(s){let n=new Map;return s.forEach(l=>{n.set(l.Unk0_0_1,l.readNBytesInt64)}),n}#c(s){let n=Buffer.alloc(4);return n.writeUInt32LE(s),Math.round(n.readFloatLE()*100)/100}},m=class{start;entities;constructor(){this.start=Date.now(),this.entities=new Map}},d=(t=>(t[t.Player=0]="Player",t[t.Npc=1]="Npc",t[t.Summon=2]="Summon",t[t.Projectile=3]="Projectile",t))(d||{});export{g as LegacyLogger,h as LineId};
