import * as eth from "./eth";
import { utils } from "ethers";

export async function signAndSendTransaction(
  partialTx: utils.UnsignedTransaction,
  signature: string
): Promise<string> {
  const withSignature = utils.serializeTransaction(partialTx, signature);
  console.info("Serialized Transaction ", withSignature);
  const hash = await eth.sendRawTransaction(withSignature);
  return hash;
}
