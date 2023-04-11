import { Dispatch, SetStateAction } from "react";

export type ToggleHandler = (payload: { id: string }) => void;

export type FiatShitCoin = {
    name: string;
    id: string;
    code: string;
    flagIcon: string;
    prefix: string;
    stateVar: number;
    updateFunc: Dispatch<SetStateAction<number>>;
}

export type CoinInput = FiatShitCoin & {
    enabled: boolean;
    value: number;
    amount: number;
    allowDecimals: boolean;
    decimalsLimit: number;
    onValueChanged: (value: string | undefined, name: string) => void;
} 