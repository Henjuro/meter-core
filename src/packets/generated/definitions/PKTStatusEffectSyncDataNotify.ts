// Auto Generated, do not edit.
import { Read } from "../../stream";
export type PKTStatusEffectSyncDataNotify = {
  value: number;
  objectId: bigint;
  characterId: bigint;
  effectInstanceId: number;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTStatusEffectSyncDataNotify;
  reader.skip(1);
  data.value = reader.u32();
  reader.skip(4);
  data.objectId = reader.u64();
  data.characterId = reader.u64();
  data.effectInstanceId = reader.u32();
  reader.skip(2);
  return data;
}
export const name = "PKTStatusEffectSyncDataNotify";
export const opcode = 15555;
