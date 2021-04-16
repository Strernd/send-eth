require("dotenv").config();
import { Wallet } from "ethers";
import { joinSignature } from "@ethersproject/bytes";

export async function sign(tosign: string) {
  const w = Wallet.fromMnemonic(process.env.MNEMONIC!);
  console.log("Wallet address: ", await w.getAddress());
  console.log("Tosign: ", `0x${tosign}`);
  const signature = await w._signingKey().signDigest(`0x${tosign}`);
  console.log("Signature: ", joinSignature(signature));
  return joinSignature(signature);
}
