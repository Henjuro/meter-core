// Auto Generated, do not edit.
import type { Read } from "../../stream";
import * as EquipItemData from "../structures/EquipItemData";
export type Struct_711 = {
  unk0: number;
  unk1: number;
  unk2: number;
  unk3: bigint;
  equipItemDataList: EquipItemData.EquipItemData[];
  unk5: number;
  lostArkString: string;
  lookData: Buffer;
};
export function read(reader: Read) {
  const data = {} as Struct_711;
  data.unk0 = reader.u8();
  data.unk1 = reader.u8();
  data.unk2 = reader.u8();
  data.unk3 = reader.u64();
  data.equipItemDataList = reader.array(reader.u16(), () => EquipItemData.read(reader), 32);
  data.unk5 = reader.u16();
  data.lostArkString = reader.string(20);
  data.lookData = reader.bytes(reader.u32(), 512);
  return data;
}
