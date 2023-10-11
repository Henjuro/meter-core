// Auto Generated, do not edit.
import type { Read } from "../../stream";
export type ZoneStatusEffectData = {
  id: number;
  stackCount: number;
  target: number;
  instanceId: number;
};
export function read(reader: Read) {
  const data = {} as ZoneStatusEffectData;
  reader.skip(4);
  data.id = reader.u32();
  data.stackCount = reader.u8();
  data.target = reader.u8();
  data.instanceId = reader.u32();
  return data;
}
