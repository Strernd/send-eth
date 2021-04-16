import Eth from "ethjs";
import axios from "axios";
import { BigNumber } from "ethers";

const eth = new Eth(new Eth.HttpProvider(process.env.INFURA));

export async function sendRawTransaction(rawTx: string): Promise<any> {
  const result = await eth.sendRawTransaction(rawTx);
  if (!result) return null;
  else return result;
}

export async function getTransactionCount(address: string): Promise<any> {
  const result = await eth.getTransactionCount(address, "latest");
  if (!result) return null;
  else return result.toString(10);
}

export async function getGasPrice(): Promise<BigNumber | null> {
  const gasInfo = await axios.get(
    `https://ethgasstation.info/api/ethgasAPI.json?api-key=${process.env.ETHGASSTATION_APIKEY}`
  );
  if (gasInfo && gasInfo.data) {
    return BigNumber.from(gasInfo.data.fast).mul(BigNumber.from("100000000"));
  } else return null;
}
