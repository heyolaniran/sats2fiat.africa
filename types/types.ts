import { Dispatch, SetStateAction } from "react";

export type ToggleHandler = (payload: { id: string }) => void;

export type FiatShitcoin = {
    name: string;
    id: string;
    code: string;
    flagIcon: string;
    prefix: string;
    stateVar: number;
    updateFunc: Dispatch<SetStateAction<number>>;
    [key: string]: any;
}

export type CoinInput = FiatShitcoin & {
    enabled: boolean;
    value: number;
    amount: number;
    allowDecimals: boolean;
    decimalsLimit: number;
    onValueChanged: (value: string | undefined, name: string) => void;
}

export type ExchangeData = {
    priceData: {
        [key: string]: any
    };
    supportedFiatShitcoins: FiatShitcoin[];
    [key: string]: any;
};