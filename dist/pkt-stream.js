var h=Object.defineProperty;var dn=Object.getOwnPropertyDescriptor;var ln=Object.getOwnPropertyNames;var bn=Object.prototype.hasOwnProperty;var yn=(e,t)=>{for(var o in t)h(e,o,{get:t[o],enumerable:!0})},kn=(e,t,o,a)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of ln(t))!bn.call(e,u)&&u!==o&&h(e,u,{get:()=>t[u],enumerable:!(a=dn(t,u))||a.enumerable});return e};var Tn=e=>kn(h({},"__esModule",{value:!0}),e);var Gn={};yn(Gn,{PKT:()=>v,PKTStream:()=>Co});module.exports=Tn(Gn);var pn=require("tiny-typed-emitter");var n=class{b;o;constructor(t){this.b=t,this.o=0}skip(t=0){this.o+=t}bool(){return this.u8()===1}u8(){return this.b.readUint8(this.o++)}i8(){return this.b.readInt8(this.o++)}u16(){let t=this.b.readUint16LE(this.o);return this.o+=2,t}i16(){let t=this.b.readInt16LE(this.o);return this.o+=2,t}u32(){let t=this.b.readUint32LE(this.o);return this.o+=4,t}i32(){let t=this.b.readInt32LE(this.o);return this.o+=4,t}f32(){let t=this.b.readFloatLE(this.o);return this.o+=4,t}u64(){let t=this.b.readBigUint64LE(this.o);return this.o+=8,t}i64(){let t=this.b.readBigInt64LE(this.o);return this.o+=8,t}string(t){let o=this.u16();if(o<=t){o=o*2;let a=this.b.toString("utf16le",this.o,this.o+o);return this.o+=o,a}return""}bytes(t=0,o,a){if(o&&t>o)return Buffer.alloc(0);a&&(t=t*a);let u=Buffer.from(this.b.subarray(this.o,this.o+t));return this.o+=t,u}array(t,o,a){return a&&t>a?[]:new Array(t).fill(void 0).map(o)}};function y(e){let t={};return t.points=e.u16(),t.id=e.u32(),t.level=e.u8(),t}function B(e){let t=new n(e),o={};return o.abilityDataList=t.array(t.u16(),()=>y(t),100),o}var A="PKTAbilityChangeNotify",L=40391;function Mo(e){let t={};return t.level=e.u32(),t.featureType=e.u16(),t}function w(e){let t=new n(e),o={};return o.objectId=t.u64(),o.activeAbilityList=t.array(t.u16(),()=>Mo(t),60),o}var C="PKTActiveAbilityNotify",M=47904;function j(e){let t=new n(e),o={};return o.addonSkillFeatureList=t.array(t.u16(),()=>{let a={};return a.addonSkillFeatureIdList=t.array(t.u16(),()=>t.u32(),5),a.skillId=t.u32(),a},200),o.objectId=t.u64(),o.addonFeatureIdList=t.bytes(t.u16(),200,4),o}var F="PKTAddonSkillFeatureChangeNotify",U=40982;function O(e){let t=new n(e),o={};return o.unk1_m=t.bytes(t.u32(),688),o.unk1=t.u32(),o}var q="PKTAuthTokenResult",z=47738;function Z(e){let t=new n(e),o={};return o.type=t.u8(),t.skip(1),o.objectId=t.u64(),o.paralyzationPoint=t.u32(),t.skip(2),o.paralyzationMaxPoint=t.u32(),o}var V="PKTBlockSkillStateNotify",H=39282;function G(e){let t=new n(e),o={};return o.targetId=t.u64(),o.type=t.u32(),t.skip(1),o.sourceId=t.u64(),t.skip(1),o}var W="PKTCounterAttackNotify",Y=37723;function $(e){let t=new n(e),o={};return o.unk0=t.u32(),t.bool()&&(o.unk2_0=t.u8()),o.sourceId=t.u64(),o.unk4=t.u8(),o.targetId=t.u64(),t.bool()&&(o.unk7_0=t.u8()),o.unk8=t.u64(),o.unk9=t.u32(),t.bool()&&(o.unk11_0=t.u8()),o.unk12=t.u16(),o}var X="PKTDeathNotify",J=6481;var xn=[0,31,28,31,30,31,30,31,31,30,31,30,31];function gn(e){return!(e%4||!(e%100)&&e%400)}function Kn(e,t,o){if(e>99){if(e<1752||e==1752&&(t<9||t==9&&o<<14))return!1}else e+=1900;return o>0&&t<=12&&(o<=xn[t]||o==29&&t==2&&gn(e))}function jo(e){let t=Number(e&0xffffffffn),o=Number(e>>32n&0xffffffffn),a=t&4095,u=(t&65535)>>12,m=t>>16&31;Kn(a,u,m)||(a=u=m=0);let d=t>>21&31,P=t>>26&63,x=o&63,E=o>>6&16383;return d<24&&P<60&&x<60&&E<1e3||(d=24,P=x=E=0),new Date(Date.UTC(a<=99?a+1900:a,u-1,m,d,P,x,E))}function c(e,t=0){let o=e.u16();return(o&4095)<2079?(e.o-=2,jo(e.i64())):jo(BigInt(o)&0xfffn|0x11000n)}function p(e){let t={};return t.expireTime=c(e),t.slot=e.u16(),t.itemTint=e.bytes(e.u16(),3,14),t.level=e.u16(),t.id=e.u32(),e.bool()&&(t.unk6_0=e.u8()),t}function Q(e){let t=new n(e),o={};return o.unk0=t.u32(),o.unk1=t.u32(),o.objectId=t.u64(),o.equipItemDataList=t.array(t.u16(),()=>p(t),32),o}var tt="PKTEquipChangeNotify",et=3256;function ot(e){let t=new n(e),o={};return o.equipLifeToolDataList=t.array(t.u16(),()=>p(t),9),o.objectId=t.u64(),o}var nt="PKTEquipLifeToolChangeNotify",at=48686;function rt(e){let t=new n(e),o={};return t.skip(2),o.stance=t.u8(),o.objectId=t.u64(),t.skip(1),o}var ut="PKTIdentityStanceChangeNotify",it=41838;function st(e){let t=new n(e),o={};return o.abilityDataList=t.array(t.u16(),()=>y(t),100),o.struct_132=t.bytes(t.u16(),351,48),o}var ft="PKTInitAbility",mt=47014;function ct(e){let t=new n(e),o={};return o.struct_29=t.array(t.u16(),()=>{let a={};return a.struct_558=t.string(32),a.struct_574=t.string(128),a.versionString=t.string(64),a},64),o.unk1=t.u32(),o.struct_574=t.string(128),o.unk3=t.u64(),o.unk4=t.u8(),o.unk5=t.u32(),o.playerId=t.u64(),o.lostArkDateTime=c(t),o}var pt="PKTInitEnv",dt=51728;function Sn(e){if(e.length===0)return 0n;if(e.length>8)throw new Error("Value is too large");let t=Buffer.alloc(8);return e.copy(t),t.readBigInt64LE()}function r(e,t=0){let o=e.u8(),a=e.bytes(o>>1&7),u=Sn(a)<<4n|BigInt(o>>4);return o&1?-u:u}function k(e){let t={};return t.unk0=e.u8(),t.unk1=e.u8(),t.unk2=r(e),t.unk3=e.u8(),t.unk4=e.u64(),t.unk5=e.u16(),t.unk6=r(e),t}function s(e){let t={};return e.bool()&&(t.unk1_0=e.u64()),t.totalTime=e.f32(),e.bool()&&(t.value=e.bytes(16)),t.endTick=e.u64(),t.statusEffectId=e.u32(),t.struct_437=e.bytes(e.u16(),8,7),t.skillLevel=e.u8(),t.sourceId=e.u64(),t.effectInstanceId=e.u32(),t.occurTime=c(e),t.stackCount=e.u8(),t}function bt(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u8(),o.unk2=t.u32(),o.struct_335=t.bytes(t.u16(),104,30),o.unk4=t.u64(),o.unk5=t.u8(),o.unk6=t.u8(),o.unk7=t.u8(),o.unk8=t.u8(),o.unk9=t.u32(),o.unk10=t.u8(),o.unk11=t.bytes(35),o.unk12=t.u32(),o.level=t.u16(),o.unk14=t.u32(),o.gearLevel=t.f32(),o.unk16=t.bytes(120),o.unk17=t.u8(),o.unk18=t.u16(),o.unk19=t.u8(),o.classId=t.u16(),o.unk21=t.u8(),o.unk22=t.u32(),o.unk23=t.u8(),o.playerId=t.u64(),o.unk25=t.u32(),o.unk26=t.u8(),o.unk27=t.u32(),o.unk28=t.u64(),o.unk29=t.u64(),t.bool()&&(o.unk31_0=t.u32()),o.unk32=t.u64(),o.unk33=t.u32(),o.unk34=t.u16(),o.struct_331=t.string(7),o.unk36=t.bytes(25),o.unk37=t.u8(),o.unk38=t.u16(),o.unk39=t.u8(),o.periodUpdateStatDataList=t.array(t.u16(),()=>k(t),5),o.unk41=t.u8(),o.unk42=t.u64(),o.struct_219=t.bytes(t.u16(),3,17),o.unk44=t.u32(),o.unk45=t.u8(),o.unk46=t.u8(),o.unk47=t.u8(),o.name=t.string(20),o.struct_101=t.bytes(t.u16(),62),o.unk50=t.u16(),o.unk51=t.u32(),o.unk52=t.u8(),o.characterId=t.u64(),o.unk54=t.u8(),o.unk55=t.u32(),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.statPair=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),o}var yt="PKTInitPC",kt=16861;function Fo(e){let t={},o=e.u16();return o===1&&(t.unk1_0=e.bytes(o)),t}function Uo(e){let t={};return t.unk0=e.u8(),t.struct_141=e.bytes(e.u16(),3,9),t.unk2=e.u8(),t.unk3=e.u8(),t.struct_140=Fo(e),t.unk5=e.u8(),t.unk6=e.u32(),t.unk7=e.u32(),t}function Oo(e){let t={};return t.unk0=e.u32(),t.unk1=e.u32(),t.unk2=e.u64(),t.unk3=e.u32(),t.unk4=e.u32(),t.unk5=e.u16(),t.unk6=e.u32(),t.struct_251=e.bytes(e.u16(),2,9),t.unk8=e.u32(),t.struct_230=e.bytes(e.u16(),10,18),t.struct_383=e.bytes(e.u16(),2,10),t.struct_228=e.array(e.u16(),()=>Uo(e),3),t.struct_142=e.bytes(e.u16(),10,9),t.unk13=e.u8(),t}function qo(e){let t={};return t.unk0=e.u32(),t.struct_262=e.bytes(e.u16(),3,21),e.bool()&&(t.struct_224=e.bytes(e.u16(),2,32)),e.bool()&&(t.unk5_0=e.bytes(9)),t.struct_431=e.bytes(e.u16(),3,10),t.unk7=e.u32(),t.itemTint=e.bytes(e.u16(),3,14),t.unk9=e.u8(),t.unk10=e.u32(),t.unk11=e.u32(),t.unk12=e.u32(),e.bool()&&(t.unk1_0=e.u32(),t.struct_188=e.bytes(e.u16(),5,30),t.unk1_2=e.u32()),t.unk14=e.u32(),t.struct_483=e.bytes(e.u16(),3,7),t.struct_264=e.bytes(e.u16(),10,29),t}function S(e){let t={};return t.npcId=e.u32(),t.isDead=e.bool(),t}function Zo(e){let t={};return t.unk0=e.u8(),t.unk1=e.u32(),t.unk2=e.u8(),t.struct_0=e.array(e.u16(),()=>{let o={};return o.unk1_0_0=e.u32(),o.struct_511=e.bytes(e.u16(),10),o},3),t.bossKillDataList=e.array(e.u16(),()=>S(e),3),t}function Vo(e){let t={};return t.struct_483=e.bytes(e.u16(),3,7),t.struct_22=e.array(e.u16(),()=>{let o={};return o.unk1_0_0=e.u16(),o.struct_226=e.string(2),o.unk1_0_2=e.u8(),o},20),t.unk2=e.u8(),t.struct_227=e.bytes(e.u16(),5,7),t.unk4=e.u8(),t.unk5=e.u8(),t}function Ho(e){let t={},o=e.u8();return o===1&&(t.struct_642=Oo(e)),o===2&&(t.struct_129=e.bytes(e.u16(),3,6),t.unk2_1=e.u8(),t.struct_1=e.array(e.u16(),()=>{let a={};return a.struct_511=e.bytes(e.u16(),10),a.unk1_0_1=e.u32(),a.unk1_0_2=e.u8(),a.unk1_0_3=e.u8(),a},3)),o===3&&(t.unk3_0=e.bytes(26)),o===4&&(t.unk4_0=e.bytes(e.u16(),10,13),t.unk4_1=e.u32(),t.unk4_2=e.bytes(e.u16(),10,13)),o===5&&(t.struct_641=qo(e)),o===6&&(t.struct_589=Zo(e)),o===7&&(t.unk7_0=e.bytes(9)),o===8&&(t.struct_635=Vo(e)),o===9&&(t.unk9_0=e.u8()),t}function Go(e){let t={};return e.u32()>0&&(t.serialNumber=e.u64(),t.id=e.u32(),t.level=e.u16(),t.slot=e.u16(),t.durability=e.u32(),t.unk1_6_m=e.u32(),t.flag=e.u32(),t.expireTime=c(e),t.lockUpdateTime=c(e),e.bool()&&(t.unk1_10_0=e.bytes(9)),t.unk1_11=e.u8(),t.unk1_12=e.u8(),t.unk1_13=e.u32(),t.struct_545=Ho(e),t.unk1_15=e.u32()),t}function Tt(e){let t=new n(e),o={};return o.storageType=t.u8(),o.itemDataList=t.array(t.u16(),()=>Go(t),80),o}var Pt="PKTInitItem",xt=51437;function Wo(e){let t={};return e.bool()&&(t.unk1_0=e.bytes(9)),e.bool()&&(t.unk3_0=e.u32()),t.unk4=e.u32(),t.unk5=e.u32(),t.unk6=e.u32(),t}function gt(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u64(),o.struct_219=t.bytes(t.u16(),3,17),o.addonSkillFeatureList=t.array(t.u16(),()=>{let a={};return a.addonSkillFeatureIdList=t.array(t.u16(),()=>t.u32(),5),a.skillId=t.u32(),a},200),o.unk4=t.u8(),o.struct_335=t.bytes(t.u16(),104,30),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.struct_132=t.bytes(t.u16(),351,48),t.bool()&&(o.unk9_0=t.u32()),o.struct_415=t.array(t.u16(),()=>Wo(t),300),o.unk11=t.u64(),o.unk12=t.u32(),o.addonFeatureIdList=t.bytes(t.u16(),200,4),o.abilityDataList=t.array(t.u16(),()=>y(t),100),o.unk15=t.u8(),o.statPair=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),o}var Kt="PKTInitLocal",St=38748;function It(e){let t=new n(e),o={};return o.account_CharacterId1=t.u64(),o.serverAddr=t.string(256),o.account_CharacterId2=t.u64(),o.unk3=t.u32(),o}var Nt="PKTMigrationExecute",_t=33353;function Yo(e){let t={};return t.unk0=e.u8(),t.unk1=e.u8(),t.unk2=e.u8(),t.unk3=e.u64(),t.equipItemDataList=e.array(e.u16(),()=>p(e),32),t.unk5=e.u16(),t.lostArkString=e.string(20),t.lookData=e.bytes(e.u32(),512),t}function l(e,t=0){return e.u16()*(2*Math.PI)/65536}function vt(e){return e>>20===1?-((~e>>>0)+1&2097151):e}function i(e,t=0){let o=e.u64();return{x:vt(Number(o&0x1fffffn)),y:vt(Number(o>>21n&0x1fffffn)),z:vt(Number(o>>42n&0x1fffffn))}}function I(e){let t={};return e.bool()&&(t.unk1_0=e.u8()),e.bool()&&(t.unk3_0=e.u16()),e.bool()&&(t.unk5_0=e.u32()),t.spawnIndex=e.u32(),e.bool()&&(t.unk8_0=e.u8()),t.directionYaw=l(e),e.bool()&&(t.unk11_0=e.u8()),e.bool()&&(t.unk13_0=e.u32()),t.level=e.u16(),t.statPair=e.array(e.u16(),()=>{let o={};return o.statType=e.u8(),o.value=r(e),o},152),e.bool()&&(t.unk17_0=e.u64()),t.statusEffectDatas=e.array(e.u16(),()=>s(e),80),e.bool()&&(t.balanceLevel=e.u16()),e.bool()&&(t.unk22_0=e.u8()),e.bool()&&(t.transitIndex=e.u32()),t.unk25=e.u8(),e.bool()&&(t.unk27_0=e.u8()),e.bool()&&(t.unk29_0=e.u8()),t.position=i(e),t.unk31=e.u8(),e.bool()&&(t.struct_263=e.bytes(e.u16(),12,12)),t.unk34=e.u8(),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),e.bool()&&(t.unk38_0=e.u32()),e.bool()&&(t.unk40_0=e.u32()),t.unk41=e.u8(),e.bool()&&(t.unk43_0=e.u8()),t.unk44=e.u8(),t.objectId=e.u64(),e.bool()&&(t.struct_711=Yo(e)),t.unk48=e.u8(),t.periodUpdateStatDataList=e.array(e.u16(),()=>k(e),5),t.typeId=e.u32(),t}function Et(e){let t=new n(e),o={};return t.bool()&&(o.unk1_0=t.u64()),o.npcStruct=I(t),t.bool()&&(o.unk4_0=t.u8()),t.bool()&&(o.unk1_0_0=t.string(20),o.unk1_1=t.string(20)),o.unk6=t.u8(),o}var ht="PKTNewNpc",Rt=57387;function Bt(e){let t=new n(e),o={};return o.npcData=I(t),t.skip(18),o.ownerId=t.u64(),t.skip(17),o.publishReason=t.u8(),o}var At="PKTNewNpcSummon",Lt=22837;function Xo(e){let t={};return t.identityData=e.bytes(25),t.unk1_m=e.u8(),t.addonSkillFeatureList=e.array(e.u16(),()=>{let o={};return o.addonSkillFeatureIdList=e.array(e.u16(),()=>e.u32(),5),o.skillId=e.u32(),o},200),t.unk3=e.u32(),t.periodUpdateStatDataList=e.array(e.u16(),()=>k(e),5),t.unk45_m=e.u32(),t.statusEffectDatas=e.array(e.u16(),()=>s(e),80),t.rvRLevel=e.u16(),t.unk2_m=e.u8(),t.petId=e.u32(),t.classId=e.u16(),t.addonFeatureIdList=e.bytes(e.u16(),200,4),t.firstHonorTitleId=e.u16(),t.unk29_m=e.u8(),t.avatarHide=e.u8(),t.unk0_m=e.bytes(5),t.unk16=e.u32(),t.unk17=e.u8(),t.unk15_m=e.u8(),t.maxItemLevel=e.f32(),t.unk28_m=e.u8(),t.playerId=e.u64(),t.guildName=e.string(20),t.worldId=e.u8(),t.level=e.u16(),t.lookData=e.bytes(e.u32(),512),t.guildId=e.u64(),e.bool()&&(t.grabbedData=e.bytes(12)),t.position=i(e),t.equipItemDataList=e.array(e.u16(),()=>p(e),32),t.unk23_m=e.u8(),t.equipLifeToolDataList=e.array(e.u16(),()=>p(e),9),t.heading=l(e),t.unk32_m=e.u8(),t.statPair=e.array(e.u16(),()=>{let o={};return o.statType=e.u8(),o.value=r(e),o},152),t.avgItemLevel=e.f32(),t.name=e.string(20),t.unk38=e.u32(),t.unk5_m=e.u32(),t.unk7_m=e.u32(),t.characterId=e.u64(),t.secondHonorTitleId=e.u16(),t.unk17_m=e.u8(),t.unk4_m=e.u32(),t.unk25_m=e.u8(),t}function Jo(e){let t={};return t.unk0=e.bytes(12),e.bool()&&(t.unk2_0=e.bytes(12)),t.unk3=e.u32(),t.unk4=e.u32(),t}function wt(e){let t=new n(e),o={};return t.bool()&&(o.unk5_0_m=t.bytes(20)),t.bool()&&(o.unk3_0_m=t.u32()),t.bool()&&(o.unk4_0_m=t.bytes(12)),o.pcStruct=Xo(t),t.bool()&&(o.trackMoveInfo=Jo(t)),o.unk2_m=t.u8(),o.unk0_m=t.u8(),o}var Ct="PKTNewPC",Mt=29307;function N(e,t=0){return{first:e.u8(),second:e.u8(),third:e.u8()}}function _(e,t=0){return{first:e.u16(),second:e.u16(),third:e.u16()}}function en(e){let t={};return e.bool()&&(t.unk1_0=e.u32()),t.tripodIndex=N(e),t.skillId=e.u32(),t.unk4=e.u32(),t.unk5=e.u64(),t.ownerId=e.u64(),t.skillLevel=e.u8(),t.unk8=e.u16(),t.skillEffect=e.u32(),t.unk10=e.u64(),t.targetObjectId=e.u64(),t.tripodLevel=_(e),t.unk13=e.u8(),t.unk14=e.u32(),t.chainSkillEffect=e.u32(),t.unk16=e.u32(),t.unk17=e.u16(),t.projectileId=e.u64(),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),t.unk21=e.u8(),e.bool()&&(t.unk23_0=e.u64()),t}function jt(e){let t=new n(e),o={};return o.projectileInfo=en(t),o}var Ft="PKTNewProjectile",Ut=19006;function on(e){let t={};return t.unk0=e.u8(),t.unk1=e.u8(),t.ownerId=e.u64(),t.skillId=e.u32(),t.unk4=e.u32(),t.unk5=e.u32(),t.skillEffect=e.u32(),t.unk7=e.u32(),t.objectId=e.u64(),t.unk9=e.u8(),t.unk10=e.u16(),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),t.position=i(e),t}function Ot(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u8(),o.trapData=on(t),o}var qt="PKTNewTrap",zt=33019;function Zt(e){let t=new n(e),o={};return o.paralyzationPoint=t.u32(),o.objectId=t.u64(),o.enable=t.bool(),o.noHitCheckTime=t.u32(),o.decreasePoint=t.u32(),o.paralyzationMaxPoint=t.u32(),t.skip(1),o.hitCheckTime=t.u32(),o}var Vt="PKTParalyzationStateNotify",Ht=31762;function nn(e){let t={};return t.maxHp=r(e),t.auths=e.u8(),t.partyMemberNumber=e.u8(),t.unk3=e.u8(),t.characterId=e.u64(),t.curHp=r(e),t.name=e.string(20),t.characterLevel=e.u16(),t.zoneId=e.u32(),t.position=i(e),t.unk10=e.u8(),t.transitIndex=e.u32(),t.unk12=e.u8(),t.unk13=e.u16(),t.worldId=e.u8(),t.unk15=e.u8(),t.unk16=e.u8(),t.gearLevel=e.f32(),t.classId=e.u16(),t.zoneInstId=e.u64(),t}function Gt(e){let t=new n(e),o={};return o.memberDatas=t.array(t.u16(),()=>nn(t),40),o.lootGrade=t.u32(),o.partyInstanceId=t.u32(),o.partyLootType=t.u8(),o.raidInstanceId=t.u32(),o.partyType=t.u8(),o}var Wt="PKTPartyInfo",Yt=51909;function $t(e){let t=new n(e),o={};return o.partyLeaveType=t.u8(),o.partyInstanceId=t.u32(),o.name=t.string(20),o}var Xt="PKTPartyLeaveResult",Jt=27157;function Qt(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o.objectId=t.u64(),o.unk0_m=t.u8(),o}var te="PKTPartyPassiveStatusEffectAddNotify",ee=12030;function oe(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o.objectId=t.u64(),o}var ne="PKTPartyPassiveStatusEffectRemoveNotify",ae=24368;function re(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u64(),o.playerIdOnRefresh=t.u64(),o.characterId=t.u64(),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o}var ue="PKTPartyStatusEffectAddNotify",ie=31095;function se(e){let t=new n(e),o={};return o.unk0=t.u64(),o.reason=t.u8(),o.statusEffectIds=t.array(t.u16(),()=>t.u32(),80),o.characterId=t.u64(),o}var fe="PKTPartyStatusEffectRemoveNotify",me=25614;function ce(e){let t=new n(e),o={};return t.skip(21),o.characterId=t.u64(),t.skip(1),o.raidInstanceId=t.u32(),t.skip(5),o.partyInstanceId=t.u32(),o}var pe="PKTPartyStatusEffectResultNotify",de=11582;function le(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o}var be="PKTPassiveStatusEffectAddNotify",ye=30191;function ke(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o}var Te="PKTPassiveStatusEffectRemoveNotify",Pe=8874;function xe(e){let t=new n(e),o={};return o.startTick=t.u64(),o.unk5_m=t.u64(),o.endTick=t.u64(),o.unk1_m=t.bool(),o.totalTime=t.u64(),o.braveHeartCount=t.u8(),o.unk4_m=t.u64(),o.raidId=t.u32(),o.unk11_m=t.bool(),o.unk0_m=t.bool(),o.bossKillDataList=t.array(t.u16(),()=>S(t),3),o.initBraveHeartCount=t.u8(),o.raidResult=t.u8(),o.unk6_m=t.u64(),o}var ge="PKTRaidBegin",Ke=30742;function Se(e){let t=new n(e),o={};return o.unk0=t.bytes(7),o}var Ie="PKTRaidBossKillNotify",Ne=35219;function _e(e){let t=new n(e),o={};return o.struct_49=t.array(t.u16(),()=>{let a={};return a.unk1_0_0=r(t),a.struct_517=t.bytes(t.u16(),3),a.unk1_0_2=t.u32(),a.unk1_0_3=r(t),a},3),o.unk1=t.u64(),o.unk2=t.u64(),o.unk3=t.u8(),o.unk4=t.u64(),o.unk5=t.u8(),o.unk6=t.u8(),o.unk7=t.u64(),o}var De="PKTRaidResult",ve=26873;function an(e){let t={};return t.objectId=e.u64(),t.unpublishReason=e.u8(),t}function Ee(e){let t=new n(e),o={};return o.unpublishedObjects=t.array(t.u16(),()=>an(t),200),o}var he="PKTRemoveObject",Re=14725;function Be(e){let t=new n(e),o={};return t.skip(1),o.skillId=t.u32(),o.caster=t.u64(),t.skip(2),o.skillLevel=t.u8(),o}var Ae="PKTSkillCastNotify",Le=50399;function rn(e,t=0){let o={},a=e.u8();return a&1&&(o.moveTime=e.u32()),a&2&&(o.standUpTime=e.u32()),a&4&&(o.downTime=e.u32()),a&8&&(o.freezeTime=e.u32()),a&16&&(o.moveHeight=e.u32()),a&32&&(o.farmostDist=e.u32()),a&64&&(o.flag40=e.bytes(e.u16(),6)),o}function D(e){let t={};return t.curHp=r(e),t.targetId=e.u64(),t.damageType=e.u8(),t.damage=r(e),t.maxHp=r(e),t.unk3_m=e.u16(),e.bool()&&(t.damageAttr=e.u8()),t.modifier=e.u8(),t}function sn(e){let t={};return t.unk8_m=e.u16(),t.skillMoveOptionData=rn(e),t.destination=i(e),t.position=i(e),t.unk3_m=e.u16(),t.skillDamageEvent=D(e),t.unk1_m=e.u8(),t.unk4_m=e.u16(),t.unk2_m=e.u64(),t}function we(e){let t=new n(e),o={};return o.skillDamageAbnormalMoveEvents=t.array(t.u16(),()=>sn(t),50),o.skillEffectId=t.u32(),o.skillId=t.u32(),o.unk1_m=t.u8(),o.unk2_m=t.u32(),o.sourceId=t.u64(),o}var Ce="PKTSkillDamageAbnormalMoveNotify",Me=41008;function je(e){let t=new n(e),o={};return o.skillEffectId=t.u32(),o.skillLevel=t.u8(),o.skillId=t.u32(),o.skillDamageEvents=t.array(t.u16(),()=>D(t),50),o.sourceId=t.u64(),o}var Fe="PKTSkillDamageNotify",Ue=17244;function Oe(e){let t=new n(e),o={};return t.skip(8),o.skillId=t.u32(),t.skip(16),o.stage=t.u8(),t.skip(16),o.sourceId=t.u64(),o}var qe="PKTSkillStageNotify",ze=862;function fn(e,t=0){let o={},a=e.u8();return a&1&&(o.layerIndex=e.u8()),a&2&&(o.startStageIndex=e.u8()),a&4&&(o.transitIndex=e.u32()),a&8&&(o.stageStartTime=e.u32()),a&16&&(o.farmostDistance=e.u32()),a&32&&(o.tripodIndex=N(e)),a&64&&(o.tripodLevel=_(e)),o}function Ze(e){let t=new n(e),o={};return t.bool()&&(o.unk1_m=t.u32()),o.skillLevel=t.u8(),t.bool()&&(o.aiStateId=t.u32()),o.sourceId=t.u64(),o.skillOptionData=fn(t),o.newPosition=i(t),o.curPosition=i(t),o.aimTargetPosition=i(t),o.curDirectionYaw=l(t),o.skillId=t.u32(),o.newDirectionYaw=l(t),t.bool()&&(o.pitchRotation=l(t)),o}var Ve="PKTSkillStartNotify",He=38006;function Ge(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),t.bool()&&(o.unk3_0=t.u32()),o.objectId=t.u64(),o.unk5=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),o}var We="PKTStatChangeOriginNotify",Ye=30359;function $e(e){let t=new n(e),o={};return o.new=t.bool(),t.bool()&&(o.unk2_0=t.u64()),o.unk3=t.u64(),o.statusEffectData=s(t),o.objectId=t.u64(),o}var Xe="PKTStatusEffectAddNotify",Je=5521;function Qe(e){let t=new n(e),o={};return o.objectId=t.u64(),o.reason=t.u8(),o.statusEffectIds=t.array(t.u16(),()=>t.u32(),80),o}var to="PKTStatusEffectRemoveNotify",eo=43364;function oo(e){let t=new n(e),o={};return o.effectInstanceId=t.u32(),t.skip(1),o.expirationTick=t.u64(),o.targetId=t.u64(),o}var no="PKTStatusEffectDurationNotify",ao=6680;function ro(e){let t=new n(e),o={};return o.objectId=t.u64(),t.skip(1),o.effectInstanceId=t.u32(),t.skip(1),o.characterId=t.u64(),o.value=t.u32(),t.skip(4),o}var uo="PKTStatusEffectSyncDataNotify",io=3926;function so(e){let t=new n(e),o={};return t.skip(2),o.triggerId=t.u32(),o.unk2_m=t.bool(),t.skip(1),o.step=t.u32(),o}var fo="PKTTriggerBossBattleStatus",mo=52163;function co(e){let t=new n(e),o={};return o.involvedPCs=t.array(t.u16(),()=>t.u64(),40),o.triggerId=t.u32(),o.packetResultCode=t.u32(),o.unk0_m=t.u32(),o}var po="PKTTriggerFinishNotify",lo=39924;function bo(e){let t=new n(e),o={};return o.triggerId=t.u32(),o.triggerSignalType=t.u32(),o.involvedPCs=t.array(t.u16(),()=>t.u64(),40),o.sourceId=t.u64(),o}var yo="PKTTriggerStartNotify",ko=58708;function To(e){let t=new n(e),o={};return o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.unk0_m=t.u32(),o.position=t.u64(),o.characterId=t.u64(),o.curHp=r(t),o.maxHp=r(t),o}var Po="PKTTroopMemberUpdateMinNotify",xo=39936;function go(e){let t=new n(e),o={};return o.identityGauge1=t.u32(),o.identityGauge2=t.u32(),o.identityGauge3=t.u32(),t.skip(2),o.playerId=t.u64(),o}var Ko="PKTIdentityGaugeChangeNotify",So=18930;function Io(e){let t=new n(e),o={};return o.zoneId=t.u32(),o.completeMembers=t.array(t.u16(),()=>t.u64(),40),o.zoneInstId=t.u64(),o.totalMembers=t.array(t.u16(),()=>t.u64(),40),o.loadComplete=t.bool(),o.zoneLevel=t.u8(),o.firstPCEnterTick=t.u64(),o}var No="PKTZoneMemberLoadStatusNotify",_o=35724;function Do(e){let t=new n(e),o={};return t.skip(3),o.objectId=t.u64(),o}var vo="PKTZoneObjectUnpublishNotify",Eo=32503;function mn(e){let t={};return e.skip(4),t.id=e.u32(),t.stackCount=e.u8(),t.target=e.u8(),t.instanceId=e.u32(),t}function ho(e){let t=new n(e),o={};return o.zoneStatusEffectDataList=t.array(t.u16(),()=>mn(t),4),o}var Ro="PKTZoneStatusEffectAddNotify",Bo=47257;function Ao(e){let t=new n(e),o={};return o.statusEffectId=t.u32(),t.skip(1),o}var Lo="PKTZoneStatusEffectRemoveNotify",wo=36681;var cn=new Map([[L,[A,B]],[M,[C,w]],[U,[F,j]],[z,[q,O]],[H,[V,Z]],[Y,[W,G]],[J,[X,$]],[et,[tt,Q]],[at,[nt,ot]],[it,[ut,rt]],[mt,[ft,st]],[dt,[pt,ct]],[kt,[yt,bt]],[xt,[Pt,Tt]],[St,[Kt,gt]],[_t,[Nt,It]],[Rt,[ht,Et]],[Lt,[At,Bt]],[Mt,[Ct,wt]],[Ut,[Ft,jt]],[zt,[qt,Ot]],[Ht,[Vt,Zt]],[Yt,[Wt,Gt]],[Jt,[Xt,$t]],[ee,[te,Qt]],[ae,[ne,oe]],[ie,[ue,re]],[me,[fe,se]],[de,[pe,ce]],[ye,[be,le]],[Pe,[Te,ke]],[Ke,[ge,xe]],[Ne,[Ie,Se]],[ve,[De,_e]],[Re,[he,Ee]],[Le,[Ae,Be]],[Me,[Ce,we]],[Ue,[Fe,je]],[ze,[qe,Oe]],[He,[Ve,Ze]],[Ye,[We,Ge]],[Je,[Xe,$e]],[eo,[to,Qe]],[ao,[no,oo]],[io,[uo,ro]],[mo,[fo,so]],[lo,[po,co]],[ko,[yo,bo]],[xo,[Po,To]],[So,[Ko,go]],[_o,[No,Io]],[Eo,[vo,Do]],[Bo,[Ro,ho]],[wo,[Lo,Ao]]]);var Co=class extends pn.TypedEmitter{#t;constructor(t){super(),this.#t=t}read(t){try{if(t.length<8)return!1;let o=t.readUInt8(7);if(o>2)return!1;let a=t.readUInt8(6);if(a>3)return!1;let u=t.subarray(8),m=t.readUInt16LE(4),d=cn.get(m);if(d){let[P,x]=d;this.emit(P,new v(Buffer.from(u),m,a,!!o,this.#t,x))}this.emit("*",u,m,a,!!o)}catch{return!1}}},v=class{#t;#o;#n;#a;#r;#u;constructor(t,o,a,u,m,d){this.#t=t,this.#o=o,this.#n=a,this.#a=u,this.#r=m,this.#u=d}#e;get parsed(){if(!this.#e)try{this.#e=this.#u(this.#r.decrypt(this.#t,this.#o,this.#n,this.#a))}catch(t){console.error(`[meter-core/pkt-stream] - ${t}`);return}return this.#e}};0&&(module.exports={PKT,PKTStream});
