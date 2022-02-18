import { BigNumber } from "ethers";

export interface ECSignature {
    v: number;
    r: string;
    s: string;
}
export type WyvernAtomicMatchParameters = [
    string[],
    BigNumber[],
    Array<number | BigNumber>,
    string,
    string,
    string,
    string,
    string,
    string,
    Array<number | BigNumber>,
    string[]
  ];

export type WyvernOrderCanMatchParameters = [
    string[],
    BigNumber[],
    Array<number | BigNumber>,
    string,
    string,
    string,
    string,
    string,
    string,
  ];
export type WyvernHashToSign = [
    string[],
    BigNumber[],
    number,
    number,
    number,
    number,
    string,
    string,
    string
  ];

  export type WyvernValidateOrder = [
    string[],
    BigNumber[],
    number,
    number,
    number,
    number,
    string,
    string,
    string,
    number,
    string,
    string
  ];

export interface Order {
    exchange: string;
    maker: string;
    taker: string;
    makerRelayerFee: BigNumber;
    takerRelayerFee: BigNumber;
    makerProtocolFee: BigNumber;
    takerProtocolFee: BigNumber;
    feeRecipient: string;
    feeMethod: number;
    side: number;
    saleKind: number;
    target: string;
    howToCall: number;
    calldata: string;
    replacementPattern: string;
    staticTarget: string;
    staticExtradata: string;
    paymentToken: string;
    basePrice: BigNumber;
    extra: BigNumber;
    listingTime: BigNumber;
    expirationTime: BigNumber;
    salt: BigNumber;
}