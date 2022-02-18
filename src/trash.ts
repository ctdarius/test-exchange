// async function orderMatch(buy: Order, sell: Order) {
//   console.log(buy.side, sell.side);
//   let result = (buy.side === 0  && sell.side == 1 )&&
//     /* Must use same fee method. */
//     buy.feeMethod === sell.feeMethod &&
//     /* Must use same payment token. */
//     buy.paymentToken === sell.paymentToken &&
//     /* Must match maker/taker addresses. */
//     (sell.taker === constants.NULL_ADDRESS || sell.taker === buy.maker) &&
//     (buy.taker === constants.NULL_ADDRESS || buy.taker === sell.maker) &&
//     /* One must be maker and the other must be taker (no bool XOR in Solidity). */
//     ((sell.feeRecipient == constants.NULL_ADDRESS && buy.feeRecipient != constants.NULL_ADDRESS) || (sell.feeRecipient != constants.NULL_ADDRESS && buy.feeRecipient == constants.NULL_ADDRESS)) &&
//     /* Must match target. */
//     (buy.target == sell.target) &&
//     /* Must match howToCall. */
//     buy.howToCall === sell.howToCall;
//   console.log(result);
// }



// function hashToSign(order:Order){
//     const args:WyvernHashToSign=[
//         [
            
//         ],
//         [],
//     ]
//     let result= forbitExchange.methods.hashToSign_()

// }



// async function getHashToSign(order:Order,address:string)
// {
    
//     let result=await web3.eth.sign("Hello world", "0x5A5316f2619BF119c2FB2230669b1A4c5a707279")
// }
// getHashToSign(sell,'0x5A5316f2619BF119c2FB2230669b1A4c5a707279')