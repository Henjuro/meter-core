// Auto Generated, do not edit.
import { Read } from "../../stream";
export type PKTParalyzationStateNotify = {
  paralyzationPoint: number;
  objectId: bigint;
  enable: boolean;
  noHitCheckTime: number;
  decreasePoint: number;
  paralyzationMaxPoint: number;
  hitCheckTime: number;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTParalyzationStateNotify;
  data.paralyzationPoint = reader.u32();
  data.objectId = reader.u64();
  data.enable = reader.bool();
  data.noHitCheckTime = reader.u32();
  data.decreasePoint = reader.u32();
  data.paralyzationMaxPoint = reader.u32();
  reader.skip(1);
  data.hitCheckTime = reader.u32();
  return data;
}
export const name = "PKTParalyzationStateNotify";
export const opcode = 31762;
