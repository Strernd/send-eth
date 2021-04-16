require("dotenv").config();
import { Wallet } from "ethers";

(async () => {
  const w = Wallet.fromMnemonic(process.env.MNEMONIC!);
  console.log("Wallet address: ", await w.getAddress());
})();
