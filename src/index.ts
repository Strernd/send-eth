require("dotenv").config();
import { createTransaction } from "./createTransaction";
import { sign } from "./sign";
import { signAndSendTransaction } from "./signAndSendTransaction";

(async () => {
  try {
    const { partialTx, tosign } = await createTransaction(
      {
        fromAddress: "0xb0524d198B35f35f80971773aa13E9e07449beAB",
        toAddress: "0xcBff0f11f63773F69968782d9b91e97CfcB90b1f",
        amount: "50000000000000000",
      },
      260
    );
    const signature = await sign(tosign);
    const hash = await signAndSendTransaction(partialTx, signature);
    console.log("Send result", hash);
    console.log(`https://rinkeby.etherscan.io/tx/${hash}`);
  } catch (error) {
    console.log(error);
  }
})();


