const { Ed25519Keypair } = require('@mysten/sui.js/keypairs/ed25519');
const { getFullnodeUrl, SuiClient } = require('@mysten/sui.js/client');
const { TransactionBlock } = require("@mysten/sui.js/transactions");

async function main() {

	const exampleMnemonic = 'xxx xxx xxx ...';
	const keypair = Ed25519Keypair.deriveKeypair(exampleMnemonic);

	const publicKey = keypair.getPublicKey();
	const address = publicKey.toSuiAddress();

	console.log(address);
	
	// see Network Interactions with SuiClient for more info on creating clients
	const client = new SuiClient({ url: getFullnodeUrl('devnet') });
	const txb = new TransactionBlock();
	txb.setSender(address);

	// Transfer NFTs to first recipient
	txb.transferObjects(
		[
			'0x2d1ec5c629627182f313707076f34e2062a56a1c1bee995e4465199444ce6b00', // NFT 1
			'0x15fd8aec6c087e6c426803450ff97d89c8c96fefe7c79bf18458a6c3620f99ba', // NFT 2
		], 
		txb.pure("0x86c27108ace46f8625fec3d0bf8c396f915eec664bd909b40c8d0cbf5ff6c9c1") // Receiver
	);

	// Transfer NFTs to second recipient
	txb.transferObjects(
		[
			'0x2d2076ec860f7e3ee7ee79dbf8248c2c06e9a9d42d918096a2efc9460a58c9bf', // NFT 3
			'0x7bfe4c9201b734252071595f0bb02a933f01c2e7c901d35cb9679f33f43393ff', // NFT 4
		], 
		txb.pure("0xdb93ef59063bd9861ffab1a98f3b44a51c9a775dabb0561433cfd27d8aff1e24") // Receiver
	);

	// Collect fee -- 0.01 SUI
	const [coin] = txb.splitCoins(txb.gas, [txb.pure(10000000)]);
	txb.transferObjects([coin], txb.pure("0xdb93ef59063bd9861ffab1a98f3b44a51c9a775dabb0561433cfd27d8aff1e24"));

	const res = await client.signAndExecuteTransactionBlock({ transactionBlock: txb, signer: keypair });
	console.log(res);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
