import ExchangeContract from "../abi/WyvernExchange.json";
import { BigNumber, ethers } from "ethers";
import Web3 from "web3";
import { Order, WyvernValidateOrder } from "./types";
import {
  WyvernAtomicMatchParameters,
  WyvernOrderCanMatchParameters,
  WyvernHashToSign,
  ECSignature
} from "./types";
import { constants } from "../utils/constants";

const addressSeller = '0x5A5316f2619BF119c2FB2230669b1A4c5a707279'; //sell
const privateKeySeller = '8fd4d88f20463d98a45012059e881071751e76104dd2a7540f0151b256957a11';
const addressBuyer='0x1718f111ef3479f57F50616A4b0B1a8bFe0E4E2d' //buy
const privateKeyBuyer = '26c7624f29a5bf0cc9425acfd7ef6dd727dcce08b9d7518aa2d02aa2f81f569e';
const provider = new Web3.providers.WebsocketProvider(
  "wss://eth-rinkeby.alchemyapi.io/v2/GQGcsJ0-pMmPZKi62W6nNVGhkD8uVpI_"
);
const web3 = new Web3(provider);
const forbitExchange = new web3.eth.Contract(
  <any>ExchangeContract.abi,
  ExchangeContract.address
);
// const _wyvernProtocol = new WyvernProtocol(provider, {
//     network: Network.Rinkeby,
//   });
// console.log(_wyvernProtocol.wyvernExchange.cancelOrder_.sendTransactionAsync)

async function getMethods() {
  var result: any;
  result = await forbitExchange.methods;
  console.log(result);
}
//console.log("Method: ",getMethods())


let buy: Order ={
    exchange: "",
    maker: "",
    taker: "",
    makerRelayerFee: BigNumber.from(0),
    takerRelayerFee: BigNumber.from(0),
    makerProtocolFee: BigNumber.from(0),
    takerProtocolFee: BigNumber.from(0),
    feeRecipient: "",
    feeMethod: 0,
    side: 0,
    saleKind: 0,
    target: "",
    howToCall: 0,
    calldata: "",
    replacementPattern: "",
    staticTarget: "",
    staticExtradata: "",
    paymentToken: "",
    basePrice: BigNumber.from(0),
    extra: BigNumber.from(0),
    listingTime: BigNumber.from(0),
    expirationTime: BigNumber.from(0),
    salt: BigNumber.from(0),
  };;
let sell: Order = {
    exchange: "",
    maker: "",
    taker: "",
    makerRelayerFee: BigNumber.from(0),
    takerRelayerFee: BigNumber.from(0),
    makerProtocolFee: BigNumber.from(0),
    takerProtocolFee: BigNumber.from(0),
    feeRecipient: "",
    feeMethod: 0,
    side: 0,
    saleKind: 0,
    target: "",
    howToCall: 0,
    calldata: "",
    replacementPattern: "",
    staticTarget: "",
    staticExtradata: "",
    paymentToken: "",
    basePrice: BigNumber.from(0),
    extra: BigNumber.from(0),
    listingTime: BigNumber.from(0),
    expirationTime: BigNumber.from(0),
    salt: BigNumber.from(0),
  };;

//console.log("check big number: ",  BigNumber.from(10));
function setSellArgument() {
  sell.exchange = constants.FORBIT_EXCHANGE;
  sell.maker = "0x5A5316f2619BF119c2FB2230669b1A4c5a707279";
  sell.taker = constants.NULL_ADDRESS;
  sell.makerRelayerFee = BigNumber.from(0);
  sell.takerRelayerFee = BigNumber.from(0);
  sell.makerProtocolFee = BigNumber.from(0);
  sell.takerProtocolFee = BigNumber.from(0);
  sell.feeRecipient = "0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8";
  sell.feeMethod = 1; //splitfee
  sell.side = 1; //sell
  sell.saleKind = 0; //fix price
  sell.target = "0xBCC53EB45294E705ceb14679A6ddDf0d86895dA6"; //collection
  sell.howToCall = 1; //delegatecall
  sell.calldata ="0x23b872dd0000000000000000000000005a5316f2619bf119c2fb2230669b1a4c5a70727900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003";
  sell.replacementPattern = "0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000";
  sell.staticTarget = constants.NULL_ADDRESS;
  sell.staticExtradata = "0x";
  sell.paymentToken = constants.NULL_ADDRESS;
  sell.basePrice = BigNumber.from(1000000);
  sell.extra = BigNumber.from(0);
  sell.listingTime = BigNumber.from(1644895407);
  sell.expirationTime = BigNumber.from(0);
  sell.salt = BigNumber.from(1337);
};
function setBuyArgument(){
  buy.exchange = constants.FORBIT_EXCHANGE;
  buy.maker = "0x1718f111ef3479f57F50616A4b0B1a8bFe0E4E2d";
  buy.taker = constants.NULL_ADDRESS;
  buy.makerRelayerFee = BigNumber.from(0);
  buy.takerRelayerFee = BigNumber.from(0);
  buy.makerProtocolFee = BigNumber.from(0);
  buy.takerProtocolFee = BigNumber.from(0);
  buy.feeRecipient = constants.NULL_ADDRESS;
  buy.feeMethod = 1; //splitfee
  buy.side = 0; //buy
  buy.saleKind = 0; //fix price
  buy.target = "0xBCC53EB45294E705ceb14679A6ddDf0d86895dA6"; //collection
  buy.howToCall = 1; //delegatecall
  buy.calldata ="0x23b872dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000001718f111ef3479f57f50616a4b0b1a8bfe0e4e2d0000000000000000000000000000000000000000000000000000000000000003";
  buy.replacementPattern = "0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
  buy.staticTarget = constants.NULL_ADDRESS;
  buy.staticExtradata = "0x";
  buy.paymentToken = constants.NULL_ADDRESS;
  buy.basePrice = BigNumber.from(1000000);
  buy.extra = BigNumber.from(0);
  buy.listingTime = BigNumber.from(1644895407);
  buy.expirationTime = BigNumber.from(0);
  buy.salt = BigNumber.from(1340);
}
setSellArgument()
setBuyArgument()
//ordersCanMatch(buy,sell).then(result=> {console.log("This is order: ",result)});

//===============================================================================//
//===================================OrderCanMatch===============================//
//===============================================================================//

async function ordersCanMatch(buy: Order, sell: Order) {
    const args: WyvernOrderCanMatchParameters = [
      [
        buy.exchange,
        buy.maker,
        buy.taker,
        buy.feeRecipient,
        buy.target,
        buy.staticTarget,
        buy.paymentToken,
        sell.exchange,
        sell.maker,
        sell.taker,
        sell.feeRecipient,
        sell.target,
        sell.staticTarget,
        sell.paymentToken,
      ],
      [
        buy.makerRelayerFee,
        buy.takerRelayerFee,
        buy.makerProtocolFee,
        buy.takerProtocolFee,
        buy.basePrice,
        buy.extra,
        buy.listingTime,
        buy.expirationTime,
        buy.salt,
        sell.makerRelayerFee,
        sell.takerRelayerFee,
        sell.makerProtocolFee,
        sell.takerProtocolFee,
        sell.basePrice,
        sell.extra,
        sell.listingTime,
        sell.expirationTime,
        sell.salt,
      ],
      [
        buy.feeMethod,
        buy.side,
        buy.saleKind,
        buy.howToCall,
        sell.feeMethod,
        sell.side,
        sell.saleKind,
        sell.howToCall,
      ],
      buy.calldata,
      sell.calldata,
      buy.replacementPattern,
      sell.replacementPattern,
      buy.staticExtradata,
      sell.staticExtradata,
    ];
  
    let result = await forbitExchange.methods
      .ordersCanMatch_(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8]
      )
      .call();
    console.log("OrderCanMatch: ",result);
    return result;
  }
//===============================================================================//
//===================================Validate Order Paramater====================//
//===============================================================================//
async function validateOrderParameters(order:Order) {
    const args:WyvernHashToSign=[
        [   order.exchange,
            order.maker,
            order.taker,
            order.feeRecipient,
            order.target,
            order.staticTarget,
            order.paymentToken,
        ],
        [
            order.makerRelayerFee,
            order.takerRelayerFee,
            order.makerProtocolFee,
            order.takerProtocolFee,
            order.basePrice,
            order.extra,
            order.listingTime,
            order.expirationTime,
            order.salt,
        ],
            order.feeMethod,
            order.side,
            order.saleKind,
            order.howToCall,
            order.calldata,
            order.replacementPattern,
            order.staticExtradata
    ]
    let result=await forbitExchange.methods.validateOrderParameters_(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8]
    ).call()
    console.log("Validate Paramater: ",result);
}
//===============================================================================//
//===================================Validate Order =============================//
//===============================================================================//
async function validateOrder(order:Order,sig:ECSignature) {
    const args:WyvernValidateOrder=[
        [   order.exchange,
            order.maker,
            order.taker,
            order.feeRecipient,
            order.target,
            order.staticTarget,
            order.paymentToken,
        ],
        [
            order.makerRelayerFee,
            order.takerRelayerFee,
            order.makerProtocolFee,
            order.takerProtocolFee,
            order.basePrice,
            order.extra,
            order.listingTime,
            order.expirationTime,
            order.salt,
        ],
            order.feeMethod,
            order.side,
            order.saleKind,
            order.howToCall,
            order.calldata,
            order.replacementPattern,
            order.staticExtradata,
            sig.v,
            sig.r,
            sig.s
    ]
    let result= await forbitExchange.methods.validateOrder_(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8],
        args[9],
        args[10],
        args[11],
    ).call()
    console.log("Validate order: ",result);
}
//===============================================================================//
//===================================Get Current Price ==========================//
//===============================================================================//
async function getCurrentPrice(order:Order) {
    const args:WyvernHashToSign=[
        [   order.exchange,
            order.maker,
            order.taker,
            order.feeRecipient,
            order.target,
            order.staticTarget,
            order.paymentToken,
        ],
        [
            order.makerRelayerFee,
            order.takerRelayerFee,
            order.makerProtocolFee,
            order.takerProtocolFee,
            order.basePrice,
            order.extra,
            order.listingTime,
            order.expirationTime,
            order.salt,
        ],
            order.feeMethod,
            order.side,
            order.saleKind,
            order.howToCall,
            order.calldata,
            order.replacementPattern,
            order.staticExtradata
    ]
    let result=await forbitExchange.methods.calculateCurrentPrice_(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8]
    ).call()
    console.log("Current Price: ",result);
    return result;
}
//===============================================================================//
//===================================HashOrder===================================//
//===============================================================================//
async function hashOrderToSign(order:Order,addressUser:string) {
    
     const args:WyvernHashToSign=[
    [   order.exchange,
        order.maker,
        order.taker,
        order.feeRecipient,
        order.target,
        order.staticTarget,
        order.paymentToken,
    ],
    [
        order.makerRelayerFee,
        order.takerRelayerFee,
        order.makerProtocolFee,
        order.takerProtocolFee,
        order.basePrice,
        order.extra,
        order.listingTime,
        order.expirationTime,
        order.salt,
    ],
        order.feeMethod,
        order.side,
        order.saleKind,
        order.howToCall,
        order.calldata,
        order.replacementPattern,
        order.staticExtradata
]
    //console.log("args:",args)
    let hashOrder= await forbitExchange.methods.hashOrder_(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8]

    ).call();
    //  console.log("HashOrder: ",hashOrder);
    // let hashSig= await forbitExchange.methods.hashToSign_(
    //     args[0],
    //     args[1],
    //     args[2],
    //     args[3],
    //     args[4],
    //     args[5],
    //     args[6],
    //     args[7],
    //     args[8]

    // ).call();
    // console.log("HashToSig: ",hashSig);
    let signature=web3.eth.accounts.sign(hashOrder,addressUser);
    console.log("Signature: ",signature);
    //console.log(`SigV:${parseInt(signature.v)} \nSigR:${signature.r} \nSigS:${signature.s}`);
    //let encodeSig=web3.eth.accounts.recover(hash,signature.signature);
    //console.log("EncodeSig: ",encodeSig);

    let ecsignature:ECSignature={
        v:parseInt(signature.v),
        r:signature.r,
        s:signature.s

    };
    return ecsignature;
}
//===============================================================================//
//===================================Approve Order===============================//
//===============================================================================//
async function approveOrder(sell:Order){
    const args:WyvernHashToSign=[
        [   sell.exchange,
            sell.maker,
            sell.taker,
            sell.feeRecipient,
            sell.target,
            sell.staticTarget,
            sell.paymentToken,
        ],
        [
            sell.makerRelayerFee,
            sell.takerRelayerFee,
            sell.makerProtocolFee,
            sell.takerProtocolFee,
            sell.basePrice,
            sell.extra,
            sell.listingTime,
            sell.expirationTime,
            sell.salt,
        ],
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
            sell.calldata,
            sell.replacementPattern,
            sell.staticExtradata
    ]
    const tx = forbitExchange.methods.approveOrder_(
        args[0],
        args[1],
        args[2],
        args[3],
        args[4],
        args[5],
        args[6],
        args[7],
        args[8],
        true
     
  );
  const networkId = await web3.eth.net.getId();
  const gas= await tx.estimateGas({from: addressSeller});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(addressSeller);
  
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: forbitExchange.options.address,
      data:data,
      gas:gas,
      gasPrice:gasPrice,
      nonce:nonce, 
      chainId: networkId,
    },
    privateKeySeller
  );
  const receipt = await web3.eth.sendSignedTransaction(<any>signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);

}
//===============================================================================//
//===================================AtomicMatch=================================//
//===============================================================================//


async function atomicMatch(buy:Order,sigBuy:ECSignature,sell:Order,sigSell:ECSignature,metadata=constants.NULL_BLOCK_HASH,currentPrice:number)
{
    const args:WyvernAtomicMatchParameters=[
        [
            buy.exchange,
            buy.maker,
            buy.taker,
            buy.feeRecipient,
            buy.target,
            buy.staticTarget,
            buy.paymentToken,
            sell.exchange,
            sell.maker,
            sell.taker,
            sell.feeRecipient,
            sell.target,
            sell.staticTarget,
            sell.paymentToken,
          ],
          [
            buy.makerRelayerFee,
            buy.takerRelayerFee,
            buy.makerProtocolFee,
            buy.takerProtocolFee,
            buy.basePrice,
            buy.extra,
            buy.listingTime,
            buy.expirationTime,
            buy.salt,
            sell.makerRelayerFee,
            sell.takerRelayerFee,
            sell.makerProtocolFee,
            sell.takerProtocolFee,
            sell.basePrice,
            sell.extra,
            sell.listingTime,
            sell.expirationTime,
            sell.salt,
          ],
          [
            buy.feeMethod,
            buy.side,
            buy.saleKind,
            buy.howToCall,
            sell.feeMethod,
            sell.side,
            sell.saleKind,
            sell.howToCall,
          ],
          buy.calldata,
          sell.calldata,
          buy.replacementPattern,
          sell.replacementPattern,
          buy.staticExtradata,
          sell.staticExtradata,
          [sigBuy.v || 0, sigSell.v || 0],
          [
            sigBuy.r || constants.NULL_BLOCK_HASH,
            sigBuy.s || constants.NULL_BLOCK_HASH,
            sigSell.r || constants.NULL_BLOCK_HASH,
            sigSell.s || constants.NULL_BLOCK_HASH,
            metadata,
          ],
    ]
    console.log(args)
    const tx = forbitExchange.methods.atomicMatch_(
          args[0],
          args[1],
          args[2],
          args[3],
          args[4],
          args[5],
          args[6],
          args[7],
          args[8],
          args[9],
          args[10],
       
    );
//  console.log("Tx: ",tx);
  const networkId = await web3.eth.net.getId();
  //const gas= await tx.estimateGas({from: addressBuyer});
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(addressBuyer);
  
  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: forbitExchange.options.address,
      value:currentPrice,
      data:data,
      gas:500000,
      gasPrice:gasPrice,
      nonce:nonce, 
      chainId: networkId,
    },
    privateKeyBuyer
  );
  const receipt = await web3.eth.sendSignedTransaction(<any>signedTx.rawTransaction);
  console.log(`Transaction hash: ${receipt.transactionHash}`);

}


//===============================================================================//
//===================================Call Function===============================//
//===============================================================================//
//getMethods()
(async() => {
    let sigSell=await hashOrderToSign(sell,privateKeySeller);
    let sigBuy=await hashOrderToSign(buy,privateKeyBuyer);
    //console.log(sigSell,sigBuy);
    validateOrder(sell,sigSell);
    validateOrderParameters(buy); 
    ordersCanMatch(buy,sell);  
    let price= await getCurrentPrice(sell);
    atomicMatch(buy,sigBuy,sell,sigSell,constants.NULL_BLOCK_HASH,2000000000).then(() => {console.log("end error");});
    //approveOrder(sell);
})();

// [
//     "0x5206e78b21Ce315ce284FB24cf05e0585A93B1d9",
//     "0x1718f111ef3479f57F50616A4b0B1a8bFe0E4E2d",
//     "0x0000000000000000000000000000000000000000",
//     "0x0000000000000000000000000000000000000000",
//     "0xBCC53EB45294E705ceb14679A6ddDf0d86895dA6",
//     "0x0000000000000000000000000000000000000000",
//     "0x0000000000000000000000000000000000000000",
//     "0x5206e78b21Ce315ce284FB24cf05e0585A93B1d9",
//     "0x5A5316f2619BF119c2FB2230669b1A4c5a707279",
//     "0x0000000000000000000000000000000000000000",
//     "0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8",
//     "0xBCC53EB45294E705ceb14679A6ddDf0d86895dA6",
//     "0x0000000000000000000000000000000000000000",
//     "0x0000000000000000000000000000000000000000"
// ]

//exam 
// ["0x5206e78b21Ce315ce284FB24cf05e0585A93B1d9","0x1718f111ef3479f57F50616A4b0B1a8bFe0E4E2d","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0xBCC53EB45294E705ceb14679A6ddDf0d86895dA6","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000","0x5206e78b21Ce315ce284FB24cf05e0585A93B1d9","0x5A5316f2619BF119c2FB2230669b1A4c5a707279","0x0000000000000000000000000000000000000000","0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8","0xBCC53EB45294E705ceb14679A6ddDf0d86895dA6","0x0000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000"]

// [0,0,0,0,1000000,0,1644895407,0,1340,0,0,0,0,1000000,0,1644895407,0,1337]

// [1,0,0,0,1,1,0,0]

// 0x23b872dd0000000000000000000000005a5316f2619bf119c2fb2230669b1a4c5a7072790000000000000000000000001718f111ef3479f57f50616a4b0b1a8bfe0e4e2d0000000000000000000000000000000000000000000000000000000000000003

// 0x00000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

// 0x000000000000000000000000000000000000000000000000000000000000000000000000ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000000000000000000000000000000000000000000000

// 0x

// [0x6113b63e0ff1e0109d2a0aa8a8546bd8b17ab19744de7094eb0c33a9ef37fa9a,0x5934ecd46cf419e82d9dc9491e80ab745566ccc1be16ded4ce167efd5a2b7607,0x2d42d082fe5bebf1e687c26f3cc3574fad7f4b92d5da15d5b740c2dde55a4ec7,0x0487a0073d686cf9ffaf5485289ee5d1363070529ab2ffcfcca04c6e68283e4e,0x0000000000000000000000000000000000000000000000000000000000000000]

// 0x23b872dd000000000000000000000000d33614770361d4e7a6d0483a2a13d82ac109ba1c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006
// 0x23b872dd000000000000000000000000000000000000000000000000000000000000000000000000000000000000000082811059443c7c662ea75433c1b51cf5b7740bab0000000000000000000000000000000000000000000000000000000000000006
[
    0x743274e2df188981c01d35095257ab52ff26604ee95c0e870dc756d04218778e,
    0x300242a974368a5f2dcf4a16f13bc946e6d832929dc43b8867fdf2c3d49898fb,
    0xf5cfbce7162666b7991a35bf7975cc5a05185f903d8dd96b3460846e1dc0ecd9,
    0x1f311a203383ca04cbe8bb444441f10ca0c977f1e70b98715e80f7898d16b13c,
    0x0000000000000000000000000000000000000000000000000000000000000000
  ]

