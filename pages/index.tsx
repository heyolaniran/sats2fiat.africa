import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import Currency from "../components/Currency";
import PriceData from "../components/PriceData";
import SettingsMenu from "../components/Settings/SettingsMenu";
import { FiatShitcoin, ExchangeData } from "../types/types";

type UserSettings = {
  zarEnabled: boolean;
  ugxEnabled: boolean;
  ngnEnabled: boolean;
  nadEnabled: boolean;
  ghsEnabled: boolean;
  kesEnabled: boolean;
  mwkEnabled: boolean;
  zmwEnabled: boolean;
  xofEnabled: boolean;
  xafEnabled: boolean;
  zwlEnabled: boolean;
  usdEnabled: boolean;
  [key: string]: any; //TS index signature
};

const initUserSettings: UserSettings = {
  zarEnabled: true,
  ugxEnabled: true,
  ngnEnabled: true,
  nadEnabled: true,
  ghsEnabled: true,
  kesEnabled: true,
  mwkEnabled: true,
  zmwEnabled: true,
  xofEnabled: true,
  xafEnabled: true,
  zwlEnabled: true,
  usdEnabled: true,
};

const BTC_PER_SAT = 1 / 100000000;
const formatFiat = (value: number): number => {
  return Number.parseFloat(value.toFixed(4));
};

const USER_SETTINGS_KEY = "USER_SETTINGS";

export default function Home(props: ExchangeData) {
  const [satsValue, setSatsValue] = useState<number>(1);
  const [btcValue, setBTCValue] = useState<number>(BTC_PER_SAT);
  const [zarValue, setZARValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.ZAR)
  ); //South African Rand
  const [ugxValue, setUGXValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.UGX)
  ); //Ugandan Shilling
  const [ngnValue, setNGNValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.NGN)
  ); //Nigerian Naira
  const [nadValue, setNADValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.NAD)
  ); //Namibian Dollar
  const [ghsValue, setGHSValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.GHS)
  ); //Namibian Dollar
  const [kesValue, setKESValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.KES)
  ); //Kenyan Shilling
  const [mwkValue, setMWKValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.MWK)
  ); //Kenyan Shilling
  const [zmwValue, setZMWValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.ZMW)
  ); //Kenyan Shilling
  const [xofValue, setXOFValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.XOF)
  );
  const [xafValue, setXAFValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.XAF)
  );
  const [zwlValue, setZWLValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.ZWL)
  );
  const [usdValue, setUSDValue] = useState<number>(
    formatFiat(BTC_PER_SAT * props.USD)
  );

  const [userSettings, setUserSettings] =
    useState<UserSettings>(initUserSettings);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(true);

  const supportedFiatShitcoins: FiatShitcoin[] = [
    //TODO: combine id and code
    {
      name: "Central African CFA",
      id: "xaf",
      code: "XAF",
      flagIcon: "🇨🇲 🇨🇫 🇹🇩 🇬🇶 🇬🇦 🇨🇬",
      prefix: "F.CFA ",
      stateVar: xafValue,
      updateFunc: setXAFValue,
    },
    {
      name: "Ghana Cedi",
      id: "ghs",
      code: "GHS",
      flagIcon: "🇳🇬",
      prefix: "GH₵ ",
      stateVar: ghsValue,
      updateFunc: setGHSValue,
    },
    {
      name: "Kenyan Shilling",
      id: "kes",
      code: "KES",
      flagIcon: "🇰🇪",
      prefix: "KSh ",
      stateVar: kesValue,
      updateFunc: setKESValue,
    },
    {
      name: "Malawian Kwacha",
      id: "mwk",
      code: "MWK",
      flagIcon: "🇰🇲",
      prefix: "K ",
      stateVar: mwkValue,
      updateFunc: setMWKValue,
    },
    {
      name: "Namibian Dollar",
      id: "nad",
      code: "NAD",
      flagIcon: "🇳🇦",
      prefix: "N$ ",
      stateVar: nadValue,
      updateFunc: setNADValue,
    },
    {
      name: "Nigerian Naira",
      id: "ngn",
      code: "NGN",
      flagIcon: "🇳🇬",
      prefix: "₦ ",
      stateVar: ngnValue,
      updateFunc: setNGNValue,
    },
    {
      name: "South African Rand",
      id: "zar",
      code: "ZAR",
      flagIcon: "🇿🇦",
      prefix: "R ",
      stateVar: zarValue,
      updateFunc: setZARValue,
    },
    {
      name: "Ugandan Shilling",
      id: "ugx",
      code: "UGX",
      flagIcon: "🇺🇬",
      prefix: "UGX ",
      stateVar: ugxValue,
      updateFunc: setUGXValue,
    },
    {
      name: "West African CFA",
      id: "xof",
      code: "XOF",
      flagIcon: "🇧🇯 🇧🇫 🇨🇮 🇲🇱 🇳🇪 🇸🇳 🇹🇬",
      prefix: "F.CFA ",
      stateVar: xofValue,
      updateFunc: setXOFValue,
    },
    {
      name: "Zambian Kwacha",
      id: "zmw",
      code: "ZMW",
      flagIcon: "🇰🇿",
      prefix: "ZK ",
      stateVar: zmwValue,
      updateFunc: setZMWValue,
    },
    {
      name: "Zimbabwean Dollar",
      id: "zwl",
      code: "ZWL",
      flagIcon: "🇿🇼",
      prefix: "$ ",
      stateVar: zwlValue,
      updateFunc: setZWLValue,
    },
    {
      name: "US Dollar",
      id: "usd",
      code: "USD",
      flagIcon: "🇺🇸",
      prefix: "$",
      stateVar: usdValue,
      updateFunc: setUSDValue,
    },
  ];

  const setOtherFiatValues = (
    value: number,
    btcValue: number,
    emittingCurrency: string
  ) => {
    supportedFiatShitcoins.forEach((shitCoin) => {
      if (shitCoin.code == emittingCurrency.toUpperCase()) {
        shitCoin.updateFunc(value);
        return;
      }
      shitCoin.updateFunc(
        Number.parseFloat((btcValue * props[shitCoin.code]).toFixed(4))
      );
    });
  };

  const setAllFiatValues = (btcValue: number) => {
    supportedFiatShitcoins.forEach((shitCoin) => {
      shitCoin.updateFunc(
        Number.parseFloat((btcValue * props[shitCoin.code]).toFixed(4))
      );
    });
  };

  const valueChangedHandler = (name: string, value: number) => {
    if (value == undefined) {
      setSatsValue(0);
      setBTCValue(0);
      setAllFiatValues(0);
      return;
    }
    const valueNumber = value; //required because react (TODO: figure out why)
    let btcValue = 0;
    switch (name) {
      case "sats":
        setSatsValue(valueNumber);
        setBTCValue(valueNumber * BTC_PER_SAT);
        setAllFiatValues(valueNumber * BTC_PER_SAT);
        break;
      case "btc":
        setSatsValue(valueNumber * 100000000);
        setBTCValue(valueNumber);
        setAllFiatValues(valueNumber);
        break;
      default:
        btcValue = valueNumber / props[name.toUpperCase()];
        let roundedBtcValue = Number.parseFloat(btcValue.toFixed(8));
        setBTCValue(roundedBtcValue);
        setSatsValue(Math.round(roundedBtcValue * 100000000));
        setOtherFiatValues(valueNumber, roundedBtcValue, name);
        break;
    }
  };

  const toggleChangedHandler = (event: { id: string }) => {
    let settingIndex = event.id;
    setUserSettings((prevState: UserSettings) => {
      let tmpState: UserSettings = { ...prevState };
      let prevToggle = tmpState[settingIndex];
      tmpState[settingIndex] = !prevToggle;
      localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(tmpState));
      return tmpState;
    });
  };

  useEffect(() => {
    // Get the toggle switch state from LocalStorage when the component mounts
    const storedSettings = localStorage.getItem(USER_SETTINGS_KEY);
    if (storedSettings) {
      setUserSettings(JSON.parse(storedSettings));
    } else {
      localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(userSettings));
    }
    setIsLoadingSettings(false);
  }, []);

  return (
    <div className={styles.container}>
      {!isLoadingSettings && (
        <SettingsMenu
          state={userSettings}
          toggleHandler={toggleChangedHandler}
          fiatShitcoins={supportedFiatShitcoins}
        />
      )}
      <Head>
        <meta name="viewport" content="width=device-width,user=scalable=no" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Convert satoshis to Bitcoin and fiat shitcoins like ZAR, UGX, KES, NGN"
        />
        <meta property="og:url" content="https://sats2fiat.africa" />
        <meta property="og:title" content="sats2fiat.africa" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@shyfire131" />
        <meta name="twitter:title" content="sats2fiat.africa" />
        <meta
          name="twitter:description"
          content="Convert satoshis to bitcoin and fiat 💩coins"
        />
        <meta
          name="twitter:image"
          content="https://sats2fiat.africa/images/card_shifted_final.png"
        />

        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Image
            src="/images/21m.png"
            width={100}
            height={55}
            alt={"Follow the 🐇"}
          />
        </header>
        {/* sats and BTC are special cases so we instantiate them by hand  */}
        <Currency
          name="sats"
          id="sats"
          flagIcon=" "
          enabled={true}
          prefix=""
          amount={satsValue}
          allowDecimals={false}
          decimalsLimit={0}
          onValueChanged={valueChangedHandler}
          // autoFocus={true} //doesn't work on iOS :(
        />
        <Currency
          name="bitcoin"
          id="btc"
          flagIcon=" "
          enabled={true}
          prefix=""
          amount={btcValue}
          allowDecimals={true}
          decimalsLimit={8}
          onValueChanged={valueChangedHandler}
        />
        {/* fiat */}
        {supportedFiatShitcoins.map((shitCoin) => {
          let enabledKey = shitCoin.id + "Enabled";
          if (userSettings[enabledKey]) {
            return (
              <Currency
                key={shitCoin.id} //required by React
                name={shitCoin.name}
                id={shitCoin.id}
                flagIcon={shitCoin.flagIcon}
                enabled={true}
                prefix={shitCoin.prefix}
                amount={shitCoin.stateVar}
                allowDecimals={true}
                decimalsLimit={4}
                onValueChanged={valueChangedHandler}
              ></Currency>
            );
          }
        })}
        {/* Unable to fetch fiat prices right now. Please try again later. */}
      </main>
      <footer className={styles.footer}>
        <PriceData
          priceData={props}
          supportedFiatShitcoins={supportedFiatShitcoins}
        />
        <div>
          <Link
            href="https://github.com/shyfire-131/sats2fiat.africa"
            target={"_blank"}
            rel="noreferrer"
          >
            <span className={styles.logo}>
              <Image
                src="/github.svg"
                alt="GitHub Logo"
                width={72}
                height={20}
              />
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  interface CurrencyApiResponse {
    code: string;
    name: string;
    rate: number;
  }
  let tmpExchangeData: ExchangeData = {
    priceData: {},
    supportedFiatShitcoins: [],
  };
  const response = await fetch("https://api.bitnob.co/api/v1/rates/exchange");
  const exchangeRates = await response.json();

  exchangeRates.data.map((currency: CurrencyApiResponse) => {
    tmpExchangeData[currency.code] = currency.rate;
  });

  return {
    props: { ...tmpExchangeData },
  };
}
