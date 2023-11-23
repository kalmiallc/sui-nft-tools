const { Ed25519Keypair, Ed25519PublicKey } = require('@mysten/sui.js/keypairs/ed25519');
const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client');
const { verifyTransactionBlock } = require('@mysten/sui.js/verify');
const { TransactionBlock } = require("@mysten/sui.js/transactions");

async function main() {

	// const keypair = new Ed25519Keypair();

	const exampleMnemonic = 'xxx xxx xxx ...';
	const keypair = Ed25519Keypair.deriveKeypair(exampleMnemonic);

	// const bytes = keypair.getPublicKey().toRawBytes();
	
	// const publicKey = new Ed25519PublicKey(bytes);
	// const address = publicKey.toSuiAddress();

	const publicKey = keypair.getPublicKey();
	const address = publicKey.toSuiAddress();

	// const bytes = await txb.build({ client });
	// const { signature } = await keypair.signTransactionBlock(bytes);

	// if you have a public key, you can verify it
	// const isValid = await publicKey.verifyTransactionBlock(bytes, signature);
	// or get the public key from the transaction block
	// const publicKey_2 = await verifyTransactionBlock(bytes, signature);

	// console.log(signature);
	// console.log(publicKey_2.toSuiAddress());

	// client.executeTransactionBlock
	const res = await client.signAndExecuteTransactionBlock({ transactionBlock: txb, signer: keypair });
	console.log(res);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
 