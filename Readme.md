# .env File

INFURA=https://rinkeby.infura.io/v3/mykey
MNEMONIC=inset 12 words here
CHAIN_ID=4
ETHGASSTATION_APIKEY=enter api key here

## Commands

`yarn address` shows address of wallet with mnemonic  
`yarn start` create, sign and broadcast a transaction

You will have to change `fromAddress` and `toAddress` in `src/index.ts` `fromAddress` must be the address of the provided wallet.
Use `feeScaleFactor` to overcome underpriced replacement transactions
