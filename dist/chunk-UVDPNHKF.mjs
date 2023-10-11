import{TypedEmitter as zn}from"tiny-typed-emitter";var n=class{b;o;constructor(t){this.b=t,this.o=0}skip(t=0){this.o+=t}bool(){return this.u8()===1}u8(){return this.b.readUint8(this.o++)}i8(){return this.b.readInt8(this.o++)}u16(){let t=this.b.readUint16LE(this.o);return this.o+=2,t}i16(){let t=this.b.readInt16LE(this.o);return this.o+=2,t}u32(){let t=this.b.readUint32LE(this.o);return this.o+=4,t}i32(){let t=this.b.readInt32LE(this.o);return this.o+=4,t}f32(){let t=this.b.readFloatLE(this.o);return this.o+=4,t}u64(){let t=this.b.readBigUint64LE(this.o);return this.o+=8,t}i64(){let t=this.b.readBigInt64LE(this.o);return this.o+=8,t}string(t){let o=this.u16();if(o<=t){o=o*2;let a=this.b.toString("utf16le",this.o,this.o+o);return this.o+=o,a}return""}bytes(t=0,o,a){if(o&&t>o)return Buffer.alloc(0);a&&(t=t*a);let u=Buffer.from(this.b.subarray(this.o,this.o+t));return this.o+=t,u}array(t,o,a){return a&&t>a?[]:new Array(t).fill(void 0).map(o)}},Co=class{b;o;constructor(t=65535){this.b=Buffer.allocUnsafe(t),this.o=0}get value(){return this.b.subarray(0,this.o)}skip(t=0){this.o+=t}bool(t=!1){return this.u8(t?1:0),t}u8(t=0){this.b.writeUInt8(t,this.o++)}i8(t=0){this.b.writeInt8(t,this.o++)}u16(t=0){this.o=this.b.writeUInt16LE(t,this.o)}i16(t=0){this.o=this.b.writeInt16LE(t,this.o)}u32(t=0){this.o=this.b.writeUInt32LE(t,this.o)}i32(t=0){this.o=this.b.writeInt32LE(t,this.o)}f32(t=0){this.o=this.b.writeFloatLE(t,this.o)}u64(t=0n){this.o=this.b.writeBigUInt64LE(BigInt(t),this.o)}i64(t=0n){this.o=this.b.writeBigInt64LE(BigInt(t),this.o)}string(t="",o=0){this.u16(t.length),t.length<=o&&(this.o+=this.b.write(t,this.o,"utf16le"))}bytes(t=Buffer.alloc(0),o={}){if(o.maxLen){let a=o.multiplier??1;if(t.length%a)throw new Error(`Error writing bytes, chunkSize should be a multiple of intut value size, got ${t.length}%${a}`);let u=t.length/a;if(u>o.maxLen)throw new Error(`Error writing bytes, input value size exceeded maxLen, got ${u} > ${o.maxLen}`);if(!o.lenType)throw new Error(`Error writing bytes, invalid lenType when writing chunks, got ${o.lenType}`);this[o.lenType](u)}else if(o.length&&t.length!==o.length)throw new Error(`Error writing bytes, input value size doesn't match opts.length, ${t.length} !== ${o.lenType}`);this.o+=t.copy(this.b,this.o)}array(t=[],o,a){if(t===void 0||t.length>o.maxLen){this[o.lenType](0);return}this[o.lenType](t.length),t.forEach(a)}};function y(e){let t={};return t.points=e.u16(),t.id=e.u32(),t.level=e.u8(),t}function h(e){let t=new n(e),o={};return o.abilityDataList=t.array(t.u16(),()=>y(t),100),o}var R="PKTAbilityChangeNotify",B=40391;function Mo(e){let t={};return t.level=e.u32(),t.featureType=e.u16(),t}function A(e){let t=new n(e),o={};return o.objectId=t.u64(),o.activeAbilityList=t.array(t.u16(),()=>Mo(t),60),o}var L="PKTActiveAbilityNotify",w=47904;function C(e){let t=new n(e),o={};return o.addonSkillFeatureList=t.array(t.u16(),()=>{let a={};return a.addonSkillFeatureIdList=t.array(t.u16(),()=>t.u32(),5),a.skillId=t.u32(),a},200),o.objectId=t.u64(),o.addonFeatureIdList=t.bytes(t.u16(),200,4),o}var M="PKTAddonSkillFeatureChangeNotify",j=40982;function F(e){let t=new n(e),o={};return o.unk1_m=t.bytes(t.u32(),688),o.unk1=t.u32(),o}var U="PKTAuthTokenResult",O=47738;function q(e){let t=new n(e),o={};return o.type=t.u8(),t.skip(1),o.objectId=t.u64(),o.paralyzationPoint=t.u32(),t.skip(2),o.paralyzationMaxPoint=t.u32(),o}var z="PKTBlockSkillStateNotify",Z=39282;function V(e){let t=new n(e),o={};return o.targetId=t.u64(),o.type=t.u32(),t.skip(1),o.sourceId=t.u64(),t.skip(1),o}var H="PKTCounterAttackNotify",G=37723;function W(e){let t=new n(e),o={};return o.unk0=t.u32(),t.bool()&&(o.unk2_0=t.u8()),o.sourceId=t.u64(),o.unk4=t.u8(),o.targetId=t.u64(),t.bool()&&(o.unk7_0=t.u8()),o.unk8=t.u64(),o.unk9=t.u32(),t.bool()&&(o.unk11_0=t.u8()),o.unk12=t.u16(),o}var Y="PKTDeathNotify",$=6481;var yn=[0,31,28,31,30,31,30,31,31,30,31,30,31];function kn(e){return!(e%4||!(e%100)&&e%400)}function Tn(e,t,o){if(e>99){if(e<1752||e==1752&&(t<9||t==9&&o<<14))return!1}else e+=1900;return o>0&&t<=12&&(o<=yn[t]||o==29&&t==2&&kn(e))}function X(e){let t=Number(e&0xffffffffn),o=Number(e>>32n&0xffffffffn),a=t&4095,u=(t&65535)>>12,f=t>>16&31;Tn(a,u,f)||(a=u=f=0);let m=t>>21&31,P=t>>26&63,x=o&63,v=o>>6&16383;return m<24&&P<60&&x<60&&v<1e3||(m=24,P=x=v=0),new Date(Date.UTC(a<=99?a+1900:a,u-1,f,m,P,x,v))}function jo(e){let t=0n;return t|=BigInt(e.getUTCMilliseconds())<<38n,t|=BigInt(e.getUTCSeconds())<<32n,t|=BigInt(e.getUTCMinutes())<<26n,t|=BigInt(e.getUTCHours())<<21n,t|=BigInt(e.getUTCDate())<<16n,t|=BigInt(e.getUTCMonth()+1)<<12n,t|=BigInt(e.getUTCFullYear()<2e3?e.getUTCFullYear()-1900:e.getUTCFullYear()),t}function p(e,t=0){let o=e.u16();return(o&4095)<2079?(e.o-=2,X(e.i64())):X(BigInt(o)&0xfffn|0x11000n)}function ra(e,t=X(0x1181fn)){t.getUTCFullYear()>=2079?e.u16(Number(jo(t)&0xffffn)):e.i64(jo(t))}function d(e){let t={};return t.expireTime=p(e),t.slot=e.u16(),t.itemTint=e.bytes(e.u16(),3,14),t.level=e.u16(),t.id=e.u32(),e.bool()&&(t.unk6_0=e.u8()),t}function J(e){let t=new n(e),o={};return o.unk0=t.u32(),o.unk1=t.u32(),o.objectId=t.u64(),o.equipItemDataList=t.array(t.u16(),()=>d(t),32),o}var Q="PKTEquipChangeNotify",tt=3256;function et(e){let t=new n(e),o={};return o.equipLifeToolDataList=t.array(t.u16(),()=>d(t),9),o.objectId=t.u64(),o}var ot="PKTEquipLifeToolChangeNotify",nt=48686;function at(e){let t=new n(e),o={};return t.skip(2),o.stance=t.u8(),o.objectId=t.u64(),t.skip(1),o}var rt="PKTIdentityStanceChangeNotify",ut=41838;function it(e){let t=new n(e),o={};return o.abilityDataList=t.array(t.u16(),()=>y(t),100),o.struct_132=t.bytes(t.u16(),351,48),o}var st="PKTInitAbility",ft=47014;function mt(e){let t=new n(e),o={};return o.struct_29=t.array(t.u16(),()=>{let a={};return a.struct_558=t.string(32),a.struct_574=t.string(128),a.versionString=t.string(64),a},64),o.unk1=t.u32(),o.struct_574=t.string(128),o.unk3=t.u64(),o.unk4=t.u8(),o.unk5=t.u32(),o.playerId=t.u64(),o.lostArkDateTime=p(t),o}var ct="PKTInitEnv",pt=51728;function Pn(e){if(e.length===0)return 0n;if(e.length>8)throw new Error("Value is too large");let t=Buffer.alloc(8);return e.copy(t),t.readBigInt64LE()}function r(e,t=0){let o=e.u8(),a=e.bytes(o>>1&7),u=Pn(a)<<4n|BigInt(o>>4);return o&1?-u:u}function ya(e,t=0n){let o=Buffer.alloc(8),a=t<0n;o.writeBigInt64LE((a?-t:t)>>4n);let u=0;for(let[f,m]of o.entries())m!=0&&(u=f+1);if(u>7)throw new Error("Value is too large");e.u8(Number((a?-t:t)&0xfn)<<4|(u&7)<<1|(a?1:0)),e.bytes(o.subarray(0,u),{length:u})}function k(e){let t={};return t.unk0=e.u8(),t.unk1=e.u8(),t.unk2=r(e),t.unk3=e.u8(),t.unk4=e.u64(),t.unk5=e.u16(),t.unk6=r(e),t}function s(e){let t={};return e.bool()&&(t.unk1_0=e.u64()),t.totalTime=e.f32(),e.bool()&&(t.value=e.bytes(16)),t.endTick=e.u64(),t.statusEffectId=e.u32(),t.struct_437=e.bytes(e.u16(),8,7),t.skillLevel=e.u8(),t.sourceId=e.u64(),t.effectInstanceId=e.u32(),t.occurTime=p(e),t.stackCount=e.u8(),t}function lt(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u8(),o.unk2=t.u32(),o.struct_335=t.bytes(t.u16(),104,30),o.unk4=t.u64(),o.unk5=t.u8(),o.unk6=t.u8(),o.unk7=t.u8(),o.unk8=t.u8(),o.unk9=t.u32(),o.unk10=t.u8(),o.unk11=t.bytes(35),o.unk12=t.u32(),o.level=t.u16(),o.unk14=t.u32(),o.gearLevel=t.f32(),o.unk16=t.bytes(120),o.unk17=t.u8(),o.unk18=t.u16(),o.unk19=t.u8(),o.classId=t.u16(),o.unk21=t.u8(),o.unk22=t.u32(),o.unk23=t.u8(),o.playerId=t.u64(),o.unk25=t.u32(),o.unk26=t.u8(),o.unk27=t.u32(),o.unk28=t.u64(),o.unk29=t.u64(),t.bool()&&(o.unk31_0=t.u32()),o.unk32=t.u64(),o.unk33=t.u32(),o.unk34=t.u16(),o.struct_331=t.string(7),o.unk36=t.bytes(25),o.unk37=t.u8(),o.unk38=t.u16(),o.unk39=t.u8(),o.periodUpdateStatDataList=t.array(t.u16(),()=>k(t),5),o.unk41=t.u8(),o.unk42=t.u64(),o.struct_219=t.bytes(t.u16(),3,17),o.unk44=t.u32(),o.unk45=t.u8(),o.unk46=t.u8(),o.unk47=t.u8(),o.name=t.string(20),o.struct_101=t.bytes(t.u16(),62),o.unk50=t.u16(),o.unk51=t.u32(),o.unk52=t.u8(),o.characterId=t.u64(),o.unk54=t.u8(),o.unk55=t.u32(),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.statPair=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),o}var bt="PKTInitPC",yt=16861;function Fo(e){let t={},o=e.u16();return o===1&&(t.unk1_0=e.bytes(o)),t}function Uo(e){let t={};return t.unk0=e.u8(),t.struct_141=e.bytes(e.u16(),3,9),t.unk2=e.u8(),t.unk3=e.u8(),t.struct_140=Fo(e),t.unk5=e.u8(),t.unk6=e.u32(),t.unk7=e.u32(),t}function Oo(e){let t={};return t.unk0=e.u32(),t.unk1=e.u32(),t.unk2=e.u64(),t.unk3=e.u32(),t.unk4=e.u32(),t.unk5=e.u16(),t.unk6=e.u32(),t.struct_251=e.bytes(e.u16(),2,9),t.unk8=e.u32(),t.struct_230=e.bytes(e.u16(),10,18),t.struct_383=e.bytes(e.u16(),2,10),t.struct_228=e.array(e.u16(),()=>Uo(e),3),t.struct_142=e.bytes(e.u16(),10,9),t.unk13=e.u8(),t}function qo(e){let t={};return t.unk0=e.u32(),t.struct_262=e.bytes(e.u16(),3,21),e.bool()&&(t.struct_224=e.bytes(e.u16(),2,32)),e.bool()&&(t.unk5_0=e.bytes(9)),t.struct_431=e.bytes(e.u16(),3,10),t.unk7=e.u32(),t.itemTint=e.bytes(e.u16(),3,14),t.unk9=e.u8(),t.unk10=e.u32(),t.unk11=e.u32(),t.unk12=e.u32(),e.bool()&&(t.unk1_0=e.u32(),t.struct_188=e.bytes(e.u16(),5,30),t.unk1_2=e.u32()),t.unk14=e.u32(),t.struct_483=e.bytes(e.u16(),3,7),t.struct_264=e.bytes(e.u16(),10,29),t}function S(e){let t={};return t.npcId=e.u32(),t.isDead=e.bool(),t}function Zo(e){let t={};return t.unk0=e.u8(),t.unk1=e.u32(),t.unk2=e.u8(),t.struct_0=e.array(e.u16(),()=>{let o={};return o.unk1_0_0=e.u32(),o.struct_511=e.bytes(e.u16(),10),o},3),t.bossKillDataList=e.array(e.u16(),()=>S(e),3),t}function Vo(e){let t={};return t.struct_483=e.bytes(e.u16(),3,7),t.struct_22=e.array(e.u16(),()=>{let o={};return o.unk1_0_0=e.u16(),o.struct_226=e.string(2),o.unk1_0_2=e.u8(),o},20),t.unk2=e.u8(),t.struct_227=e.bytes(e.u16(),5,7),t.unk4=e.u8(),t.unk5=e.u8(),t}function Ho(e){let t={},o=e.u8();return o===1&&(t.struct_642=Oo(e)),o===2&&(t.struct_129=e.bytes(e.u16(),3,6),t.unk2_1=e.u8(),t.struct_1=e.array(e.u16(),()=>{let a={};return a.struct_511=e.bytes(e.u16(),10),a.unk1_0_1=e.u32(),a.unk1_0_2=e.u8(),a.unk1_0_3=e.u8(),a},3)),o===3&&(t.unk3_0=e.bytes(26)),o===4&&(t.unk4_0=e.bytes(e.u16(),10,13),t.unk4_1=e.u32(),t.unk4_2=e.bytes(e.u16(),10,13)),o===5&&(t.struct_641=qo(e)),o===6&&(t.struct_589=Zo(e)),o===7&&(t.unk7_0=e.bytes(9)),o===8&&(t.struct_635=Vo(e)),o===9&&(t.unk9_0=e.u8()),t}function Go(e){let t={};return e.u32()>0&&(t.serialNumber=e.u64(),t.id=e.u32(),t.level=e.u16(),t.slot=e.u16(),t.durability=e.u32(),t.unk1_6_m=e.u32(),t.flag=e.u32(),t.expireTime=p(e),t.lockUpdateTime=p(e),e.bool()&&(t.unk1_10_0=e.bytes(9)),t.unk1_11=e.u8(),t.unk1_12=e.u8(),t.unk1_13=e.u32(),t.struct_545=Ho(e),t.unk1_15=e.u32()),t}function kt(e){let t=new n(e),o={};return o.storageType=t.u8(),o.itemDataList=t.array(t.u16(),()=>Go(t),80),o}var Tt="PKTInitItem",Pt=51437;function Wo(e){let t={};return e.bool()&&(t.unk1_0=e.bytes(9)),e.bool()&&(t.unk3_0=e.u32()),t.unk4=e.u32(),t.unk5=e.u32(),t.unk6=e.u32(),t}function xt(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u64(),o.struct_219=t.bytes(t.u16(),3,17),o.addonSkillFeatureList=t.array(t.u16(),()=>{let a={};return a.addonSkillFeatureIdList=t.array(t.u16(),()=>t.u32(),5),a.skillId=t.u32(),a},200),o.unk4=t.u8(),o.struct_335=t.bytes(t.u16(),104,30),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.struct_132=t.bytes(t.u16(),351,48),t.bool()&&(o.unk9_0=t.u32()),o.struct_415=t.array(t.u16(),()=>Wo(t),300),o.unk11=t.u64(),o.unk12=t.u32(),o.addonFeatureIdList=t.bytes(t.u16(),200,4),o.abilityDataList=t.array(t.u16(),()=>y(t),100),o.unk15=t.u8(),o.statPair=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),o}var gt="PKTInitLocal",Kt=38748;function St(e){let t=new n(e),o={};return o.account_CharacterId1=t.u64(),o.serverAddr=t.string(256),o.account_CharacterId2=t.u64(),o.unk3=t.u32(),o}var It="PKTMigrationExecute",Nt=33353;function Yo(e){let t={};return t.unk0=e.u8(),t.unk1=e.u8(),t.unk2=e.u8(),t.unk3=e.u64(),t.equipItemDataList=e.array(e.u16(),()=>d(e),32),t.unk5=e.u16(),t.lostArkString=e.string(20),t.lookData=e.bytes(e.u32(),512),t}function l(e,t=0){return e.u16()*(2*Math.PI)/65536}function Na(e,t=0){e.u16(Math.round(t*65536/(2*Math.PI))%65536)}function Dt(e){return e>>20===1?-((~e>>>0)+1&2097151):e}function i(e,t=0){let o=e.u64();return{x:Dt(Number(o&0x1fffffn)),y:Dt(Number(o>>21n&0x1fffffn)),z:Dt(Number(o>>42n&0x1fffffn))}}function _a(e,t={x:0,y:0,z:0}){e.u64(BigInt(Math.round(t.x??0)>>>0&2097151)|BigInt(Math.round(t.y??0)>>>0&2097151)<<21n|BigInt(Math.round(t.z??0)>>>0&2097151)<<42n)}function I(e){let t={};return e.bool()&&(t.unk1_0=e.u8()),e.bool()&&(t.unk3_0=e.u16()),e.bool()&&(t.unk5_0=e.u32()),t.spawnIndex=e.u32(),e.bool()&&(t.unk8_0=e.u8()),t.directionYaw=l(e),e.bool()&&(t.unk11_0=e.u8()),e.bool()&&(t.unk13_0=e.u32()),t.level=e.u16(),t.statPair=e.array(e.u16(),()=>{let o={};return o.statType=e.u8(),o.value=r(e),o},152),e.bool()&&(t.unk17_0=e.u64()),t.statusEffectDatas=e.array(e.u16(),()=>s(e),80),e.bool()&&(t.balanceLevel=e.u16()),e.bool()&&(t.unk22_0=e.u8()),e.bool()&&(t.transitIndex=e.u32()),t.unk25=e.u8(),e.bool()&&(t.unk27_0=e.u8()),e.bool()&&(t.unk29_0=e.u8()),t.position=i(e),t.unk31=e.u8(),e.bool()&&(t.struct_263=e.bytes(e.u16(),12,12)),t.unk34=e.u8(),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),e.bool()&&(t.unk38_0=e.u32()),e.bool()&&(t.unk40_0=e.u32()),t.unk41=e.u8(),e.bool()&&(t.unk43_0=e.u8()),t.unk44=e.u8(),t.objectId=e.u64(),e.bool()&&(t.struct_711=Yo(e)),t.unk48=e.u8(),t.periodUpdateStatDataList=e.array(e.u16(),()=>k(e),5),t.typeId=e.u32(),t}function vt(e){let t=new n(e),o={};return t.bool()&&(o.unk1_0=t.u64()),o.npcStruct=I(t),t.bool()&&(o.unk4_0=t.u8()),t.bool()&&(o.unk1_0_0=t.string(20),o.unk1_1=t.string(20)),o.unk6=t.u8(),o}var Et="PKTNewNpc",ht=57387;function Rt(e){let t=new n(e),o={};return o.npcData=I(t),t.skip(18),o.ownerId=t.u64(),t.skip(17),o.publishReason=t.u8(),o}var Bt="PKTNewNpcSummon",At=22837;function Xo(e){let t={};return t.identityData=e.bytes(25),t.unk1_m=e.u8(),t.addonSkillFeatureList=e.array(e.u16(),()=>{let o={};return o.addonSkillFeatureIdList=e.array(e.u16(),()=>e.u32(),5),o.skillId=e.u32(),o},200),t.unk3=e.u32(),t.periodUpdateStatDataList=e.array(e.u16(),()=>k(e),5),t.unk45_m=e.u32(),t.statusEffectDatas=e.array(e.u16(),()=>s(e),80),t.rvRLevel=e.u16(),t.unk2_m=e.u8(),t.petId=e.u32(),t.classId=e.u16(),t.addonFeatureIdList=e.bytes(e.u16(),200,4),t.firstHonorTitleId=e.u16(),t.unk29_m=e.u8(),t.avatarHide=e.u8(),t.unk0_m=e.bytes(5),t.unk16=e.u32(),t.unk17=e.u8(),t.unk15_m=e.u8(),t.maxItemLevel=e.f32(),t.unk28_m=e.u8(),t.playerId=e.u64(),t.guildName=e.string(20),t.worldId=e.u8(),t.level=e.u16(),t.lookData=e.bytes(e.u32(),512),t.guildId=e.u64(),e.bool()&&(t.grabbedData=e.bytes(12)),t.position=i(e),t.equipItemDataList=e.array(e.u16(),()=>d(e),32),t.unk23_m=e.u8(),t.equipLifeToolDataList=e.array(e.u16(),()=>d(e),9),t.heading=l(e),t.unk32_m=e.u8(),t.statPair=e.array(e.u16(),()=>{let o={};return o.statType=e.u8(),o.value=r(e),o},152),t.avgItemLevel=e.f32(),t.name=e.string(20),t.unk38=e.u32(),t.unk5_m=e.u32(),t.unk7_m=e.u32(),t.characterId=e.u64(),t.secondHonorTitleId=e.u16(),t.unk17_m=e.u8(),t.unk4_m=e.u32(),t.unk25_m=e.u8(),t}function Jo(e){let t={};return t.unk0=e.bytes(12),e.bool()&&(t.unk2_0=e.bytes(12)),t.unk3=e.u32(),t.unk4=e.u32(),t}function Lt(e){let t=new n(e),o={};return t.bool()&&(o.unk5_0_m=t.bytes(20)),t.bool()&&(o.unk3_0_m=t.u32()),t.bool()&&(o.unk4_0_m=t.bytes(12)),o.pcStruct=Xo(t),t.bool()&&(o.trackMoveInfo=Jo(t)),o.unk2_m=t.u8(),o.unk0_m=t.u8(),o}var wt="PKTNewPC",Ct=29307;function N(e,t=0){return{first:e.u8(),second:e.u8(),third:e.u8()}}function Qo(e,t){e.u8(t.first),e.u8(t.second),e.u8(t.third)}function _(e,t=0){return{first:e.u16(),second:e.u16(),third:e.u16()}}function en(e,t){e.u16(t.first),e.u16(t.second),e.u16(t.third)}function nn(e){let t={};return e.bool()&&(t.unk1_0=e.u32()),t.tripodIndex=N(e),t.skillId=e.u32(),t.unk4=e.u32(),t.unk5=e.u64(),t.ownerId=e.u64(),t.skillLevel=e.u8(),t.unk8=e.u16(),t.skillEffect=e.u32(),t.unk10=e.u64(),t.targetObjectId=e.u64(),t.tripodLevel=_(e),t.unk13=e.u8(),t.unk14=e.u32(),t.chainSkillEffect=e.u32(),t.unk16=e.u32(),t.unk17=e.u16(),t.projectileId=e.u64(),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),t.unk21=e.u8(),e.bool()&&(t.unk23_0=e.u64()),t}function Mt(e){let t=new n(e),o={};return o.projectileInfo=nn(t),o}var jt="PKTNewProjectile",Ft=19006;function an(e){let t={};return t.unk0=e.u8(),t.unk1=e.u8(),t.ownerId=e.u64(),t.skillId=e.u32(),t.unk4=e.u32(),t.unk5=e.u32(),t.skillEffect=e.u32(),t.unk7=e.u32(),t.objectId=e.u64(),t.unk9=e.u8(),t.unk10=e.u16(),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),t.position=i(e),t}function Ut(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u8(),o.trapData=an(t),o}var Ot="PKTNewTrap",qt=33019;function zt(e){let t=new n(e),o={};return o.paralyzationPoint=t.u32(),o.objectId=t.u64(),o.enable=t.bool(),o.noHitCheckTime=t.u32(),o.decreasePoint=t.u32(),o.paralyzationMaxPoint=t.u32(),t.skip(1),o.hitCheckTime=t.u32(),o}var Zt="PKTParalyzationStateNotify",Vt=31762;function rn(e){let t={};return t.maxHp=r(e),t.auths=e.u8(),t.partyMemberNumber=e.u8(),t.unk3=e.u8(),t.characterId=e.u64(),t.curHp=r(e),t.name=e.string(20),t.characterLevel=e.u16(),t.zoneId=e.u32(),t.position=i(e),t.unk10=e.u8(),t.transitIndex=e.u32(),t.unk12=e.u8(),t.unk13=e.u16(),t.worldId=e.u8(),t.unk15=e.u8(),t.unk16=e.u8(),t.gearLevel=e.f32(),t.classId=e.u16(),t.zoneInstId=e.u64(),t}function Ht(e){let t=new n(e),o={};return o.memberDatas=t.array(t.u16(),()=>rn(t),40),o.lootGrade=t.u32(),o.partyInstanceId=t.u32(),o.partyLootType=t.u8(),o.raidInstanceId=t.u32(),o.partyType=t.u8(),o}var Gt="PKTPartyInfo",Wt=51909;function Yt(e){let t=new n(e),o={};return o.partyLeaveType=t.u8(),o.partyInstanceId=t.u32(),o.name=t.string(20),o}var $t="PKTPartyLeaveResult",Xt=27157;function Jt(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o.objectId=t.u64(),o.unk0_m=t.u8(),o}var Qt="PKTPartyPassiveStatusEffectAddNotify",te=12030;function ee(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o.objectId=t.u64(),o}var oe="PKTPartyPassiveStatusEffectRemoveNotify",ne=24368;function ae(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u64(),o.playerIdOnRefresh=t.u64(),o.characterId=t.u64(),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o}var re="PKTPartyStatusEffectAddNotify",ue=31095;function ie(e){let t=new n(e),o={};return o.unk0=t.u64(),o.reason=t.u8(),o.statusEffectIds=t.array(t.u16(),()=>t.u32(),80),o.characterId=t.u64(),o}var se="PKTPartyStatusEffectRemoveNotify",fe=25614;function me(e){let t=new n(e),o={};return t.skip(21),o.characterId=t.u64(),t.skip(1),o.raidInstanceId=t.u32(),t.skip(5),o.partyInstanceId=t.u32(),o}var ce="PKTPartyStatusEffectResultNotify",pe=11582;function de(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o}var le="PKTPassiveStatusEffectAddNotify",be=30191;function ye(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o}var ke="PKTPassiveStatusEffectRemoveNotify",Te=8874;function Pe(e){let t=new n(e),o={};return o.startTick=t.u64(),o.unk5_m=t.u64(),o.endTick=t.u64(),o.unk1_m=t.bool(),o.totalTime=t.u64(),o.braveHeartCount=t.u8(),o.unk4_m=t.u64(),o.raidId=t.u32(),o.unk11_m=t.bool(),o.unk0_m=t.bool(),o.bossKillDataList=t.array(t.u16(),()=>S(t),3),o.initBraveHeartCount=t.u8(),o.raidResult=t.u8(),o.unk6_m=t.u64(),o}var xe="PKTRaidBegin",ge=30742;function Ke(e){let t=new n(e),o={};return o.unk0=t.bytes(7),o}var Se="PKTRaidBossKillNotify",Ie=35219;function Ne(e){let t=new n(e),o={};return o.struct_49=t.array(t.u16(),()=>{let a={};return a.unk1_0_0=r(t),a.struct_517=t.bytes(t.u16(),3),a.unk1_0_2=t.u32(),a.unk1_0_3=r(t),a},3),o.unk1=t.u64(),o.unk2=t.u64(),o.unk3=t.u8(),o.unk4=t.u64(),o.unk5=t.u8(),o.unk6=t.u8(),o.unk7=t.u64(),o}var _e="PKTRaidResult",De=26873;function un(e){let t={};return t.objectId=e.u64(),t.unpublishReason=e.u8(),t}function ve(e){let t=new n(e),o={};return o.unpublishedObjects=t.array(t.u16(),()=>un(t),200),o}var Ee="PKTRemoveObject",he=14725;function Re(e){let t=new n(e),o={};return t.skip(1),o.skillId=t.u32(),o.caster=t.u64(),t.skip(2),o.skillLevel=t.u8(),o}var Be="PKTSkillCastNotify",Ae=50399;function sn(e,t=0){let o={},a=e.u8();return a&1&&(o.moveTime=e.u32()),a&2&&(o.standUpTime=e.u32()),a&4&&(o.downTime=e.u32()),a&8&&(o.freezeTime=e.u32()),a&16&&(o.moveHeight=e.u32()),a&32&&(o.farmostDist=e.u32()),a&64&&(o.flag40=e.bytes(e.u16(),6)),o}function dr(e,t){let o=(t.moveTime===void 0?0:1)|(t.standUpTime===void 0?0:2)|(t.downTime===void 0?0:4)|(t.freezeTime===void 0?0:8)|(t.moveHeight===void 0?0:16)|(t.farmostDist===void 0?0:32)|(t.flag40===void 0?0:64);e.u8(o),o&1&&e.u32(t.moveTime),o&2&&e.u32(t.standUpTime),o&4&&e.u32(t.downTime),o&8&&e.u32(t.freezeTime),o&16&&e.u32(t.moveHeight),o&32&&e.u32(t.farmostDist),o&64&&e.bytes(t.flag40,{maxLen:6,lenType:"u16"})}function D(e){let t={};return t.curHp=r(e),t.targetId=e.u64(),t.damageType=e.u8(),t.damage=r(e),t.maxHp=r(e),t.unk3_m=e.u16(),e.bool()&&(t.damageAttr=e.u8()),t.modifier=e.u8(),t}function mn(e){let t={};return t.unk8_m=e.u16(),t.skillMoveOptionData=sn(e),t.destination=i(e),t.position=i(e),t.unk3_m=e.u16(),t.skillDamageEvent=D(e),t.unk1_m=e.u8(),t.unk4_m=e.u16(),t.unk2_m=e.u64(),t}function Le(e){let t=new n(e),o={};return o.skillDamageAbnormalMoveEvents=t.array(t.u16(),()=>mn(t),50),o.skillEffectId=t.u32(),o.skillId=t.u32(),o.unk1_m=t.u8(),o.unk2_m=t.u32(),o.sourceId=t.u64(),o}var we="PKTSkillDamageAbnormalMoveNotify",Ce=41008;function Me(e){let t=new n(e),o={};return o.skillEffectId=t.u32(),o.skillLevel=t.u8(),o.skillId=t.u32(),o.skillDamageEvents=t.array(t.u16(),()=>D(t),50),o.sourceId=t.u64(),o}var je="PKTSkillDamageNotify",Fe=17244;function Ue(e){let t=new n(e),o={};return t.skip(8),o.skillId=t.u32(),t.skip(16),o.stage=t.u8(),t.skip(16),o.sourceId=t.u64(),o}var Oe="PKTSkillStageNotify",qe=862;function cn(e,t=0){let o={},a=e.u8();return a&1&&(o.layerIndex=e.u8()),a&2&&(o.startStageIndex=e.u8()),a&4&&(o.transitIndex=e.u32()),a&8&&(o.stageStartTime=e.u32()),a&16&&(o.farmostDistance=e.u32()),a&32&&(o.tripodIndex=N(e)),a&64&&(o.tripodLevel=_(e)),o}function xr(e,t){let o=(t.layerIndex===void 0?0:1)|(t.startStageIndex===void 0?0:2)|(t.transitIndex===void 0?0:4)|(t.stageStartTime===void 0?0:8)|(t.farmostDistance===void 0?0:16)|(t.tripodIndex===void 0?0:32)|(t.tripodLevel===void 0?0:64);e.u8(o),o&1&&e.u8(t.layerIndex),o&2&&e.u8(t.startStageIndex),o&4&&e.u32(t.transitIndex),o&8&&e.u32(t.stageStartTime),o&16&&e.u32(t.farmostDistance),o&32&&Qo(e,t.tripodIndex),o&64&&en(e,t.tripodLevel)}function ze(e){let t=new n(e),o={};return t.bool()&&(o.unk1_m=t.u32()),o.skillLevel=t.u8(),t.bool()&&(o.aiStateId=t.u32()),o.sourceId=t.u64(),o.skillOptionData=cn(t),o.newPosition=i(t),o.curPosition=i(t),o.aimTargetPosition=i(t),o.curDirectionYaw=l(t),o.skillId=t.u32(),o.newDirectionYaw=l(t),t.bool()&&(o.pitchRotation=l(t)),o}var Ze="PKTSkillStartNotify",Ve=38006;function He(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),t.bool()&&(o.unk3_0=t.u32()),o.objectId=t.u64(),o.unk5=t.array(t.u16(),()=>{let a={};return a.statType=t.u8(),a.value=r(t),a},152),o}var Ge="PKTStatChangeOriginNotify",We=30359;function Ye(e){let t=new n(e),o={};return o.new=t.bool(),t.bool()&&(o.unk2_0=t.u64()),o.unk3=t.u64(),o.statusEffectData=s(t),o.objectId=t.u64(),o}var $e="PKTStatusEffectAddNotify",Xe=5521;function Je(e){let t=new n(e),o={};return o.objectId=t.u64(),o.reason=t.u8(),o.statusEffectIds=t.array(t.u16(),()=>t.u32(),80),o}var Qe="PKTStatusEffectRemoveNotify",to=43364;function eo(e){let t=new n(e),o={};return o.effectInstanceId=t.u32(),t.skip(1),o.expirationTick=t.u64(),o.targetId=t.u64(),o}var oo="PKTStatusEffectDurationNotify",no=6680;function ao(e){let t=new n(e),o={};return o.objectId=t.u64(),t.skip(1),o.effectInstanceId=t.u32(),t.skip(1),o.characterId=t.u64(),o.value=t.u32(),t.skip(4),o}var ro="PKTStatusEffectSyncDataNotify",uo=3926;function io(e){let t=new n(e),o={};return t.skip(2),o.triggerId=t.u32(),o.unk2_m=t.bool(),t.skip(1),o.step=t.u32(),o}var so="PKTTriggerBossBattleStatus",fo=52163;function mo(e){let t=new n(e),o={};return o.involvedPCs=t.array(t.u16(),()=>t.u64(),40),o.triggerId=t.u32(),o.packetResultCode=t.u32(),o.unk0_m=t.u32(),o}var co="PKTTriggerFinishNotify",po=39924;function lo(e){let t=new n(e),o={};return o.triggerId=t.u32(),o.triggerSignalType=t.u32(),o.involvedPCs=t.array(t.u16(),()=>t.u64(),40),o.sourceId=t.u64(),o}var bo="PKTTriggerStartNotify",yo=58708;function ko(e){let t=new n(e),o={};return o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.unk0_m=t.u32(),o.position=t.u64(),o.characterId=t.u64(),o.curHp=r(t),o.maxHp=r(t),o}var To="PKTTroopMemberUpdateMinNotify",Po=39936;function xo(e){let t=new n(e),o={};return o.identityGauge1=t.u32(),o.identityGauge2=t.u32(),o.identityGauge3=t.u32(),t.skip(2),o.playerId=t.u64(),o}var go="PKTIdentityGaugeChangeNotify",Ko=18930;function So(e){let t=new n(e),o={};return o.zoneId=t.u32(),o.completeMembers=t.array(t.u16(),()=>t.u64(),40),o.zoneInstId=t.u64(),o.totalMembers=t.array(t.u16(),()=>t.u64(),40),o.loadComplete=t.bool(),o.zoneLevel=t.u8(),o.firstPCEnterTick=t.u64(),o}var Io="PKTZoneMemberLoadStatusNotify",No=35724;function _o(e){let t=new n(e),o={};return t.skip(3),o.objectId=t.u64(),o}var Do="PKTZoneObjectUnpublishNotify",vo=32503;function pn(e){let t={};return e.skip(4),t.id=e.u32(),t.stackCount=e.u8(),t.target=e.u8(),t.instanceId=e.u32(),t}function Eo(e){let t=new n(e),o={};return o.zoneStatusEffectDataList=t.array(t.u16(),()=>pn(t),4),o}var ho="PKTZoneStatusEffectAddNotify",Ro=47257;function Bo(e){let t=new n(e),o={};return o.statusEffectId=t.u32(),t.skip(1),o}var Ao="PKTZoneStatusEffectRemoveNotify",Lo=36681;var dn=new Map([[B,[R,h]],[w,[L,A]],[j,[M,C]],[O,[U,F]],[Z,[z,q]],[G,[H,V]],[$,[Y,W]],[tt,[Q,J]],[nt,[ot,et]],[ut,[rt,at]],[ft,[st,it]],[pt,[ct,mt]],[yt,[bt,lt]],[Pt,[Tt,kt]],[Kt,[gt,xt]],[Nt,[It,St]],[ht,[Et,vt]],[At,[Bt,Rt]],[Ct,[wt,Lt]],[Ft,[jt,Mt]],[qt,[Ot,Ut]],[Vt,[Zt,zt]],[Wt,[Gt,Ht]],[Xt,[$t,Yt]],[te,[Qt,Jt]],[ne,[oe,ee]],[ue,[re,ae]],[fe,[se,ie]],[pe,[ce,me]],[be,[le,de]],[Te,[ke,ye]],[ge,[xe,Pe]],[Ie,[Se,Ke]],[De,[_e,Ne]],[he,[Ee,ve]],[Ae,[Be,Re]],[Ce,[we,Le]],[Fe,[je,Me]],[qe,[Oe,Ue]],[Ve,[Ze,ze]],[We,[Ge,He]],[Xe,[$e,Ye]],[to,[Qe,Je]],[no,[oo,eo]],[uo,[ro,ao]],[fo,[so,io]],[po,[co,mo]],[yo,[bo,lo]],[Po,[To,ko]],[Ko,[go,xo]],[No,[Io,So]],[vo,[Do,_o]],[Ro,[ho,Eo]],[Lo,[Ao,Bo]]]);var ln=class extends zn{#t;constructor(t){super(),this.#t=t}read(t){try{if(t.length<8)return!1;let o=t.readUInt8(7);if(o>2)return!1;let a=t.readUInt8(6);if(a>3)return!1;let u=t.subarray(8),f=t.readUInt16LE(4),m=dn.get(f);if(m){let[P,x]=m;this.emit(P,new wo(Buffer.from(u),f,a,!!o,this.#t,x))}this.emit("*",u,f,a,!!o)}catch{return!1}}},wo=class{#t;#o;#n;#a;#r;#u;constructor(t,o,a,u,f,m){this.#t=t,this.#o=o,this.#n=a,this.#a=u,this.#r=f,this.#u=m}#e;get parsed(){if(!this.#e)try{this.#e=this.#u(this.#r.decrypt(this.#t,this.#o,this.#n,this.#a))}catch(t){console.error(`[meter-core/pkt-stream] - ${t}`);return}return this.#e}};export{n as a,Co as b,B as c,w as d,j as e,Z as f,G as g,$ as h,p as i,ra as j,tt as k,nt as l,ut as m,ft as n,pt as o,r as p,ya as q,yt as r,Pt as s,Kt as t,Nt as u,l as v,Na as w,i as x,_a as y,ht as z,At as A,Ct as B,N as C,Qo as D,_ as E,en as F,Ft as G,qt as H,Vt as I,Wt as J,Xt as K,te as L,ne as M,ue as N,fe as O,pe as P,be as Q,Te as R,ge as S,Ie as T,De as U,he as V,Ae as W,sn as X,dr as Y,Ce as Z,Fe as _,qe as $,cn as aa,xr as ba,Ve as ca,Xe as da,to as ea,no as fa,uo as ga,fo as ha,po as ia,yo as ja,Po as ka,Ko as la,No as ma,vo as na,Ro as oa,Lo as pa,dn as qa,ln as ra,wo as sa};
