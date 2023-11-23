const { Ed25519Keypair, Ed25519PublicKey } = require('@mysten/sui.js/keypairs/ed25519');
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

    const HERO_MODULE = "0xf4865f71c6e9004a39f1b4d6f685f8d9a5d6c73527f74bde231ac1b8ed7772df";
    txb.moveCall({
        arguments: [txb.pure('Chuck'), txb.pure('https://i.ibb.co/GvPZ9yw/11.png')],
        target: `${HERO_MODULE}::my_hero::mint`,
    });

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
