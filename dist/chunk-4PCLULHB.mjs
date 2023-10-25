import{TypedEmitter as zn}from"tiny-typed-emitter";var n=class{b;o;constructor(t){this.b=t,this.o=0}skip(t=0){this.o+=t}bool(){return this.u8()===1}u8(){return this.b.readUint8(this.o++)}i8(){return this.b.readInt8(this.o++)}u16(){let t=this.b.readUint16LE(this.o);return this.o+=2,t}i16(){let t=this.b.readInt16LE(this.o);return this.o+=2,t}u32(){let t=this.b.readUint32LE(this.o);return this.o+=4,t}i32(){let t=this.b.readInt32LE(this.o);return this.o+=4,t}f32(){let t=this.b.readFloatLE(this.o);return this.o+=4,t}u64(){let t=this.b.readBigUint64LE(this.o);return this.o+=8,t}i64(){let t=this.b.readBigInt64LE(this.o);return this.o+=8,t}string(t){let o=this.u16();if(o<=t){o=o*2;let a=this.b.toString("utf16le",this.o,this.o+o);return this.o+=o,a}return""}bytes(t=0,o,a){if(o&&t>o)return Buffer.alloc(0);a&&(t=t*a);let u=Buffer.from(this.b.subarray(this.o,this.o+t));return this.o+=t,u}array(t,o,a){return a&&t>a?[]:new Array(t).fill(void 0).map(o)}},Co=class{b;o;constructor(t=65535){this.b=Buffer.allocUnsafe(t),this.o=0}get value(){return this.b.subarray(0,this.o)}skip(t=0){this.o+=t}bool(t=!1){return this.u8(t?1:0),t}u8(t=0){this.b.writeUInt8(t,this.o++)}i8(t=0){this.b.writeInt8(t,this.o++)}u16(t=0){this.o=this.b.writeUInt16LE(t,this.o)}i16(t=0){this.o=this.b.writeInt16LE(t,this.o)}u32(t=0){this.o=this.b.writeUInt32LE(t,this.o)}i32(t=0){this.o=this.b.writeInt32LE(t,this.o)}f32(t=0){this.o=this.b.writeFloatLE(t,this.o)}u64(t=0n){this.o=this.b.writeBigUInt64LE(BigInt(t),this.o)}i64(t=0n){this.o=this.b.writeBigInt64LE(BigInt(t),this.o)}string(t="",o=0){this.u16(t.length),t.length<=o&&(this.o+=this.b.write(t,this.o,"utf16le"))}bytes(t=Buffer.alloc(0),o={}){if(o.maxLen){let a=o.multiplier??1;if(t.length%a)throw new Error(`Error writing bytes, chunkSize should be a multiple of intut value size, got ${t.length}%${a}`);let u=t.length/a;if(u>o.maxLen)throw new Error(`Error writing bytes, input value size exceeded maxLen, got ${u} > ${o.maxLen}`);if(!o.lenType)throw new Error(`Error writing bytes, invalid lenType when writing chunks, got ${o.lenType}`);this[o.lenType](u)}else if(o.length&&t.length!==o.length)throw new Error(`Error writing bytes, input value size doesn't match opts.length, ${t.length} !== ${o.lenType}`);this.o+=t.copy(this.b,this.o)}array(t=[],o,a){if(t===void 0||t.length>o.maxLen){this[o.lenType](0);return}this[o.lenType](t.length),t.forEach(a)}};function y(e){let t={};return t.id=e.u32(),t.points=e.u16(),t.level=e.u8(),t}function h(e){let t=new n(e),o={};return o.abilityDataList=t.array(t.u16(),()=>y(t),100),o}var R="PKTAbilityChangeNotify",B=24596;function Mo(e){let t={};return t.level=e.u32(),t.featureType=e.u16(),t}function A(e){let t=new n(e),o={};return o.objectId=t.u64(),o.activeAbilityList=t.array(t.u16(),()=>Mo(t),60),o}var L="PKTActiveAbilityNotify",w=37950;function C(e){let t=new n(e),o={};return o.objectId=t.u64(),o.addonSkillFeatureList=t.array(t.u16(),()=>{let a={};return a.addonSkillFeatureIdList=t.array(t.u16(),()=>t.u32(),5),a.skillId=t.u32(),a},200),o.addonFeatureIdList=t.bytes(t.u16(),200,4),o}var M="PKTAddonSkillFeatureChangeNotify",j=53159;function F(e){let t=new n(e),o={};return o.packetResultCode=t.u32(),o.unk1_m=t.bytes(t.u32(),688),o}var U="PKTAuthTokenResult",O=38131;function q(e){let t=new n(e),o={};return o.paralyzationPoint=t.u32(),o.type=t.u8(),t.skip(1),o.paralyzationMaxPoint=t.u32(),o.objectId=t.u64(),o}var z="PKTBlockSkillStateNotify",Z=28308;function V(e){let t=new n(e),o={};return o.targetId=t.u64(),t.skip(1),o.type=t.u32(),o.sourceId=t.u64(),t.skip(1),o}var H="PKTCounterAttackNotify",G=3338;function W(e){let t=new n(e),o={};return o.unk0=t.u32(),o.unk1=t.u32(),o.unk2=t.u64(),o.unk3=t.u16(),t.bool()&&(o.unk5_0=t.u8()),o.unk6=t.u8(),o.targetId=t.u64(),t.bool()&&(o.unk9_0=t.u8()),o.sourceId=t.u64(),t.bool()&&(o.unk12_0=t.u8()),o}var Y="PKTDeathNotify",$=31699;var yn=[0,31,28,31,30,31,30,31,31,30,31,30,31];function kn(e){return!(e%4||!(e%100)&&e%400)}function Tn(e,t,o){if(e>99){if(e<1752||e==1752&&(t<9||t==9&&o<<14))return!1}else e+=1900;return o>0&&t<=12&&(o<=yn[t]||o==29&&t==2&&kn(e))}function J(e){let t=Number(e&0xffffffffn),o=Number(e>>32n&0xffffffffn),a=t&4095,u=(t&65535)>>12,f=t>>16&31;Tn(a,u,f)||(a=u=f=0);let m=t>>21&31,P=t>>26&63,x=o&63,v=o>>6&16383;return m<24&&P<60&&x<60&&v<1e3||(m=24,P=x=v=0),new Date(Date.UTC(a<=99?a+1900:a,u-1,f,m,P,x,v))}function jo(e){let t=0n;return t|=BigInt(e.getUTCMilliseconds())<<38n,t|=BigInt(e.getUTCSeconds())<<32n,t|=BigInt(e.getUTCMinutes())<<26n,t|=BigInt(e.getUTCHours())<<21n,t|=BigInt(e.getUTCDate())<<16n,t|=BigInt(e.getUTCMonth()+1)<<12n,t|=BigInt(e.getUTCFullYear()<2e3?e.getUTCFullYear()-1900:e.getUTCFullYear()),t}function p(e,t=0){let o=e.u16();return(o&4095)<2079?(e.o-=2,J(e.i64())):J(BigInt(o)&0xfffn|0x11000n)}function ra(e,t=J(0x1181fn)){t.getUTCFullYear()>=2079?e.u16(Number(jo(t)&0xffffn)):e.i64(jo(t))}function d(e){let t={};return t.id=e.u32(),t.itemTint=e.bytes(e.u16(),3,14),e.bool()&&(t.unk3_0=e.u8()),t.slot=e.u16(),t.level=e.u16(),t.expireTime=p(e),t}function X(e){let t=new n(e),o={};return o.equipItemDataList=t.array(t.u16(),()=>d(t),32),o.objectId=t.u64(),o.unk2=t.u32(),o.unk3=t.u32(),o}var Q="PKTEquipChangeNotify",tt=43232;function et(e){let t=new n(e),o={};return o.equipLifeToolDataList=t.array(t.u16(),()=>d(t),9),o.objectId=t.u64(),o}var ot="PKTEquipLifeToolChangeNotify",nt=28766;function at(e){let t=new n(e),o={};return t.skip(2),o.objectId=t.u64(),o.stance=t.u8(),o}var rt="PKTIdentityStanceChangeNotify",ut=59912;function it(e){let t=new n(e),o={};return o.abilityDataList=t.array(t.u16(),()=>y(t),100),o.struct_134=t.bytes(t.u16(),351,48),o}var st="PKTInitAbility",ft=34460;function mt(e){let t=new n(e),o={};return o.unk0=t.u8(),o.struct_572=t.string(128),o.playerId=t.u64(),o.unk3=t.u32(),o.struct_29=t.array(t.u16(),()=>{let a={};return a.struct_556=t.string(32),a.versionString=t.string(64),a.struct_572=t.string(128),a},64),o.unk5=t.u64(),o.lostArkDateTime=p(t),o.unk7=t.u32(),o}var ct="PKTInitEnv",pt=28091;function Pn(e){if(e.length===0)return 0n;if(e.length>8)throw new Error("Value is too large");let t=Buffer.alloc(8);return e.copy(t),t.readBigInt64LE()}function r(e,t=0){let o=e.u8(),a=e.bytes(o>>1&7),u=Pn(a)<<4n|BigInt(o>>4);return o&1?-u:u}function ya(e,t=0n){let o=Buffer.alloc(8),a=t<0n;o.writeBigInt64LE((a?-t:t)>>4n);let u=0;for(let[f,m]of o.entries())m!=0&&(u=f+1);if(u>7)throw new Error("Value is too large");e.u8(Number((a?-t:t)&0xfn)<<4|(u&7)<<1|(a?1:0)),e.bytes(o.subarray(0,u),{length:u})}function k(e){let t={};return t.unk0=e.u8(),t.unk1=e.u16(),t.unk2=e.u8(),t.unk3=r(e),t.unk4=e.u64(),t.unk5=r(e),t.unk6=e.u8(),t}function s(e){let t={};return t.occurTime=p(e),t.statusEffectId=e.u32(),t.struct_436=e.bytes(e.u16(),8,7),t.sourceId=e.u64(),e.bool()&&(t.value=e.bytes(16)),t.stackCount=e.u8(),t.effectInstanceId=e.u32(),t.endTick=e.u64(),e.bool()&&(t.unk10_0=e.u64()),t.skillLevel=e.u8(),t.totalTime=e.f32(),t}function lt(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u8(),o.unk2=t.bytes(120),o.unk3=t.u16(),o.struct_336=t.bytes(t.u16(),104,30),o.unk5=t.u8(),o.struct_360=t.string(7),o.unk7=t.u8(),o.name=t.string(20),o.unk9=t.u8(),o.characterId=t.u64(),o.unk11=t.u16(),o.unk12=t.u8(),o.unk13=t.u8(),o.unk14=t.u8(),o.unk15=t.u8(),o.unk16=t.u32(),o.level=t.u16(),o.periodUpdateStatDataList=t.array(t.u16(),()=>k(t),5),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.unk20=t.u8(),o.unk21=t.u8(),o.classId=t.u16(),o.struct_102=t.bytes(t.u16(),62),o.unk24=t.u64(),o.unk25=t.u8(),o.unk26=t.u32(),o.unk27=t.u8(),o.unk28=t.u16(),o.unk29=t.u8(),o.unk30=t.u32(),o.unk31=t.u32(),o.unk32=t.u8(),o.unk33=t.u8(),o.unk34=t.u16(),o.playerId=t.u64(),o.unk36=t.u32(),o.struct_222=t.bytes(t.u16(),3,17),o.unk38=t.u64(),o.unk39=t.u8(),o.unk40=t.u64(),o.unk41=t.u32(),o.unk42=t.bytes(35),o.unk43=t.u32(),o.unk44=t.u32(),o.gearLevel=t.f32(),o.unk46=t.u8(),o.unk47=t.u32(),o.unk48=t.u32(),t.bool()&&(o.unk50_0=t.u32()),o.statPair=t.array(t.u16(),()=>{let a={};return a.value=r(t),a.statType=t.u8(),a},152),o.unk52=t.u8(),o.unk53=t.u8(),o.unk54=t.u32(),o.unk55=t.u64(),o.unk56=t.bytes(25),o.unk57=t.u64(),o}var bt="PKTInitPC",yt=23503;function Fo(e){let t={},o=e.u16();return o===1&&(t.unk1_0=e.bytes(o)),t}function Uo(e){let t={};return t.unk0=e.u32(),t.unk1=e.u32(),t.unk2=e.u8(),t.struct_141=Fo(e),t.struct_142=e.bytes(e.u16(),3,9),t.unk5=e.u8(),t.unk6=e.u8(),t.unk7=e.u8(),t}function Oo(e){let t={};return t.struct_386=e.bytes(e.u16(),2,10),t.unk1=e.u64(),t.unk2=e.u16(),t.unk3=e.u32(),t.unk4=e.u32(),t.struct_255=e.bytes(e.u16(),2,9),t.unk6=e.u32(),t.struct_232=e.array(e.u16(),()=>Uo(e),3),t.unk8=e.u32(),t.unk9=e.u32(),t.struct_296=e.bytes(e.u16(),10,18),t.struct_143=e.bytes(e.u16(),10,9),t.unk12=e.u32(),t.unk13=e.u8(),t}function qo(e){let t={};return t.struct_482=e.bytes(e.u16(),3,7),t.struct_268=e.bytes(e.u16(),10,29),t.unk2=e.u32(),t.unk3=e.u8(),t.unk4=e.u32(),t.itemTint=e.bytes(e.u16(),3,14),t.unk6=e.u32(),e.bool()&&(t.struct_189=e.bytes(e.u16(),5,30),t.unk1_1=e.u32(),t.unk1_2=e.u32()),t.unk8=e.u32(),t.unk9=e.u32(),e.bool()&&(t.struct_228=e.bytes(e.u16(),2,32)),t.unk12=e.u32(),t.struct_266=e.bytes(e.u16(),3,21),t.struct_431=e.bytes(e.u16(),3,10),e.bool()&&(t.unk16_0=e.bytes(9)),t}function S(e){let t={};return t.npcId=e.u32(),t.isDead=e.bool(),t}function Zo(e){let t={};return t.unk0=e.u8(),t.bossKillDataList=e.array(e.u16(),()=>S(e),3),t.struct_0=e.array(e.u16(),()=>{let o={};return o.unk1_0_0=e.u32(),o.struct_509=e.bytes(e.u16(),10),o},3),t.unk3=e.u8(),t.unk4=e.u32(),t}function Vo(e){let t={};return t.unk0=e.u8(),t.struct_482=e.bytes(e.u16(),3,7),t.unk2=e.u8(),t.struct_22=e.array(e.u16(),()=>{let o={};return o.unk1_0_0=e.u16(),o.unk1_0_1=e.u8(),o.struct_230=e.string(2),o},20),t.struct_231=e.bytes(e.u16(),5,7),t.unk5=e.u8(),t}function Ho(e){let t={},o=e.u8();return o===1&&(t.struct_641=Oo(e)),o===2&&(t.struct_1=e.array(e.u16(),()=>{let a={};return a.unk1_0_0=e.u8(),a.unk1_0_1=e.u32(),a.struct_509=e.bytes(e.u16(),10),a.unk1_0_3=e.u8(),a},3),t.unk2_1=e.u8(),t.struct_131=e.bytes(e.u16(),3,6)),o===3&&(t.unk3_0=e.bytes(26)),o===4&&(t.unk4_0=e.u32(),t.unk4_1=e.bytes(e.u16(),10,13),t.unk4_2=e.bytes(e.u16(),10,13)),o===5&&(t.struct_640=qo(e)),o===6&&(t.struct_587=Zo(e)),o===7&&(t.unk7_0=e.bytes(9)),o===8&&(t.struct_634=Vo(e)),o===9&&(t.unk9_0=e.u8()),t}function Go(e){let t={};return e.u32()>0&&(t.serialNumber=e.u64(),t.id=e.u32(),t.level=e.u16(),t.slot=e.u16(),t.durability=e.u32(),t.unk1_6_m=e.u32(),t.flag=e.u32(),t.expireTime=p(e),t.lockUpdateTime=p(e),e.bool()&&(t.unk1_10_0=e.bytes(9)),t.unk1_11=e.u8(),t.unk1_12=e.u8(),t.unk1_13=e.u32(),t.struct_543=Ho(e),t.unk1_15=e.u32()),t}function kt(e){let t=new n(e),o={};return o.itemDataList=t.array(t.u16(),()=>Go(t),80),o.storageType=t.u8(),o}var Tt="PKTInitItem",Pt=11475;function Wo(e){let t={};return e.bool()&&(t.unk1_0=e.bytes(9)),t.unk2=e.u32(),e.bool()&&(t.unk4_0=e.u32()),t.unk5=e.u32(),t.unk6=e.u32(),t}function xt(e){let t=new n(e),o={};return o.unk0=t.u64(),o.addonFeatureIdList=t.bytes(t.u16(),200,4),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.unk3=t.u8(),o.struct_336=t.bytes(t.u16(),104,30),o.addonSkillFeatureList=t.array(t.u16(),()=>{let a={};return a.addonSkillFeatureIdList=t.array(t.u16(),()=>t.u32(),5),a.skillId=t.u32(),a},200),o.struct_222=t.bytes(t.u16(),3,17),o.unk7=t.u64(),o.unk8=t.u8(),o.unk9=t.u32(),t.bool()&&(o.unk11_0=t.u32()),o.abilityDataList=t.array(t.u16(),()=>y(t),100),o.struct_416=t.array(t.u16(),()=>Wo(t),300),o.unk14=t.u8(),o.statPair=t.array(t.u16(),()=>{let a={};return a.value=r(t),a.statType=t.u8(),a},152),o.struct_134=t.bytes(t.u16(),351,48),o}var gt="PKTInitLocal",Kt=39992;function St(e){let t=new n(e),o={};return o.serverAddr=t.string(256),o.account_CharacterId1=t.u64(),o.unk2=t.u32(),o.account_CharacterId2=t.u64(),o}var It="PKTMigrationExecute",Nt=15492;function Yo(e){let t={};return t.unk0=e.u8(),t.lostArkString=e.string(20),t.unk2=e.u64(),t.unk3=e.u8(),t.equipItemDataList=e.array(e.u16(),()=>d(e),32),t.unk5=e.u16(),t.lookData=e.bytes(e.u32(),512),t.unk7=e.u8(),t}function _t(e){return e>>20===1?-((~e>>>0)+1&2097151):e}function i(e,t=0){let o=e.u64();return{x:_t(Number(o&0x1fffffn)),y:_t(Number(o>>21n&0x1fffffn)),z:_t(Number(o>>42n&0x1fffffn))}}function Na(e,t={x:0,y:0,z:0}){e.u64(BigInt(Math.round(t.x??0)>>>0&2097151)|BigInt(Math.round(t.y??0)>>>0&2097151)<<21n|BigInt(Math.round(t.z??0)>>>0&2097151)<<42n)}function l(e,t=0){return e.u16()*(2*Math.PI)/65536}function _a(e,t=0){e.u16(Math.round(t*65536/(2*Math.PI))%65536)}function I(e){let t={};return t.periodUpdateStatDataList=e.array(e.u16(),()=>k(e),5),t.position=i(e),e.bool()&&(t.unk3_0=e.u32()),t.statPair=e.array(e.u16(),()=>{let o={};return o.value=r(e),o.statType=e.u8(),o},152),t.directionYaw=l(e),e.bool()&&(t.transitIndex=e.u32()),t.level=e.u16(),t.statusEffectDatas=e.array(e.u16(),()=>s(e),80),e.bool()&&(t.unk11_0=e.u32()),e.bool()&&(t.unk13_0=e.u8()),e.bool()&&(t.balanceLevel=e.u16()),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),e.bool()&&(t.unk19_0=e.u16()),t.unk20=e.u8(),t.unk21=e.u8(),e.bool()&&(t.unk23_0=e.u32()),t.objectId=e.u64(),e.bool()&&(t.unk26_0=e.u32()),t.unk27=e.u8(),e.bool()&&(t.unk29_0=e.u8()),e.bool()&&(t.unk31_0=e.u8()),e.bool()&&(t.struct_710=Yo(e)),t.unk34=e.u8(),e.bool()&&(t.struct_267=e.bytes(e.u16(),12,12)),e.bool()&&(t.unk38_0=e.u8()),e.bool()&&(t.unk40_0=e.u8()),t.unk41=e.u8(),t.spawnIndex=e.u32(),e.bool()&&(t.unk44_0=e.u64()),e.bool()&&(t.unk46_0=e.u8()),t.unk47=e.u8(),t.typeId=e.u32(),e.bool()&&(t.unk50_0=e.u8()),t}function vt(e){let t=new n(e),o={};return t.bool()&&(o.unk1_0=t.string(20),o.unk1_1=t.string(20)),o.npcStruct=I(t),t.bool()&&(o.unk3_0=t.u8()),o.unk4=t.u8(),t.bool()&&(o.unk6_0=t.u64()),o}var Et="PKTNewNpc",ht=23279;function Rt(e){let t=new n(e),o={};return o.npcData=I(t),o.ownerId=t.u64(),t.skip(35),o.publishReason=t.u8(),o}var Bt="PKTNewNpcSummon",At=30199;function Jo(e){let t={};return t.identityData=e.bytes(25),t.characterId=e.u64(),t.unk28_m=e.u8(),t.unk45_m=e.u32(),t.unk1_m=e.u8(),t.playerId=e.u64(),t.unk29_m=e.u8(),t.periodUpdateStatDataList=e.array(e.u16(),()=>k(e),5),t.level=e.u16(),t.heading=l(e),t.name=e.string(20),t.position=i(e),t.petId=e.u32(),t.unk13=e.u32(),t.avatarHide=e.u8(),t.unk15=e.u8(),t.unk16=e.u32(),t.unk17_m=e.u8(),t.guildName=e.string(20),t.addonFeatureIdList=e.bytes(e.u16(),200,4),t.maxItemLevel=e.f32(),t.secondHonorTitleId=e.u16(),t.worldId=e.u8(),t.unk32_m=e.u8(),t.statusEffectDatas=e.array(e.u16(),()=>s(e),80),t.avgItemLevel=e.f32(),t.unk23_m=e.u8(),t.unk2_m=e.u8(),t.unk0_m=e.bytes(5),t.unk25_m=e.u8(),t.unk5_m=e.u32(),t.classId=e.u16(),t.addonSkillFeatureList=e.array(e.u16(),()=>{let o={};return o.addonSkillFeatureIdList=e.array(e.u16(),()=>e.u32(),5),o.skillId=e.u32(),o},200),t.unk33=e.u32(),t.lookData=e.bytes(e.u32(),512),t.firstHonorTitleId=e.u16(),t.unk7_m=e.u32(),t.unk15_m=e.u8(),t.equipLifeToolDataList=e.array(e.u16(),()=>d(e),9),t.rvRLevel=e.u16(),t.statPair=e.array(e.u16(),()=>{let o={};return o.value=r(e),o.statType=e.u8(),o},152),t.guildId=e.u64(),t.equipItemDataList=e.array(e.u16(),()=>d(e),32),t.unk4_m=e.u32(),e.bool()&&(t.grabbedData=e.bytes(12)),t}function Xo(e){let t={};return e.bool()&&(t.unk1_0=e.bytes(12)),t.unk2=e.u32(),t.unk3=e.u32(),t.unk4=e.bytes(12),t}function Lt(e){let t=new n(e),o={};return t.bool()&&(o.unk4_0_m=t.bytes(12)),o.unk0_m=t.u8(),o.unk2_m=t.u8(),t.bool()&&(o.unk5_0_m=t.bytes(20)),o.pcStruct=Jo(t),t.bool()&&(o.trackMoveInfo=Xo(t)),t.bool()&&(o.unk3_0_m=t.u32()),o}var wt="PKTNewPC",Ct=18659;function N(e,t=0){return{first:e.u8(),second:e.u8(),third:e.u8()}}function Qo(e,t){e.u8(t.first),e.u8(t.second),e.u8(t.third)}function _(e,t=0){return{first:e.u16(),second:e.u16(),third:e.u16()}}function en(e,t){e.u16(t.first),e.u16(t.second),e.u16(t.third)}function nn(e){let t={};return e.bool()&&(t.unk1_0=e.u32()),t.unk2=e.u64(),t.chainSkillEffect=e.u32(),t.projectileId=e.u64(),t.unk5=e.u32(),t.unk6=e.u64(),t.unk7=e.u8(),t.unk8=e.u32(),t.tripodIndex=N(e),t.skillLevel=e.u8(),t.skillId=e.u32(),t.targetObjectId=e.u64(),t.unk13=e.u16(),t.unk14=e.u16(),t.tripodLevel=_(e),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),t.ownerId=e.u64(),t.unk19=e.u8(),t.unk20=e.u32(),t.skillEffect=e.u32(),e.bool()&&(t.unk23_0=e.u64()),t}function Mt(e){let t=new n(e),o={};return o.projectileInfo=nn(t),o}var jt="PKTNewProjectile",Ft=25595;function an(e){let t={};return t.objectId=e.u64(),t.skillId=e.u32(),t.unk2=e.u8(),t.position=i(e),e.bool()&&(t.struct_332=e.bytes(e.u16(),11,9)),t.unk6=e.u32(),t.skillEffect=e.u32(),t.unk8=e.u8(),t.unk9=e.u16(),t.ownerId=e.u64(),t.unk11=e.u8(),t.unk12=e.u32(),t.unk13=e.u32(),t}function Ut(e){let t=new n(e),o={};return o.trapData=an(t),o.unk1=t.u8(),o.unk2=t.u8(),o}var Ot="PKTNewTrap",qt=42272;function zt(e){let t=new n(e),o={};return o.noHitCheckTime=t.u32(),t.skip(2),o.objectId=t.u64(),o.decreasePoint=t.u32(),o.enable=t.bool(),o.paralyzationMaxPoint=t.u32(),o.hitCheckTime=t.u32(),o.paralyzationPoint=t.u32(),t.skip(1),o}var Zt="PKTParalyzationStateNotify",Vt=52046;function rn(e){let t={};return t.classId=e.u16(),t.unk1=e.u8(),t.worldId=e.u8(),t.partyMemberNumber=e.u8(),t.auths=e.u8(),t.gearLevel=e.f32(),t.zoneId=e.u32(),t.unk7=e.u8(),t.zoneInstId=e.u64(),t.unk9=e.u8(),t.characterId=e.u64(),t.curHp=r(e),t.characterLevel=e.u16(),t.transitIndex=e.u32(),t.unk14=e.u16(),t.name=e.string(20),t.unk16=e.u8(),t.maxHp=r(e),t.unk18=e.u8(),t.position=i(e),t}function Ht(e){let t=new n(e),o={};return o.memberDatas=t.array(t.u16(),()=>rn(t),40),o.lootGrade=t.u32(),o.partyInstanceId=t.u32(),o.partyType=t.u8(),o.partyLootType=t.u8(),o.raidInstanceId=t.u32(),o}var Gt="PKTPartyInfo",Wt=53401;function Yt(e){let t=new n(e),o={};return o.partyLeaveType=t.u8(),o.name=t.string(20),o.partyInstanceId=t.u32(),o}var $t="PKTPartyLeaveResult",Jt=52494;function Xt(e){let t=new n(e),o={};return o.objectId=t.u64(),o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o.unk0_m=t.u8(),o}var Qt="PKTPartyPassiveStatusEffectAddNotify",te=46451;function ee(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o.objectId=t.u64(),o}var oe="PKTPartyPassiveStatusEffectRemoveNotify",ne=59132;function ae(e){let t=new n(e),o={};return o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.playerIdOnRefresh=t.u64(),o.unk2=t.u8(),o.characterId=t.u64(),o.unk4=t.u64(),o}var re="PKTPartyStatusEffectAddNotify",ue=20762;function ie(e){let t=new n(e),o={};return o.unk0=t.u64(),o.characterId=t.u64(),o.statusEffectIds=t.array(t.u16(),()=>t.u32(),80),o.reason=t.u8(),o}var se="PKTPartyStatusEffectRemoveNotify",fe=38751;function me(e){let t=new n(e),o={};return t.skip(8),o.partyInstanceId=t.u32(),t.skip(20),o.raidInstanceId=t.u32(),o.characterId=t.u64(),o}var ce="PKTPartyStatusEffectResultNotify",pe=10284;function de(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o}var le="PKTPassiveStatusEffectAddNotify",be=33094;function ye(e){let t=new n(e),o={};return o.passiveStatusEffectList=t.array(t.u16(),()=>t.u32(),10),o}var ke="PKTPassiveStatusEffectRemoveNotify",Te=52605;function Pe(e){let t=new n(e),o={};return o.unk6_m=t.u64(),o.unk5_m=t.u64(),o.raidResult=t.u8(),o.initBraveHeartCount=t.u8(),o.totalTime=t.u64(),o.endTick=t.u64(),o.bossKillDataList=t.array(t.u16(),()=>S(t),3),o.unk11_m=t.bool(),o.unk4_m=t.u64(),o.braveHeartCount=t.u8(),o.unk1_m=t.bool(),o.raidId=t.u32(),o.unk0_m=t.bool(),o.startTick=t.u64(),o}var xe="PKTRaidBegin",ge=5602;function Ke(e){let t=new n(e),o={};return o.unk0=t.bytes(6),o}var Se="PKTRaidBossKillNotify",Ie=25178;function Ne(e){let t=new n(e),o={};return o.unk0=t.u8(),o.unk1=t.u8(),o.struct_50=t.array(t.u16(),()=>{let a={};return a.struct_515=t.bytes(t.u16(),3),a.unk1_0_1=t.u32(),a.unk1_0_2=r(t),a.unk1_0_3=r(t),a},3),o.unk3=t.u8(),o.unk4=t.u64(),o.unk5=t.u64(),o.unk6=t.u64(),o.unk7=t.u64(),o}var _e="PKTRaidResult",De=2556;function un(e){let t={};return t.unpublishReason=e.u8(),t.objectId=e.u64(),t}function ve(e){let t=new n(e),o={};return o.unpublishedObjects=t.array(t.u16(),()=>un(t),200),o}var Ee="PKTRemoveObject",he=56585;function Re(e){let t=new n(e),o={};return t.skip(1),o.skillId=t.u32(),t.skip(1),o.skillLevel=t.u8(),o.caster=t.u64(),o}var Be="PKTSkillCastNotify",Ae=3698;function sn(e,t=0){let o={},a=e.u8();return a&1&&(o.moveTime=e.u32()),a&2&&(o.standUpTime=e.u32()),a&4&&(o.downTime=e.u32()),a&8&&(o.freezeTime=e.u32()),a&16&&(o.moveHeight=e.u32()),a&32&&(o.farmostDist=e.u32()),a&64&&(o.flag40=e.bytes(e.u16(),6)),o}function dr(e,t){let o=(t.moveTime===void 0?0:1)|(t.standUpTime===void 0?0:2)|(t.downTime===void 0?0:4)|(t.freezeTime===void 0?0:8)|(t.moveHeight===void 0?0:16)|(t.farmostDist===void 0?0:32)|(t.flag40===void 0?0:64);e.u8(o),o&1&&e.u32(t.moveTime),o&2&&e.u32(t.standUpTime),o&4&&e.u32(t.downTime),o&8&&e.u32(t.freezeTime),o&16&&e.u32(t.moveHeight),o&32&&e.u32(t.farmostDist),o&64&&e.bytes(t.flag40,{maxLen:6,lenType:"u16"})}function D(e){let t={};return t.targetId=e.u64(),t.damage=r(e),t.modifier=e.u8(),t.unk3_m=e.u16(),t.damageType=e.u8(),t.curHp=r(e),t.maxHp=r(e),e.bool()&&(t.damageAttr=e.u8()),t}function mn(e){let t={};return t.unk2_m=e.u64(),t.unk4_m=e.u16(),t.skillMoveOptionData=sn(e),t.position=i(e),t.unk8_m=e.u16(),t.destination=i(e),t.skillDamageEvent=D(e),t.unk3_m=e.u16(),t.unk1_m=e.u8(),t}function Le(e){let t=new n(e),o={};return o.sourceId=t.u64(),o.skillId=t.u32(),o.skillDamageAbnormalMoveEvents=t.array(t.u16(),()=>mn(t),50),o.unk1_m=t.u8(),o.unk2_m=t.u32(),o.skillEffectId=t.u32(),o}var we="PKTSkillDamageAbnormalMoveNotify",Ce=46983;function Me(e){let t=new n(e),o={};return o.skillDamageEvents=t.array(t.u16(),()=>D(t),50),o.skillId=t.u32(),o.skillLevel=t.u8(),o.sourceId=t.u64(),o.skillEffectId=t.u32(),o}var je="PKTSkillDamageNotify",Fe=32457;function Ue(e){let t=new n(e),o={};return t.skip(25),o.sourceId=t.u64(),o.stage=t.u8(),t.skip(2),o.skillId=t.u32(),t.skip(12),o}var Oe="PKTSkillStageNotify",qe=14952;function cn(e,t=0){let o={},a=e.u8();return a&1&&(o.layerIndex=e.u8()),a&2&&(o.startStageIndex=e.u8()),a&4&&(o.transitIndex=e.u32()),a&8&&(o.stageStartTime=e.u32()),a&16&&(o.farmostDistance=e.u32()),a&32&&(o.tripodIndex=N(e)),a&64&&(o.tripodLevel=_(e)),o}function xr(e,t){let o=(t.layerIndex===void 0?0:1)|(t.startStageIndex===void 0?0:2)|(t.transitIndex===void 0?0:4)|(t.stageStartTime===void 0?0:8)|(t.farmostDistance===void 0?0:16)|(t.tripodIndex===void 0?0:32)|(t.tripodLevel===void 0?0:64);e.u8(o),o&1&&e.u8(t.layerIndex),o&2&&e.u8(t.startStageIndex),o&4&&e.u32(t.transitIndex),o&8&&e.u32(t.stageStartTime),o&16&&e.u32(t.farmostDistance),o&32&&Qo(e,t.tripodIndex),o&64&&en(e,t.tripodLevel)}function ze(e){let t=new n(e),o={};return o.skillId=t.u32(),t.bool()&&(o.unk1_m=t.u32()),o.curDirectionYaw=l(t),o.curPosition=i(t),o.newDirectionYaw=l(t),t.bool()&&(o.aiStateId=t.u32()),t.bool()&&(o.pitchRotation=l(t)),o.aimTargetPosition=i(t),o.sourceId=t.u64(),o.newPosition=i(t),o.skillOptionData=cn(t),o.skillLevel=t.u8(),o}var Ze="PKTSkillStartNotify",Ve=37127;function He(e){let t=new n(e),o={};return o.unk0=t.u8(),o.objectId=t.u64(),o.unk2=t.array(t.u16(),()=>{let a={};return a.value=r(t),a.statType=t.u8(),a},152),t.bool()&&(o.unk4_0=t.u32()),o.unk5=t.array(t.u16(),()=>{let a={};return a.value=r(t),a.statType=t.u8(),a},152),o}var Ge="PKTStatChangeOriginNotify",We=13036;function Ye(e){let t=new n(e),o={};return o.unk0=t.u64(),o.statusEffectData=s(t),o.new=t.bool(),o.objectId=t.u64(),t.bool()&&(o.unk5_0=t.u64()),o}var $e="PKTStatusEffectAddNotify",Je=45856;function Xe(e){let t=new n(e),o={};return o.objectId=t.u64(),o.reason=t.u8(),o.statusEffectIds=t.array(t.u16(),()=>t.u32(),80),o}var Qe="PKTStatusEffectRemoveNotify",to=14864;function eo(e){let t=new n(e),o={};return o.effectInstanceId=t.u32(),o.targetId=t.u64(),o.expirationTick=t.u64(),t.skip(1),o}var oo="PKTStatusEffectDurationNotify",no=32340;function ao(e){let t=new n(e),o={};return o.objectId=t.u64(),o.value=t.u32(),t.skip(4),o.characterId=t.u64(),t.skip(2),o.effectInstanceId=t.u32(),o}var ro="PKTStatusEffectSyncDataNotify",uo=11148;function io(e){let t=new n(e),o={};return o.triggerId=t.u32(),t.skip(1),o.unk2_m=t.bool(),o.step=t.u32(),o}var so="PKTTriggerBossBattleStatus",fo=1383;function mo(e){let t=new n(e),o={};return o.involvedPCs=t.array(t.u16(),()=>t.u64(),40),o.triggerId=t.u32(),o.unk0_m=t.u32(),o.packetResultCode=t.u32(),o}var co="PKTTriggerFinishNotify",po=49699;function lo(e){let t=new n(e),o={};return o.involvedPCs=t.array(t.u16(),()=>t.u64(),40),o.sourceId=t.u64(),o.triggerId=t.u32(),o.triggerSignalType=t.u32(),o}var bo="PKTTriggerStartNotify",yo=38535;function ko(e){let t=new n(e),o={};return o.position=t.u64(),o.characterId=t.u64(),o.maxHp=r(t),o.statusEffectDatas=t.array(t.u16(),()=>s(t),80),o.curHp=r(t),o.unk0_m=t.u32(),o}var To="PKTTroopMemberUpdateMinNotify",Po=8071;function xo(e){let t=new n(e),o={};return t.skip(2),o.identityGauge1=t.u32(),o.identityGauge2=t.u32(),o.identityGauge3=t.u32(),o.playerId=t.u64(),o}var go="PKTIdentityGaugeChangeNotify",Ko=10599;function So(e){let t=new n(e),o={};return o.zoneLevel=t.u8(),o.zoneId=t.u32(),o.completeMembers=t.array(t.u16(),()=>t.u64(),40),o.zoneInstId=t.u64(),o.firstPCEnterTick=t.u64(),o.totalMembers=t.array(t.u16(),()=>t.u64(),40),o.loadComplete=t.bool(),o}var Io="PKTZoneMemberLoadStatusNotify",No=1241;function _o(e){let t=new n(e),o={};return t.skip(2),o.objectId=t.u64(),o}var Do="PKTZoneObjectUnpublishNotify",vo=3749;function pn(e){let t={};return e.skip(4),t.instanceId=e.u32(),t.target=e.u8(),t.stackCount=e.u8(),t.id=e.u32(),t}function Eo(e){let t=new n(e),o={};return o.zoneStatusEffectDataList=t.array(t.u16(),()=>pn(t),4),o}var ho="PKTZoneStatusEffectAddNotify",Ro=53788;function Bo(e){let t=new n(e),o={};return t.skip(1),o.statusEffectId=t.u32(),o}var Ao="PKTZoneStatusEffectRemoveNotify",Lo=55782;var dn=new Map([[B,[R,h]],[w,[L,A]],[j,[M,C]],[O,[U,F]],[Z,[z,q]],[G,[H,V]],[$,[Y,W]],[tt,[Q,X]],[nt,[ot,et]],[ut,[rt,at]],[ft,[st,it]],[pt,[ct,mt]],[yt,[bt,lt]],[Pt,[Tt,kt]],[Kt,[gt,xt]],[Nt,[It,St]],[ht,[Et,vt]],[At,[Bt,Rt]],[Ct,[wt,Lt]],[Ft,[jt,Mt]],[qt,[Ot,Ut]],[Vt,[Zt,zt]],[Wt,[Gt,Ht]],[Jt,[$t,Yt]],[te,[Qt,Xt]],[ne,[oe,ee]],[ue,[re,ae]],[fe,[se,ie]],[pe,[ce,me]],[be,[le,de]],[Te,[ke,ye]],[ge,[xe,Pe]],[Ie,[Se,Ke]],[De,[_e,Ne]],[he,[Ee,ve]],[Ae,[Be,Re]],[Ce,[we,Le]],[Fe,[je,Me]],[qe,[Oe,Ue]],[Ve,[Ze,ze]],[We,[Ge,He]],[Je,[$e,Ye]],[to,[Qe,Xe]],[no,[oo,eo]],[uo,[ro,ao]],[fo,[so,io]],[po,[co,mo]],[yo,[bo,lo]],[Po,[To,ko]],[Ko,[go,xo]],[No,[Io,So]],[vo,[Do,_o]],[Ro,[ho,Eo]],[Lo,[Ao,Bo]]]);var ln=class extends zn{#t;constructor(t){super(),this.#t=t}read(t){try{if(t.length<8)return!1;let o=t.readUInt8(7);if(o>2)return!1;let a=t.readUInt8(6);if(a>3)return!1;let u=t.subarray(8),f=t.readUInt16LE(4),m=dn.get(f);if(m){let[P,x]=m;this.emit(P,new wo(Buffer.from(u),f,a,!!o,this.#t,x))}this.emit("*",u,f,a,!!o)}catch{return!1}}},wo=class{#t;#o;#n;#a;#r;#u;constructor(t,o,a,u,f,m){this.#t=t,this.#o=o,this.#n=a,this.#a=u,this.#r=f,this.#u=m}#e;get parsed(){if(!this.#e)try{this.#e=this.#u(this.#r.decrypt(this.#t,this.#o,this.#n,this.#a))}catch(t){console.error(`[meter-core/pkt-stream] - ${t}`);return}return this.#e}};export{n as a,Co as b,B as c,w as d,j as e,Z as f,G as g,$ as h,p as i,ra as j,tt as k,nt as l,ut as m,ft as n,pt as o,r as p,ya as q,yt as r,Pt as s,Kt as t,Nt as u,i as v,Na as w,l as x,_a as y,ht as z,At as A,Ct as B,N as C,Qo as D,_ as E,en as F,Ft as G,qt as H,Vt as I,Wt as J,Jt as K,te as L,ne as M,ue as N,fe as O,pe as P,be as Q,Te as R,ge as S,Ie as T,De as U,he as V,Ae as W,sn as X,dr as Y,Ce as Z,Fe as _,qe as $,cn as aa,xr as ba,Ve as ca,Je as da,to as ea,no as fa,uo as ga,fo as ha,po as ia,yo as ja,Po as ka,Ko as la,No as ma,vo as na,Ro as oa,Lo as pa,dn as qa,ln as ra,wo as sa};
