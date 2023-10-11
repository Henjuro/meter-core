import{a as ot,b as lt}from"../chunk-E4UYOMO6.mjs";import"../chunk-X6HLKODA.mjs";import{a as ct,b as ft,c as Q,e as dt}from"../chunk-XBXQ3QYP.mjs";import{a as O,b as tt,g as et,h as at,i as G}from"../chunk-VWPQG6MN.mjs";import"../chunk-ZGEJ7KGT.mjs";import"../chunk-UVDPNHKF.mjs";import{a as H,b as v,c as K,d as $}from"../chunk-K7C7TUE5.mjs";import{TypedEmitter as kt}from"tiny-typed-emitter";import{TypedEmitter as Et}from"tiny-typed-emitter";import{createHash as yt}from"crypto";import St from"axios";var T,N,q,it=class{constructor(a,r,i){K(this,T,void 0);K(this,N,void 0);K(this,q,void 0);H(this,"ip");H(this,"zoneSyncStatus",0);H(this,"cache",new Map);i&&$(this,T,i),$(this,N,a),$(this,q,r)}syncData(){let a=[];v(this,N).entities.forEach(r=>{r.entityType===1&&a.push(r)}),this.getPlayersData(a)}getPlayersData(a,r=0){if(r>24){a.forEach(s=>{let e=this.cache.get(s.name);e&&e.status===1?e.status=0:e||this.cache.set(s.name,{hash:"",status:0,info:{name:s.name,stats:[]}})});return}if(!this.isCurrentZoneValid()){a.forEach(s=>{let e=this.cache.get(s.name);e&&e.status===1&&this.cache.delete(s.name)});return}if(!v(this,T)||!this.ip)return;let i={};a.forEach(s=>{let e=this.getHash(s),t=this.cache.get(s.name);if(!e){t&&t.status===1&&this.cache.delete(s.name);return}t&&(t.status===0||r===0&&t.status===1||t.status===2&&t.hash===e)||(t?(t.hash=e,t.status=1):t={hash:e,status:1,info:{name:s.name,stats:[]}},this.cache.set(s.name,t),i[s.name]=e)}),Object.keys(i).length!==0&&St.get(`${it.baseUrl}/req2`,{params:{ip:this.ip,ci:v(this,q),...i}}).then(s=>{if(s.status===200&&v(this,T))try{let e=s.data,t=ft.get(6e4);if(t){let[n,c,l]=t,g={players:e};if(a=a.filter(I=>!e.find(p=>p.name===I.name)),a.length>0&&setTimeout(()=>{a=a.map(I=>v(this,N).getEntityByName(I.name)).filter(I=>I!==void 0&&I.entityType===1),this.getPlayersData(a,r+1)},1e4),g.players.length>0){let I=new Q(g,6e4,l);v(this,T).emit(n,I),v(this,T).emit("*",n,I),v(this,T).appendLog(I)}}}catch{setTimeout(()=>{a=a.map(t=>v(this,N).getEntityByName(t.name)).filter(t=>t!==void 0&&t.entityType===1),this.getPlayersData(a,r+5)},1e4)}}).catch(s=>{setTimeout(()=>{a=a.map(e=>v(this,N).getEntityByName(e.name)).filter(e=>e!==void 0&&e.entityType===1),this.getPlayersData(a,r+5)},1e4)})}getHash(a){if(!a.items.equipList||a.characterId===0n||!a.class||a.name==="You")return;let r=new Array(32).fill(0);a.items.equipList?.forEach(s=>{r[s.slot]=s.id});let i=`${a.name}${a.class}${a.characterId}${r.join("")}`;return yt("md5").update(i).digest("hex")}updatePlayerStats(a){a.forEach(r=>{let i=this.cache.get(r.name);i?(i.info=r,i.status=2):this.cache.set(r.name,{hash:"",status:2,info:r})})}getStats(a){if(!this.isCurrentZoneValid())return;let r=this.cache.get(a);if(r&&r.status===2)return r.info.stats}isCurrentZoneValid(){return this.zoneSyncStatus!==0&&(this.zoneSyncStatus&10)===0}},V=it;T=new WeakMap,N=new WeakMap,q=new WeakMap,H(V,"baseUrl","https://la.herysia.com");var It={isLive:!0,dontResetOnZoneChange:!1,resetAfterPhaseTransition:!1,splitOnPhaseTransition:!1},Y=class extends Et{#t;encounters;#i;#o;#r;#a;options;resetTimer;phaseTransitionResetRequest;phaseTransitionResetRequestTime;#e;constructor(a,r,i,s,e){super(),this.#i=a,this.#o=r,this.#r=i,this.#a=s,this.options={...It,...e},this.resetTimer=null,this.phaseTransitionResetRequest=!1,this.phaseTransitionResetRequestTime=0,this.#e=new Map,this.encounters=[],this.#t={startedOn:0,lastCombatPacket:0,fightStartedOn:0,localPlayer:this.#i.localPlayer.name,currentBoss:void 0,entities:new Map,damageStatistics:{totalDamageDealt:0,topDamageDealt:0,totalDamageTaken:0,topDamageTaken:0,totalHealingDone:0,topHealingDone:0,totalShieldDone:0,topShieldDone:0,debuffs:new Map,buffs:new Map,topShieldGotten:0,totalEffectiveShieldingDone:0,topEffectiveShieldingDone:0,topEffectiveShieldingUsed:0,effectiveShieldingBuffs:new Map,appliedShieldingBuffs:new Map}}}onCounterAttack(a,r){let i=this.updateEntity(a,{},r);i.hits.counter+=1}onInitEnv(a,r){this.options.isLive?(this.#t.entities.forEach((i,s,e)=>{i.hits.total===0&&e.delete(s)}),this.options.dontResetOnZoneChange===!1&&this.resetTimer===null&&(this.resetTimer=setTimeout(()=>{this.resetState(+r+6e3)},6e3),this.emit("message","new-zone"))):(this.splitEncounter(r),this.emit("message","new-zone"))}splitEncounter(a){if(this.#t.fightStartedOn!==0&&(this.#t.damageStatistics.totalDamageDealt!==0||this.#t.damageStatistics.totalDamageTaken!==0)){let r=structuredClone(this.#t);r.entities.forEach(i=>{i.isPlayer&&(i.statApiValid=this.#r.isCurrentZoneValid()&&this.#r.cache.get(i.name)?.status===2)}),r.localPlayer=this.#i.localPlayer.name,this.applyBreakdowns(r.entities),this.encounters.push(r)}this.resetState(+a)}getBossIfStillExist(){if(this.#t.currentBoss?.id){let a=BigInt(`0x0${this.#t.currentBoss?.id}`);return this.#i.entities.has(a)?this.#t.currentBoss:void 0}}resetState(a){this.cancelReset(),this.resetBreakdowns(),this.#t={startedOn:+a,lastCombatPacket:+a,fightStartedOn:0,localPlayer:this.#i.localPlayer.name,currentBoss:this.getBossIfStillExist(),entities:new Map,damageStatistics:{totalDamageDealt:0,topDamageDealt:0,totalDamageTaken:0,topDamageTaken:0,totalHealingDone:0,topHealingDone:0,totalShieldDone:0,topShieldDone:0,debuffs:new Map,buffs:new Map,appliedShieldingBuffs:new Map,effectiveShieldingBuffs:new Map,topEffectiveShieldingDone:0,topEffectiveShieldingUsed:0,topShieldGotten:0,totalEffectiveShieldingDone:0}},this.emit("reset-state",this.#t)}cancelReset(){this.resetTimer&&clearTimeout(this.resetTimer),this.resetTimer=null}onPhaseTransition(a,r){this.options.isLive&&(this.emit("message",`phase-transition-${a}`),this.options.resetAfterPhaseTransition&&(this.phaseTransitionResetRequest=!0,this.phaseTransitionResetRequestTime=+r)),!this.options.isLive&&this.options.splitOnPhaseTransition&&this.splitEncounter(r)}updateOptions(a){this.options={...this.options,...a}}onDeath(a,r){let i=this.#t.entities.get(a.name),s=0;i?i.isDead?s=i.deaths:s=i.deaths+1:s=1,this.updateEntity(a,{isDead:!0,deathTime:+r,deaths:s},r)}onDamage(a,r,i,s,e,t){if((s.modifier&15)===11&&s.skillId===0&&s.skillEffectId===0)return;this.phaseTransitionResetRequest&&this.phaseTransitionResetRequestTime>0&&this.phaseTransitionResetRequestTime<+t-8e3&&(this.resetState(+t),this.phaseTransitionResetRequest=!1);let[n,c]=this.#o.getStatusEffects(a,i,this.#i.localPlayer.characterId,t);if(this.#a.isBattleItem(s.skillEffectId,"attack")&&r&&r.entityType===5){let D=r;s.skillEffectId=D.skillEffectId}let l=this.updateEntity(a,{},t),g=this.updateEntity(i,{currentHp:s.targetCurHp,maxHp:s.targetMaxHp},t);if(!l||!g)return;!g.isPlayer&&s.targetCurHp<0&&(s.damage=s.damage+s.targetCurHp);let I=s.skillId;s.skillId===0&&s.skillEffectId!==0&&(I=s.skillEffectId);let p=l.skills.get(I);p||(p={...this.createEntitySkill(),id:I,...this.getSkillNameIcon(s.skillId,s.skillEffectId)},l.skills.set(I,p));let F=s.modifier&15,B=(s.modifier>>4&7)-1,x=(F&9)!==0,C=new Set,b=new Set;n.forEach(([D])=>{C.add(D)}),c.forEach(([D])=>{b.add(D)}),p.damageInfo.damageDealt+=s.damage,s.damage>p.maxDamage&&(p.maxDamage=s.damage),l.hits.total+=1,p.hits.total+=1,l.damageInfo.damageDealt+=s.damage,g.damageTaken+=s.damage;let U=x?1:0;l.hits.crit+=U,p.hits.crit+=U;let z=!1,W=!1,Z=this.#a.getSkillEffectDirectionalMask(s.skillEffectId)-1;if(Z===0||Z===2){W=B===0;let D=W?1:0;l.hits.backAttack+=D,l.hits.totalBackAttack+=1,p.hits.backAttack+=D,p.hits.totalBackAttack+=1}if(Z===1||Z===2){z=B===1;let D=z?1:0;l.hits.frontAttack+=D,l.hits.totalFrontAttack+=1,p.hits.frontAttack+=D,p.hits.totalFrontAttack+=1}if(l.isPlayer){this.#t.damageStatistics.totalDamageDealt+=s.damage,this.#t.damageStatistics.topDamageDealt=Math.max(this.#t.damageStatistics.topDamageDealt,l.damageInfo.damageDealt);let D=!1,M=!1;C.forEach(o=>{if(!this.#t.damageStatistics.buffs.has(o)){let y=this.#a.getStatusEffectHeaderData(o);y&&this.#t.damageStatistics.buffs.set(o,y)}let P=this.#t.damageStatistics.buffs.get(o);P&&!D&&(D=(P.buffcategory==="classskill"||P.buffcategory==="identity"||P.buffcategory==="ability")&&P.source.skill!==void 0&&P.target===1&&this.#a.isSupportClassId(P.source.skill.classid));let R=p.damageDealtBuffedBy.get(o)??0;p.damageDealtBuffedBy.set(o,R+s.damage);let A=l.damageDealtBuffedBy.get(o)??0;l.damageDealtBuffedBy.set(o,A+s.damage);let j=l.hits.hitsBuffedBy.get(o)??0;l.hits.hitsBuffedBy.set(o,j+1);let E=p.hits.hitsBuffedBy.get(o)??0;p.hits.hitsBuffedBy.set(o,E+1)}),b.forEach(o=>{if(!this.#t.damageStatistics.debuffs.has(o)){let y=this.#a.getStatusEffectHeaderData(o);y&&this.#t.damageStatistics.debuffs.set(o,y)}let P=this.#t.damageStatistics.debuffs.get(o);P&&!M&&(M=(P.buffcategory==="classskill"||P.buffcategory==="identity"||P.buffcategory==="ability")&&P.source.skill!==void 0&&P.target===1&&this.#a.isSupportClassId(P.source.skill.classid));let R=p.damageDealtDebuffedBy.get(o)??0;p.damageDealtDebuffedBy.set(o,R+s.damage);let A=l.damageDealtDebuffedBy.get(o)??0;l.damageDealtDebuffedBy.set(o,A+s.damage);let j=l.hits.hitsDebuffedBy.get(o)??0;l.hits.hitsDebuffedBy.set(o,j+1);let E=p.hits.hitsDebuffedBy.get(o)??0;p.hits.hitsDebuffedBy.set(o,E+1)});let rt=M?1:0,nt=D?1:0;if(p.damageInfo.damageDealtBuffedBySupport+=D?s.damage:0,p.damageInfo.damageDealtDebuffedBySupport+=M?s.damage:0,l.damageInfo.damageDealtBuffedBySupport+=D?s.damage:0,l.damageInfo.damageDealtDebuffedBySupport+=M?s.damage:0,l.hits.hitsBuffedBySupport+=nt,l.hits.hitsDebuffedBySupport+=rt,p.hits.hitsBuffedBySupport+=nt,p.hits.hitsDebuffedBySupport+=rt,s.damage>0&&l.isPlayer){let o={multDmg:{sumRate:0,totalRate:1,values:Array()},atkPowSubRate2:{selfSumRate:0,sumRate:0,values:Array()},atkPowSubRate1:{sumRate:0,totalRate:1,values:Array()},skillDamRate:{selfSumRate:0,sumRate:0,values:Array()},atkPowAmplify:{values:Array()},crit:{selfSumRate:0,sumRate:0,values:Array()},critDmgRate:2};if(n.forEach(([E,y,k])=>{let m=this.#i.entities.get(y);if(!m)return;let f=this.getBuffAfterTripods(this.#a.skillBuff.get(E),m,s);if(f){if(f.type==="skill_damage_amplify"&&f.statuseffectvalues&&m.entityType===1&&y!==a.entityId){let u=f.statuseffectvalues[0]??0,d=f.statuseffectvalues[4]??0;if((u===0||u===s.skillId)&&(d===0||d===s.skillEffectId)){let h=f.statuseffectvalues[1]??0;if(h!==0){let S=h/1e4*k;o.multDmg.values.push({casterEntity:m,rate:S}),o.multDmg.sumRate+=S,o.multDmg.totalRate*=1+S}}}else if(f.type==="attack_power_amplify"&&f.statuseffectvalues&&m.entityType===1&&y!==a.entityId){let u=f.statuseffectvalues[0]??0;if(u!==0){let d=u/1e4*k,h=this.#r.getStats(m.name)?.find(w=>w.id===4)?.value,S=this.#r.getStats(a.name)?.find(w=>w.id===4)?.value;h&&S&&(d*=h/S),o.atkPowAmplify.values.push({casterEntity:m,rate:d})}}f.passiveoption.forEach(u=>{if(O[u.type]===2){if(u.keystat==="attack_power_sub_rate_2"){let d=u.value;if(d!==0){let h=d/1e4*k;m.entityType===1&&y!==a.entityId?(o.atkPowSubRate2.values.push({casterEntity:m,rate:h}),o.atkPowSubRate2.sumRate+=h):o.atkPowSubRate2.selfSumRate+=h}}else if(u.keystat==="attack_power_sub_rate_1"){let d=u.value;if(d!==0){let h=d/1e4*k;m.entityType===1&&y!==a.entityId&&(o.atkPowSubRate1.values.push({casterEntity:m,rate:h}),o.atkPowSubRate1.sumRate+=h,o.atkPowSubRate1.totalRate*=1+h)}}else if(u.keystat==="skill_damage_rate"){let d=u.value;if(d!==0){let h=d/1e4*k;m.entityType===1&&y!==a.entityId?(o.skillDamRate.values.push({casterEntity:m,rate:h}),o.skillDamRate.sumRate+=h):o.skillDamRate.selfSumRate+=h}}}if(u.keystat==="critical_hit_rate"){let d=u.value;if(d!==0){let h=d/1e4*k;m.entityType===1&&y!==a.entityId?(o.crit.values.push({casterEntity:m,rate:h}),o.crit.sumRate+=h):o.crit.selfSumRate+=h}}if(m.entityType===1&&y!==a.entityId)if(u.keystat==="skill_damage_sub_rate_2"){let d=u.value;if(d!==0){let h=d/1e4*k,S=this.#r.getStats(m.name)?.find(w=>w.id===1)?.value??0;switch(m.class){case 204:h*=1+S/.0699*.35/1e4;break;case 105:h*=1+S/.0699*.63/1e4;break;case 602:h*=1+S/.0699*.38/1e4;break;default:break}o.multDmg.values.push({casterEntity:m,rate:h}),o.multDmg.sumRate+=h,o.multDmg.totalRate*=1+h}}else u.keystat==="critical_dam_rate"&&f.category==="buff"&&(o.critDmgRate+=u.value/1e4*k);else if(O[u.type]===4){let d=this.#a.combatEffect.get(u.keyindex);o.critDmgRate+=k*this.getCritMultiplierFromCombatEffect(d,{self:a,target:i,caster:m,skill:this.#a.skill.get(I),hitOption:B,targetCount:e})}})}}),c.forEach(([E,y,k])=>{let m=this.#i.entities.get(y);if(!m)return;let f=this.getBuffAfterTripods(this.#a.skillBuff.get(E),m,s);if(f){if(f.type==="instant_stat_amplify"&&f.statuseffectvalues){let u=f.statuseffectvalues[0]??0;if(u!==0){let d=u/1e4*k;m.entityType===1&&y!==a.entityId?(o.crit.values.push({casterEntity:m,rate:d}),o.crit.sumRate+=d):o.crit.selfSumRate+=d}}if(!(m.entityType!==1||y===a.entityId)){if(f.type==="instant_stat_amplify"&&f.statuseffectvalues){let u=f.statuseffectvalues[0]??0;if(s.damageType===0){let d=f.statuseffectvalues[2]??0;if(d!==0){let S=-(d/1e4)*k*.5;o.multDmg.values.push({casterEntity:m,rate:S}),o.multDmg.sumRate+=S,o.multDmg.totalRate*=1+S}let h=f.statuseffectvalues[7]??0;if(h!==0){let S=h/1e4*k;o.multDmg.values.push({casterEntity:m,rate:S}),o.multDmg.sumRate+=S,o.multDmg.totalRate*=1+S}}else if(s.damageType===1){let d=f.statuseffectvalues[3]??0;if(d!==0){let S=-(d/1e4)*k*.5;o.multDmg.values.push({casterEntity:m,rate:S}),o.multDmg.sumRate+=S,o.multDmg.totalRate*=1+S}let h=f.statuseffectvalues[8]??0;if(h!==0){let S=h/1e4*k;o.multDmg.values.push({casterEntity:m,rate:S}),o.multDmg.sumRate+=S,o.multDmg.totalRate*=1+S}}}if(f.type==="skill_damage_amplify"&&f.statuseffectvalues){let u=f.statuseffectvalues[0]??0,d=f.statuseffectvalues[4]??0;if((u===0||u===s.skillId)&&(d===0||d===s.skillEffectId)){let h=f.statuseffectvalues[1]??0;if(h!==0){let S=h/1e4*k;o.multDmg.values.push({casterEntity:m,rate:S}),o.multDmg.sumRate+=S,o.multDmg.totalRate*=1+S}}}if(f.type==="directional_attack_amplify"&&f.statuseffectvalues){if(z){let u=f.statuseffectvalues[0]??0;if(u!==0){let d=u/100*k;o.multDmg.values.push({casterEntity:m,rate:d}),o.multDmg.sumRate+=d,o.multDmg.totalRate*=1+d}}if(W){let u=f.statuseffectvalues[4]??0;if(u!==0){let d=u/100*k;o.multDmg.values.push({casterEntity:m,rate:d}),o.multDmg.sumRate+=d,o.multDmg.totalRate*=1+d}}}}}}),o.crit.values.length>0){let E=this.#a.skill.get(s.skillId);a.itemSet?.forEach(y=>{if(O[y.type]===2&&G[y.keystat]===76)o.critDmgRate+=y.value/1e4;else if(O[y.type]===4){let k=this.#a.combatEffect.get(y.keyindex);o.critDmgRate+=this.getCritMultiplierFromCombatEffect(k,{self:a,target:i,caster:a,skill:E,hitOption:B,targetCount:e})}a.skills.get(s.skillId)?.tripods.forEach(k=>{let m=new Map;k.options.forEach(f=>{let u=at[f.type];if(u===45){if((f.params[0]??0)===0||s.skillEffectId===(f.params[0]??0)){let d=f.params[1];if(d){let h=this.#a.combatEffect.get(d);h&&m.set(h.id,h)}}}else if(u===46)m.delete(f.params[0]??0);else if(u===104){if((f.params[0]??0)===0||s.skillEffectId===(f.params[0]??0)){let d=m.get(f.params[1]??0);if(d){let h=structuredClone(d);m.set(d.id,h),h.effects.forEach(S=>{S.actions.forEach(w=>{for(let L=0;L<f.params.length-2;L++)et[f.paramtype]===1?w.args[L]*=1+(f.params[L+2]??0)/100:w.args[L]+=f.params[L+2]??0})})}}}else u===29?((f.params[0]??0)===0||s.skillEffectId===(f.params[0]??0))&&(o.critDmgRate+=(f.params[1]??0)/1e4):u===30&&((f.params[0]??0)===0||s.skillEffectId===(f.params[0]??0))&&(o.crit.selfSumRate+=(f.params[1]??0)/1e4)}),m.forEach(f=>{o.critDmgRate+=this.getCritMultiplierFromCombatEffect(f,{self:a,target:i,caster:a,skill:E,hitOption:B,targetCount:e})})})})}if(o.skillDamRate.values.length>0){let E=this.#r.getStats(a.name)?.find(y=>y.id===5)?.value;E&&(o.skillDamRate.selfSumRate+=E/1e4)}let P=0;if(o.crit.values.length>0){o.crit.selfSumRate+=(this.#r.getStats(a.name)?.find(y=>y.id===0)?.value??0)/.2794/1e4;let E=Math.min(Math.max(0,1-o.crit.selfSumRate),o.crit.sumRate);P=(E*o.critDmgRate-E)/(o.crit.selfSumRate*o.critDmgRate-o.crit.selfSumRate+1)}let R=o.atkPowAmplify.values.length<=0?{rate:0}:o.atkPowAmplify.values.reduce((E,y)=>E.rate>y.rate?E:y),A=(1+P)*(1+o.atkPowSubRate2.sumRate/(1+o.atkPowSubRate2.selfSumRate))*(1+o.skillDamRate.sumRate/(1+o.skillDamRate.selfSumRate))*(1+R.rate)*o.multDmg.totalRate*o.atkPowSubRate1.totalRate-1,j=P+o.atkPowSubRate2.sumRate/(1+o.atkPowSubRate2.selfSumRate)+o.skillDamRate.sumRate/(1+o.skillDamRate.selfSumRate)+R.rate+(o.multDmg.totalRate-1)+(o.atkPowSubRate1.totalRate-1);{let E=A*s.damage/(j*(1+A)),y=P*E/o.crit.sumRate;o.crit.values.forEach(f=>{let u=f.rate*y,d=this.#t.entities.get(f.casterEntity.name);this.applyRdps(l,d,p,u)}),o.atkPowSubRate2.values.forEach(f=>{let u=f.rate/(1+o.atkPowSubRate2.selfSumRate)*E,d=this.#t.entities.get(f.casterEntity.name);this.applyRdps(l,d,p,u)}),o.skillDamRate.values.forEach(f=>{let u=f.rate/(1+o.skillDamRate.selfSumRate)*E,d=this.#t.entities.get(f.casterEntity.name);this.applyRdps(l,d,p,u)});let k=(o.multDmg.totalRate-1)*E/o.multDmg.sumRate;o.multDmg.values.forEach(f=>{let u=f.rate*k,d=this.#t.entities.get(f.casterEntity.name);this.applyRdps(l,d,p,u)});let m=(o.atkPowSubRate1.totalRate-1)*E/o.atkPowSubRate1.sumRate;if(o.atkPowSubRate1.values.forEach(f=>{let u=f.rate*m,d=this.#t.entities.get(f.casterEntity.name);this.applyRdps(l,d,p,u)}),R.rate>0){let f=R.rate*E,u=this.#t.entities.get(R.casterEntity?.name);this.applyRdps(l,u,p,f)}}}let mt={timestamp:+t,damage:s.damage,targetEntity:g.id,isCrit:x,isBackAttack:W,isFrontAttack:z,isBuffedBySupport:D,isDebuffedBySupport:M,buffedBy:[...C],debuffedBy:[...b]},pt=BigInt("0x"+l.id);this.addBreakdown(pt,I,mt)}g.isPlayer&&(this.#t.damageStatistics.totalDamageTaken+=s.damage,this.#t.damageStatistics.topDamageTaken=Math.max(this.#t.damageStatistics.topDamageTaken,g.damageTaken)),g.isBoss&&(this.#t.currentBoss=g),this.#t.fightStartedOn===0&&(this.#t.fightStartedOn=+t),this.#t.lastCombatPacket=+t}getBuffAfterTripods(a,r,i){if(!a||r.entityType!==1)return a;let s=structuredClone(a);return r.skills.get(i.skillId)?.tripods.forEach(e=>{e.options.forEach(t=>{let n=at[t.type];if(n===19){if(((t.params[0]??0)===0||i.skillEffectId===(t.params[0]??0))&&s.id===(t.params[1]??0)){let c=new Map;for(let l=2;l<t.params.length;l+=2)t.params[l]&&t.params[l+1]&&c.set(t.params[l]??0,t.params[l+1]??0);s.passiveoption.forEach(l=>{let g=c.get(G[l.keystat]);O[l.type]===2&&g&&(et[t.paramtype]===0?l.value+=g:l.value*=1+g/100)})}}else if(n===42){if(((t.params[0]??0)===0||i.skillEffectId===(t.params[0]??0))&&s.id===(t.params[1]??0)){let c=G[t.params[2]??0],l=t.params[3]??0;c&&l!==void 0&&s.passiveoption.push({type:"stat",keystat:c,keyindex:0,value:l})}}else if(n===21&&s.statuseffectvalues&&((t.params[0]??0)===0||i.skillEffectId===(t.params[0]??0))&&s.id===(t.params[1]??0))if((t.paramtype[2]??0)===0)s.statuseffectvalues=t.params.slice(3);else{let c=[];for(let l=0;l<Math.max(s.statuseffectvalues.length,t.params.length-3);l++)t.params[l+3]&&c.push((s.statuseffectvalues[l]??0)*(1+(t.params[l+3]??0)/100));s.statuseffectvalues=c}})}),s}getCritMultiplierFromCombatEffect(a,r){if(!a)return 0;let i=0;return a.effects.filter(s=>s.actions.find(e=>tt[e.type]===4)).forEach(s=>{this.#a.isCombatEffectConditionsValid({effect:s,...r})&&s.actions.filter(e=>tt[e.type]===4).forEach(e=>{i+=(e.args[0]??0)/100})}),i}applyRdps(a,r,i,s){r&&(r.damageInfo.rdpsDamageGiven+=s),r&&this.#a.isSupportClassId(r.classId)&&(a.damageInfo.rdpsDamageReceivedSupp+=s,i.damageInfo.rdpsDamageReceivedSupp+=s),a.damageInfo.rdpsDamageReceived+=s,i.damageInfo.rdpsDamageReceived+=s}onStartSkill(a,r,i){let s=this.updateEntity(a,{isDead:!1},i);if(s){s.hits.casts+=1;let e=s.skills.get(r);e||(e={...this.createEntitySkill(),id:r,...this.getSkillNameIcon(r,0)},s.skills.set(r,e)),e.hits.casts+=1}}onShieldUsed(a,r,i,s){if(s<0&&console.error("Shield change values was negative, shield ammount increased"),a.entityType===1&&r.entityType===1){if(!this.#t.damageStatistics.effectiveShieldingBuffs.has(i)){let g=this.#a.getStatusEffectHeaderData(i);g&&this.#t.damageStatistics.effectiveShieldingBuffs.set(i,g)}let e=new Date,t=this.updateEntity(a,{},e),n=this.updateEntity(r,{},e);t.damagePreventedByShield+=s;let c=t.damagePreventedByShieldBy.get(i)??0;t.damagePreventedByShieldBy.set(i,c+s),this.#t.damageStatistics.topEffectiveShieldingUsed=Math.max(t.damagePreventedByShield,this.#t.damageStatistics.topEffectiveShieldingUsed),n.damagePreventedWithShieldOnOthers+=s;let l=n.damagePreventedWithShieldOnOthersBy.get(i)??0;n.damagePreventedWithShieldOnOthersBy.set(i,l+s),this.#t.damageStatistics.topEffectiveShieldingDone=Math.max(n.damagePreventedWithShieldOnOthers,this.#t.damageStatistics.topEffectiveShieldingDone),this.#t.damageStatistics.totalEffectiveShieldingDone+=s}}onShieldApplied(a,r,i,s){let e=new Date,t=this.updateEntity(a,{},e),n=this.updateEntity(r,{},e);if(n.isPlayer&&t.isPlayer){if(!this.#t.damageStatistics.appliedShieldingBuffs.has(i)){let g=this.#a.getStatusEffectHeaderData(i);g&&this.#t.damageStatistics.appliedShieldingBuffs.set(i,g)}t.shieldReceived+=s,n.shieldDone+=s;let c=n.shieldDoneBy.get(i)??0;n.shieldDoneBy.set(i,c+s);let l=t.shieldReceivedBy.get(i)??0;t.shieldReceivedBy.set(i,l+s),this.#t.damageStatistics.topShieldDone=Math.max(n.shieldDone,this.#t.damageStatistics.topShieldDone),this.#t.damageStatistics.topShieldGotten=Math.max(t.shieldReceived,this.#t.damageStatistics.topShieldGotten),this.#t.damageStatistics.totalShieldDone+=s}}getSkillNameIcon(a,r){if(a===0&&r===0)return{name:"Bleed",icon:"buff_168.png"};if(a===0){let i=this.#a.skillEffect.get(r);if(i&&i.itemname)return{name:i.itemname,icon:i.icon??""};if(i){if(i.sourceskill){let s=this.#a.skill.get(i.sourceskill);if(s)return{name:s.name,icon:s.icon}}else{let s=this.#a.skill.get(Math.floor(r/10));if(s)return{name:s.name,icon:s.icon}}return{name:i.comment}}else return{name:this.#a.getSkillName(a)}}else{let i=this.#a.skill.get(a);return!i&&(i=this.#a.skill.get(a-a%10),!i)?{name:this.#a.getSkillName(a),icon:""}:i.summonsourceskill?(i=this.#a.skill.get(i.summonsourceskill),i?{name:i.name+" (Summon)",icon:i.icon}:{name:this.#a.getSkillName(a),icon:""}):i.sourceskill?(i=this.#a.skill.get(i.sourceskill),i?{name:i.name,icon:i.icon}:{name:this.#a.getSkillName(a),icon:""}):{name:i.name,icon:i.icon}}}updateEntity(a,r,i){let s={lastUpdate:+i},e=this.#t.entities.get(a.name),t={};if(!e||a.entityType===1&&e.isPlayer!==!0){if(a.entityType===1){let n=a;t={classId:n.class,gearScore:n.gearLevel,isPlayer:!0}}else if(a.entityType===2||a.entityType===3){let n=a;t={npcId:n.typeId,isBoss:n.isBoss}}else if(a.entityType===4){let n=a;t={npcId:n.typeId,isBoss:n.isBoss,isEsther:!0,icon:n.icon}}}return e?Object.assign(e,r,s,t):(e={...this.createEntity(),...r,...s,...t,name:a.name,id:a.entityId.toString(16)},this.#t.entities.set(a.name,e)),e}updateOrCreateEntity(a,r,i){if(!(!r.name||!r.id)){for(let[s,e]of this.#t.entities)if(r.id===e.id){this.#t.entities.delete(s),this.updateEntity(a,{...e,...r},i);return}this.updateEntity(a,r,i)}}createEntitySkill(){return{id:0,name:"",icon:"",damageInfo:{damageDealt:0,rdpsDamageReceived:0,rdpsDamageReceivedSupp:0,rdpsDamageGiven:0,damageDealtDebuffedBySupport:0,damageDealtBuffedBySupport:0},maxDamage:0,hits:{casts:0,total:0,crit:0,backAttack:0,totalBackAttack:0,frontAttack:0,totalFrontAttack:0,counter:0,hitsDebuffedBySupport:0,hitsBuffedBySupport:0,hitsBuffedBy:new Map,hitsDebuffedBy:new Map},breakdown:[],damageDealtDebuffedBy:new Map,damageDealtBuffedBy:new Map}}createEntity(){return{lastUpdate:0,id:"",npcId:0,name:"",classId:0,isBoss:!1,isPlayer:!1,isDead:!1,deaths:0,deathTime:0,gearScore:0,currentHp:0,maxHp:0,damageInfo:{damageDealt:0,rdpsDamageReceived:0,rdpsDamageReceivedSupp:0,rdpsDamageGiven:0,damageDealtDebuffedBySupport:0,damageDealtBuffedBySupport:0},healingDone:0,shieldDone:0,damageTaken:0,skills:new Map,hits:{casts:0,total:0,crit:0,backAttack:0,totalBackAttack:0,frontAttack:0,totalFrontAttack:0,counter:0,hitsDebuffedBySupport:0,hitsBuffedBySupport:0,hitsBuffedBy:new Map,hitsDebuffedBy:new Map},damageDealtDebuffedBy:new Map,damageDealtBuffedBy:new Map,damagePreventedByShieldBy:new Map,damagePreventedWithShieldOnOthersBy:new Map,shieldDoneBy:new Map,shieldReceivedBy:new Map,damagePreventedWithShieldOnOthers:0,damagePreventedByShield:0,shieldReceived:0,statApiValid:!1}}getBroadcast(){let a={...this.#t};return a.entities=new Map,this.#t.entities.forEach((r,i)=>{!r.isPlayer&&!r.isEsther||(r.statApiValid=this.#r.isCurrentZoneValid()&&this.#r.cache.get(r.name)?.status===2,a.entities.set(i,{...r}))}),a.localPlayer=this.#i.localPlayer.name,a}resetBreakdowns(){this.#e.clear()}createBreakdownEntity(a){return this.#e.has(a)||this.#e.set(a,new Map),this.#e.get(a)}removeBreakdownEntry(a){this.#e.delete(a)}addBreakdown(a,r,i){let s=this.createBreakdownEntity(a);if(s.has(r))s.get(r).push(i);else{let e=new Array(i);s.set(r,e)}}getBreakdowns(a,r){let i=this.#e.get(a);if(i)return i.get(r)}clearBreakdowns(a,r){let i=this.#e.get(a);i&&i.delete(r)}applyBreakdowns(a,r=!0){a.forEach(i=>{i.skills.forEach(s=>{let e=BigInt("0x"+i.id),t=this.getBreakdowns(e,s.id);t&&(s.breakdown=[...t])})}),r&&this.resetBreakdowns()}};var J=class{characterIdToPartyId;entityIdToPartyId;raidInstanceToPartyInstances;ownName;characterNameToCharacterId;#t;constructor(a){this.characterIdToPartyId=new Map,this.entityIdToPartyId=new Map,this.raidInstanceToPartyInstances=new Map,this.characterNameToCharacterId=new Map,this.#t=a}add(a,r,i=void 0,s=void 0,e=void 0){!i&&!s||(i&&!s&&(s=this.#t.getEntityId(i)),s&&!i&&(i=this.#t.getEntityId(s)),i&&this.characterIdToPartyId.set(i,r),s&&this.entityIdToPartyId.set(s,r),e&&i&&this.characterNameToCharacterId.set(e,i),this.registerPartyId(a,r))}completeEntry(a,r){let i=this.getPartyIdFromCharacterId(a),s=this.getPartyIdFromEntityId(r);i&&s||(!i&&s&&this.characterIdToPartyId.set(a,s),!s&&i&&this.entityIdToPartyId.set(r,i))}changeEntityId(a,r){let i=this.getPartyIdFromEntityId(a);i&&(this.entityIdToPartyId.delete(a),this.entityIdToPartyId.set(r,i))}setOwnName(a){this.ownName=a}remove(a,r){if(r===this.ownName){this.removePartyMappings(a);return}let i=this.characterNameToCharacterId.get(r);if(this.characterNameToCharacterId.delete(r),!i)return;this.characterIdToPartyId.delete(i);let s=this.#t.getEntityId(i);s&&this.characterIdToPartyId.delete(s)}isCharacterInParty(a){return this.characterIdToPartyId.has(a)}isEntityInParty(a){return this.entityIdToPartyId.has(a)}getPartyIdFromCharacterId(a){return this.characterIdToPartyId.get(a)}getPartyIdFromEntityId(a){return this.entityIdToPartyId.get(a)}removePartyMappings(a){let r=this.getRaidInstanceId(a),i=r?this.raidInstanceToPartyInstances.get(r)??new Set([a]):new Set([a]);for(let[s,e]of this.characterIdToPartyId)if(i.has(e)){this.characterIdToPartyId.delete(s);for(let[t,n]of this.characterNameToCharacterId)if(s===n){this.characterNameToCharacterId.delete(t);break}}for(let[s,e]of this.entityIdToPartyId)i.has(e)&&this.entityIdToPartyId.delete(s)}getRaidInstanceId(a){for(let r of this.raidInstanceToPartyInstances)if(r[1].has(a))return r[0]}registerPartyId(a,r){let i=this.raidInstanceToPartyInstances.get(a);i||(i=new Set,this.raidInstanceToPartyInstances.set(a,i)),i.add(r)}partyInfo(a,r,i){let s=a.parsed;if(s){if(s.memberDatas.length===1&&s.memberDatas[0]?.name===i.name){this.remove(s.partyInstanceId,s.memberDatas[0].name);return}this.removePartyMappings(s.partyInstanceId);for(let e of s.memberDatas){e.characterId===i.characterId&&this.setOwnName(e.name);let t=this.#t.getEntityId(e.characterId);if(t){let n=r.get(t);if(n&&n.entityType===1&&n.name!==e.name){let c=n;c.gearLevel=e.gearLevel,c.name=e.name,c.class=e.classId}}this.add(s.raidInstanceId,s.partyInstanceId,e.characterId,t,e.name)}}}};var X=class{entityToCharacterId;characterToEntityId;constructor(){this.entityToCharacterId=new Map,this.characterToEntityId=new Map}addMapping(a,r){this.entityToCharacterId.set(r,a),this.characterToEntityId.set(a,r)}getCharacterId(a){return this.entityToCharacterId.get(a)}getEntityId(a){return this.characterToEntityId.get(a)}clear(){this.entityToCharacterId.clear(),this.characterToEntityId.clear()}};var ut=class extends kt{#t;#i;#o;#r;#a;#e;#s;#n;#l;#c;constructor(a,r,i,s){super(),this.#t=a,this.#i=r,this.#o=new X,this.#r=new J(this.#o),this.#a=new ot(this.#r,this.#i,s.isLive??!0),this.#e=new lt(this.#o,this.#r,this.#a,this.#i),this.#n=new V(this.#e,i,ht(this.#t,s.isLive)?this.#t:void 0),this.#s=new Y(this.#e,this.#a,this.#n,this.#i,s),this.#s.emit=this.emit.bind(this),this.#l=!1,this.#c=!1,this.#s.options.isLive&&setInterval(this.broadcastStateChange.bind(this),100),this.#t.on("APP_StatApi",e=>{let t=e.parsed;t&&this.#n.updatePlayerStats(t.players)}).on("AbilityChangeNotify",e=>{}).on("ActiveAbilityNotify",e=>{}).on("AddonSkillFeatureChangeNotify",e=>{}).on("BlockSkillStateNotify",e=>{}).on("CounterAttackNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.entities.get(t.sourceId);n&&this.#s.onCounterAttack(n,e.time)}).on("DeathNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.entities.get(t.targetId);n&&this.#s.onDeath(n,e.time)}).on("EquipChangeNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.entities.get(t.objectId);if(!n||n.entityType!==1)return;n.itemSet=this.#e.getPlayerSetOptions(t.equipItemDataList);let c=[];t.equipItemDataList.forEach(l=>{l.id!==void 0&&l.slot!==void 0&&c.push({id:l.id,slot:l.slot})}),n.items.equipList=c}).on("EquipLifeToolChangeNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.entities.get(t.objectId);if(!n||n.entityType!==1)return;let c=[];t.equipLifeToolDataList.forEach(l=>{l.id!==void 0&&l.slot!==void 0&&c.push({id:l.id,slot:l.slot})}),n.items.lifeToolList=c}).on("IdentityStanceChangeNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.entities.get(t.objectId);n&&n.entityType===1&&(n.stance=t.stance)}).on("IdentityGaugeChangeNotify",e=>{}).on("InitAbility",e=>{}).on("InitEnv",e=>{this.#e.processInitEnv(e),this.#s.onInitEnv(e,e.time)}).on("InitLocal",e=>{}).on("InitPC",e=>{let t=this.#e.processInitPC(e);if(t&&e.parsed){let n=this.#i.getStatPairMap(e.parsed.statPair);this.#s.updateOrCreateEntity(t,{id:t.entityId.toString(16),name:t.name,classId:t.class,isPlayer:!0,gearScore:t.gearLevel,currentHp:Number(n.get(1))||0,maxHp:Number(n.get(27))||0},e.time)}}).on("InitItem",e=>{let t=e.parsed;if(t){if(t.storageType===1){this.#e.localPlayer.itemSet=this.#e.getPlayerSetOptions(t.itemDataList);let n=[];t.itemDataList.forEach(c=>{c.id!==void 0&&c.slot!==void 0&&n.push({id:c.id,slot:c.slot})}),this.#e.localPlayer.items.equipList=n}else if(t.storageType===21){let n=[];t.itemDataList.forEach(c=>{c.id!==void 0&&c.slot!==void 0&&n.push({id:c.id,slot:c.slot})}),this.#e.localPlayer.items.lifeToolList=n}}}).on("MigrationExecute",e=>{this.#n.zoneSyncStatus=0;let t=e.parsed;t&&(this.#e.localPlayer.characterId===0n&&(this.#e.localPlayer.characterId=t.account_CharacterId1<t.account_CharacterId2?t.account_CharacterId1:t.account_CharacterId2),this.#n.ip=e.parsed.serverAddr.split(":")[0])}).on("NewNpc",e=>{let t=this.#e.processNewNpc(e);if(t&&e.parsed){let n=this.#i.getStatPairMap(e.parsed.npcStruct.statPair);this.#s.updateOrCreateEntity(t,{id:t.entityId.toString(16),name:t.name,npcId:t.typeId,isPlayer:!1,isBoss:t.isBoss,currentHp:Number(n.get(1))||0,maxHp:Number(n.get(27))||0},e.time)}}).on("NewNpcSummon",e=>{let t=this.#e.processNewNpcSummon(e);if(t&&e.parsed){let n=this.#i.getStatPairMap(e.parsed.npcData.statPair);this.#s.updateOrCreateEntity(t,{id:t.entityId.toString(16),name:t.name,npcId:t.typeId,isPlayer:!1,isBoss:t.isBoss,currentHp:Number(n.get(1))||0,maxHp:Number(n.get(27))||0},e.time)}}).on("NewPC",e=>{let t=this.#e.processNewPC(e);if(t&&e.parsed){let n=this.#i.getStatPairMap(e.parsed.pcStruct.statPair);this.#s.updateOrCreateEntity(t,{id:t.entityId.toString(16),name:t.name,classId:t.class,isPlayer:!0,gearScore:t.gearLevel,currentHp:Number(n.get(1))||0,maxHp:Number(n.get(27))||0},e.time)}}).on("NewProjectile",e=>{let t=e.parsed;if(!t)return;let n={entityId:t.projectileInfo.projectileId,entityType:5,name:t.projectileInfo.projectileId.toString(16),ownerId:t.projectileInfo.ownerId,skillEffectId:t.projectileInfo.skillEffect,skillId:t.projectileInfo.skillId,stats:new Map};this.#e.entities.set(n.entityId,n)}).on("NewTrap",e=>{let t=e.parsed;if(!t)return;let n={entityId:t.trapData.objectId,entityType:5,name:t.trapData.objectId.toString(16),ownerId:t.trapData.ownerId,skillEffectId:t.trapData.skillEffect,skillId:t.trapData.skillId,stats:new Map};this.#e.entities.set(n.entityId,n)}).on("ParalyzationStateNotify",e=>{}).on("PartyInfo",e=>{this.#r.partyInfo(e,this.#e.entities,this.#e.localPlayer)}).on("PartyLeaveResult",e=>{let t=e.parsed;t&&this.#r.remove(t.partyInstanceId,t.name)}).on("PartyPassiveStatusEffectAddNotify",e=>{}).on("PartyPassiveStatusEffectRemoveNotify",e=>{}).on("PartyStatusEffectAddNotify",e=>{let t=e.parsed;if(t)for(let n of t.statusEffectDatas){let c=t.playerIdOnRefresh!==0n?t.playerIdOnRefresh:n.sourceId,l=this.#e.getSourceEntity(c);this.#a.RegisterStatusEffect(this.#a.buildStatusEffect(n,t.characterId,l.entityId,0,e.time))}}).on("PartyStatusEffectRemoveNotify",e=>{let t=e.parsed;if(t)for(let n of t.statusEffectIds){let c=this.#a.RemoveStatusEffect(t.characterId,n,0,t.reason,e.time);c&&c.statusEffectId===9701&&this.#n.syncData()}}).on("PartyStatusEffectResultNotify",e=>{let t=e.parsed;t&&this.#r.add(t.raidInstanceId,t.partyInstanceId,t.characterId)}).on("PassiveStatusEffectAddNotify",e=>{}).on("PassiveStatusEffectRemoveNotify",e=>{}).on("RaidBegin",e=>{let t=e.parsed;t&&(this.#i.statQueryFilter.raid.has(t.raidId)?this.#n.zoneSyncStatus|=16:this.#n.zoneSyncStatus|=8)}).on("ZoneMemberLoadStatusNotify",e=>{let t=e.parsed;t&&(this.#i.statQueryFilter.zone.has(t.zoneId)&&t.zoneLevel<=1?this.#n.zoneSyncStatus|=4:this.#n.zoneSyncStatus|=2)}).on("RaidBossKillNotify",e=>{this.#s.onPhaseTransition(1,e.time)}).on("RaidResult",e=>{this.#s.onPhaseTransition(0,e.time)}).on("RemoveObject",e=>{let t=e.parsed;if(t)for(let n of t.unpublishedObjects)this.#a.RemoveLocalObject(n.objectId,e.time)}).on("SkillCastNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.getSourceEntity(t.caster);n=this.#e.guessIsPlayer(n,t.skillId),this.#s.onStartSkill(n,t.skillId,e.time)}).on("SkillDamageAbnormalMoveNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.getSourceEntity(t.sourceId);t.skillDamageAbnormalMoveEvents.forEach(c=>{let l=this.#e.getOrCreateEntity(c.skillDamageEvent.targetId),g=this.#e.getOrCreateEntity(t.sourceId);l.stats.set(1,c.skillDamageEvent.curHp),l.stats.set(27,c.skillDamageEvent.maxHp),this.#s.onDamage(n,g,l,{skillId:t.skillId,skillEffectId:t.skillEffectId,damage:Number(c.skillDamageEvent.damage),modifier:c.skillDamageEvent.modifier,targetCurHp:Number(c.skillDamageEvent.curHp),targetMaxHp:Number(c.skillDamageEvent.maxHp),damageAttr:c.skillDamageEvent.damageAttr??0,damageType:c.skillDamageEvent.damageType},t.skillDamageAbnormalMoveEvents.length,e.time)})}).on("SkillDamageNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.getSourceEntity(t.sourceId);t.skillDamageEvents.forEach(c=>{let l=this.#e.getOrCreateEntity(c.targetId),g=this.#e.getOrCreateEntity(t.sourceId);this.#s.onDamage(n,g,l,{skillId:t.skillId,skillEffectId:t.skillEffectId,damage:Number(c.damage),modifier:c.modifier,targetCurHp:Number(c.curHp),targetMaxHp:Number(c.maxHp),damageAttr:c.damageAttr??0,damageType:c.damageType},t.skillDamageEvents.length,e.time)})}).on("SkillStageNotify",e=>{}).on("SkillStartNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.getSourceEntity(t.sourceId);if(n=this.#e.guessIsPlayer(n,t.skillId),n.entityType===1){let c=n,l=c.skills.get(t.skillId);if(l||(l={effects:new Set,tripods:new Map},c.skills.set(t.skillId,l)),l.level=t.skillLevel,t.skillOptionData.tripodIndex&&t.skillOptionData.tripodLevel){l.tripods||(l.tripods=new Map);for(let[g,I]of["first","second","third"].entries()){if(t.skillOptionData.tripodIndex[I]===0){for(let b=1;b<=3;b++)l.tripods.delete(3*g+b);continue}let p=3*g+t.skillOptionData.tripodIndex[I],F=t.skillOptionData.tripodLevel[I],B=l.tripods.get(p);if(B&&F===B.level)continue;for(let b=1;b<=3;b++)l.tripods.delete(3*g+b);let x=this.#i.skillFeature.get(t.skillId)?.get(p),C=[];x&&x.entries.forEach(b=>{b.level!==0&&b.level!==F||C.push(b)}),l.tripods.set(p,{level:t.skillOptionData.tripodLevel[I],options:C.sort((b,U)=>U.level-b.level)})}}}this.#s.onStartSkill(n,t.skillId,e.time)}).on("StatusEffectAddNotify",e=>{let t=e.parsed;if(!t)return;let n=this.#e.getSourceEntity(t.statusEffectData.sourceId);this.#a.RegisterStatusEffect(this.#a.buildStatusEffect(t.statusEffectData,t.objectId,n.entityId,1,e.time))}).on("StatusEffectDurationNotify",e=>{let t=e.parsed;t&&this.#a.UpdateDuration(t.effectInstanceId,t.targetId,t.expirationTick,1)}).on("StatusEffectRemoveNotify",e=>{let t=e.parsed;if(t)for(let n of t.statusEffectIds){let c=this.#a.RemoveStatusEffect(t.objectId,n,1,t.reason,e.time);c&&c.statusEffectId===9701&&this.#n.syncData()}}).on("StatusEffectSyncDataNotify",e=>{let t=e.parsed;t&&this.#a.SyncStatusEffect(t.effectInstanceId,t.characterId,t.objectId,t.value,this.#e.localPlayer.characterId)}).on("TriggerBossBattleStatus",e=>{this.#s.onPhaseTransition(2,e.time)}).on("TriggerFinishNotify",e=>{}).on("TriggerStartNotify",e=>{let t=e.parsed;if(t)switch(t.triggerSignalType){case 57:case 59:case 61:case 63:case 74:case 76:this.#c=!0,this.#l=!1;break;case 58:case 60:case 62:case 64:case 75:case 77:this.#c=!1,this.#l=!0;break;case 27:case 10:case 11:this.#n.syncData()}}).on("TroopMemberUpdateMinNotify",e=>{}).on("ZoneObjectUnpublishNotify",e=>{let t=e.parsed;t&&this.#a.RemoveLocalObject(t.objectId,e.time)}).on("ZoneStatusEffectAddNotify",e=>{}).on("TroopMemberUpdateMinNotify",e=>{let t=e.parsed;if(t&&t.statusEffectDatas.length>0)for(let n of t.statusEffectDatas){let c=this.#o.getEntityId(t.characterId),l=n.value?n.value.readUInt32LE():0,g=n.value?n.value.readUInt32LE(8):0,I=l<g?l:g;this.#a.SyncStatusEffect(n.effectInstanceId,t.characterId,c,I,this.#e.localPlayer.characterId)}}).on("ZoneStatusEffectRemoveNotify",e=>{}),this.#a.on("shieldApplied",e=>{let t=e.targetId;if(e.type===0&&(t=this.#o.getEntityId(e.targetId)??t),t===void 0)return;let n=this.#e.getSourceEntity(e.sourceId),c=this.#e.getOrCreateEntity(t);this.#s.onShieldApplied(c,n,e.statusEffectId,e.value)}).on("shieldChanged",(e,t,n)=>{let c=e.targetId;if(e.type===0&&(c=this.#o.getEntityId(e.targetId)??c),c===void 0)return;let l=this.#e.getSourceEntity(e.sourceId),g=this.#e.getOrCreateEntity(c);this.#s.onShieldUsed(g,l,e.statusEffectId,t-n)})}broadcastStateChange(){this.emit("state-change",this.#s.getBroadcast())}reset(){this.#s.resetState(+new Date)}cancelReset(){this.#s.cancelReset()}updateOptions(a){this.#s.updateOptions(a)}onConnect(a){this.#n.ip||(this.#n.ip=a.split(":")[0],ht(this.#t,this.#s.options.isLive)&&this.#t.appendLog(new Q({account_CharacterId1:0n,serverAddr:a,account_CharacterId2:0n},11,ct)))}get encounters(){return this.#s.splitEncounter(new Date),this.#s.encounters}};function ht(_,a){return _ instanceof dt||_.appendLog&&a}export{ut as Parser};
