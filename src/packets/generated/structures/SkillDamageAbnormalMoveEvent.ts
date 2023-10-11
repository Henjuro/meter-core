// Auto Generated, do not edit.
import type { Read } from "../../stream";
import * as SkillMoveOptionData from "../../common/SkillMoveOptionData";
import * as SkillDamageEvent from "../structures/SkillDamageEvent";
import * as Vector3F from "../../common/Vector3F";
export type SkillDamageAbnormalMoveEvent = {
  unk8_m: number;
  skillMoveOptionData: SkillMoveOptionData.SkillMoveOptionData;
  destination: Vector3F.Vector3F;
  position: Vector3F.Vector3F;
  unk3_m: number;
  skillDamageEvent: SkillDamageEvent.SkillDamageEvent;
  unk1_m: number;
  unk4_m: number;
  unk2_m: bigint;
};
export function read(reader: Read) {
  const data = {} as SkillDamageAbnormalMoveEvent;
  data.unk8_m = reader.u16();
  data.skillMoveOptionData = SkillMoveOptionData.read(reader);
  data.destination = Vector3F.read(reader);
  data.position = Vector3F.read(reader);
  data.unk3_m = reader.u16();
  data.skillDamageEvent = SkillDamageEvent.read(reader);
  data.unk1_m = reader.u8();
  data.unk4_m = reader.u16();
  data.unk2_m = reader.u64();
  return data;
}
