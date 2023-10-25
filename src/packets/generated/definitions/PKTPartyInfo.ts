// Auto Generated, do not edit.
import { Read } from "../../stream";
import * as PartyMemberData from "../structures/PartyMemberData";
export type PKTPartyInfo = {
  memberDatas: PartyMemberData.PartyMemberData[];
  lootGrade: number;
  partyInstanceId: number;
  partyType: number;
  partyLootType: number;
  raidInstanceId: number;
};
export function read(buf: Buffer) {
  const reader = new Read(buf);
  const data = {} as PKTPartyInfo;
  data.memberDatas = reader.array(reader.u16(), () => PartyMemberData.read(reader), 40);
  data.lootGrade = reader.u32();
  data.partyInstanceId = reader.u32();
  data.partyType = reader.u8();
  data.partyLootType = reader.u8();
  data.raidInstanceId = reader.u32();
  return data;
}
export const name = "PKTPartyInfo";
export const opcode = 53401;
