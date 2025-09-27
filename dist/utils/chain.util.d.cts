interface AbiInput {
    name: string;
    type: string;
    indexed?: boolean;
    components?: AbiInput[];
}
interface AbiItem {
    type: string;
    name?: string;
    inputs?: AbiInput[];
    outputs?: AbiInput[];
    anonymous?: boolean;
}
declare function recoverTypedSignatureV4(signObj: any, signature: string): string;
declare function formatAddress(address: string): string;
declare function buildLoginSignMsg(nonce: string, tips: string): {
    types: {
        EIP712Domain: {
            name: string;
            type: string;
        }[];
        set: {
            name: string;
            type: string;
        }[];
    };
    primaryType: string;
    domain: {
        name: string;
        version: string;
    };
    message: {
        tips: string;
        nonce: string;
    };
};
/**
 * convert address to EIP55 format
 * doc: https://eips.ethereum.org/EIPS/eip-55
 * @param address
 * @returns
 */
declare function toEIP55(address: string): string;
declare function checkPersionalSign(message: string, address: string, signature: string): boolean;
declare const getTopics: (abi: AbiItem) => string;
declare const decodeEvent: (abi: AbiItem, eventData: {
    data: string;
    topics: string[];
}) => any;

export { buildLoginSignMsg, checkPersionalSign, decodeEvent, formatAddress, getTopics, recoverTypedSignatureV4, toEIP55 };
