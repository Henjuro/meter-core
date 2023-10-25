// Auto Generated, do not edit.
import { Read } from "../../stream";
import * as PeriodUpdateStatData from "../structures/PeriodUpdateStatData";
import * as StatusEffectData from "../structures/StatusEffectData";
import * as ReadNBytesInt64 from "../../common/ReadNBytesInt64";
export type PKTInitPC = {
  unk0: number;
  unk1: number;
  unk2: Buffer;
  unk3: number;
  struct_336: Buffer;
  unk5: number;
  struct_360: string;
  unk7: number;
  name: string;
  unk9: number;
  characterId: bigint;
  unk11: number;
  unk12: number;
  unk13: number;
  unk14: number;
  unk15: number;
  unk16: number;
  level: number;
  periodUpdateStatDataList: PeriodUpdateStatData.PeriodUpdateStatData[];
  statusEffectDatas: StatusEffectData.StatusEffectData[];
  unk20: number;
  unk21: number;
  classId: number;
  struct_102: Buffer;
  unk24: bigint;
  unk25: number;
  unk26: number;
  unk27: number;
  unk28: number;
  unk29: number;
  unk30: number;
  unk31: number;
  unk32: number;
  unk33: number;
  unk34: number;
  playerId: bigint;
  unk36: number;
  struct_222: Buffer;
  unk38: bigint;
  unk39: number;
  unk40: bigint;
  unk41: number;
  unk42: Buffer;
  unk43: number;
  unk44: number;
  gearLevel: number;
  unk46: number;
  unk47: number;
  unk48: number;
  unk50_0?: number;
  statPair: { value: bigint; statType: number }[];
  unk52: number;
  unk53: number;
  unk54: number;
  unk55: bigint;
  unk56: Buffer;
  unk57: bigint;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTInitPC;
  data.unk0 = reader.u8();
  data.unk1 = reader.u8();
  data.unk2 = reader.bytes(120);
  data.unk3 = reader.u16();
  data.struct_336 = reader.bytes(reader.u16(), 104, 30);
  data.unk5 = reader.u8();
  data.struct_360 = reader.string(7);
  data.unk7 = reader.u8();
  data.name = reader.string(20);
  data.unk9 = reader.u8();
  data.characterId = reader.u64();
  data.unk11 = reader.u16();
  data.unk12 = reader.u8();
  data.unk13 = reader.u8();
  data.unk14 = reader.u8();
  data.unk15 = reader.u8();
  data.unk16 = reader.u32();
  data.level = reader.u16();
  data.periodUpdateStatDataList = reader.array(reader.u16(), () => PeriodUpdateStatData.read(reader), 5);
  data.statusEffectDatas = reader.array(reader.u16(), () => StatusEffectData.read(reader), 80);
  data.unk20 = reader.u8();
  data.unk21 = reader.u8();
  data.classId = reader.u16();
  data.struct_102 = reader.bytes(reader.u16(), 62);
  data.unk24 = reader.u64();
  data.unk25 = reader.u8();
  data.unk26 = reader.u32();
  data.unk27 = reader.u8();
  data.unk28 = reader.u16();
  data.unk29 = reader.u8();
  data.unk30 = reader.u32();
  data.unk31 = reader.u32();
  data.unk32 = reader.u8();
  data.unk33 = reader.u8();
  data.unk34 = reader.u16();
  data.playerId = reader.u64();
  data.unk36 = reader.u32();
  data.struct_222 = reader.bytes(reader.u16(), 3, 17);
  data.unk38 = reader.u64();
  data.unk39 = reader.u8();
  data.unk40 = reader.u64();
  data.unk41 = reader.u32();
  data.unk42 = reader.bytes(35);
  data.unk43 = reader.u32();
  data.unk44 = reader.u32();
  data.gearLevel = reader.f32();
  data.unk46 = reader.u8();
  data.unk47 = reader.u32();
  data.unk48 = reader.u32();
  if (reader.bool()) data.unk50_0 = reader.u32();
  data.statPair = reader.array(
    reader.u16(),
    () => {
      const l = {} as { value: bigint; statType: number };
      l.value = ReadNBytesInt64.read(reader);
      l.statType = reader.u8();
      return l;
    },
    152
  );
  data.unk52 = reader.u8();
  data.unk53 = reader.u8();
  data.unk54 = reader.u32();
  data.unk55 = reader.u64();
  data.unk56 = reader.bytes(25);
  data.unk57 = reader.u64();
  return data;
}
export const name = "PKTInitPC";
export const opcode = 23503;
