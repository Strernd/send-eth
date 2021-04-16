import { AssetTransactionData } from "./types";
import { utils, BigNumber } from "ethers";
import * as eth from "./eth";
import keccak256 from "keccak256";

export async function createTransaction(
  transactionData: AssetTransactionData,
  feeScaleFactor: number = 100
): Promise<{
  partialTx: object;
  tosign: string;
}> {
  const gasPriceRaw = await eth.getGasPrice();
  const gasPrice = gasPriceRaw!.mul(feeScaleFactor).div(100);
  const txCount = await eth.getTransactionCount(transactionData.fromAddress);
  const gasLimit = BigNumber.from("21000");
  const totalGas = gasLimit.mul(gasPrice);
  const value = BigNumber.from(transactionData.amount).sub(totalGas);
  if (value.isNegative()) {
    throw "INSUFFICIENT_AMOUNT";
  }
  const tx: utils.UnsignedTransaction = {
    to: transactionData.toAddress,
    nonce: Number(txCount) + 1,
    gasLimit: gasLimit.toHexString(),
    gasPrice: gasPrice.toHexString(),
    value: value.toHexString(),
    data: "0x",
    chainId: process.env.CHAIN_ID ? Number(process.env.CHAIN_ID) : 0,
  };
  const serialized = utils.serializeTransaction(tx);
  const hash = "0x" + keccak256(serialized).toString("hex");
  return { partialTx: tx, tosign: hash.substr(2) };
}
