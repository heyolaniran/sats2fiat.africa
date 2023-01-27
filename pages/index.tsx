import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Currency from "./components/Currency";
import PriceData from "./components/PriceData";
import Head from "next/head";

import paxfulApi from "@paxful/sdk-js";

type UserSettings = {
  zarEnabled: boolean;
  ugxEnabled: boolean;
  ngnEnabled: boolean;
  nadEnabled: boolean;
  ghsEnabled: boolean;
  kesEnabled: boolean;
  mwkEnabled: boolean;
  zmwEnabled: boolean;
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
  zmwEnabled: false,
  usdEnabled: true,
};

const BTC_PER_SAT = 1 / 100000000;
const formatFiat = (value: number): number => {
  return Number.parseFloat(value.toFixed(4));
};

const USER_SETTINGS_KEY = "USER_SETTINGS";

export default function Home(props: {
  ZAR: number;
  USD: number;
  UGX: number;
  [key: string]: any;
}) {
  const [satsValue, setSatsValue] = useState<Number>(1);
  const [btcValue, setBTCValue] = useState<Number>(BTC_PER_SAT);
  const [zarValue, setZARValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.ZAR)
  ); //South African Rand
  const [ugxValue, setUGXValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.UGX)
  ); //Ugandan Shilling
  const [ngnValue, setNGNValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.NGN)
  ); //Nigerian Naira
  const [nadValue, setNADValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.NAD)
  ); //Namibian Dollar
  const [ghsValue, setGHSValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.GHS)
  ); //Namibian Dollar
  const [kesValue, setKESValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.KES)
  ); //Kenyan Shilling
  const [mwkValue, setMWKValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.MWK)
  ); //Kenyan Shilling
  const [zmwValue, setZMWValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.ZMW)
  ); //Kenyan Shilling
  const [usdValue, setUSDValue] = useState<Number>(
    formatFiat(BTC_PER_SAT * props.USD)
  );

  const [userSettings, setUserSettings] =
    useState<UserSettings>(initUserSettings);

  const supportedFiatShitcoins = [
    //TODO: combine id and code
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
      name: "Nigerian Naira",
      id: "ngn",
      code: "NGN",
      flagIcon: "🇳🇬",
      prefix: "₦ ",
      stateVar: ngnValue,
      updateFunc: setNGNValue,
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
      name: "Zambian Kwacha",
      id: "zmw",
      code: "ZMW",
      flagIcon: "🇰🇿",
      prefix: "ZK ",
      stateVar: zmwValue,
      updateFunc: setZMWValue,
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

  const toggleChangedHandler = (event: any) => {
    let settingIndex = event.target.id;
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
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width,user=scalable=no" />
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Convert satoshis to Bitcoin and fiat shitcoins like ZAR, UGX, KES, NGN"
        />
        <meta property="og:url" content="https://sats2fiat.africa" />
        <meta property="og:title" content="sats2fiat.africa" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="shyfire131" />
        <meta
          property="og:description"
          content="Convert satoshis to bitcoin and fiat currencies"
        />
        <meta
          property="og:image"
          content="https://sats2fiat.africa/images/card.png"
        />
        <meta
          property="twitter:image"
          content="https://sats2fiat.africa/images/card.png"
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
        {supportedFiatShitcoins.map((shitCoin) => (
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
        ))}
      </main>
      <footer className={styles.footer}>
        <PriceData
          priceData={props}
          supportedFiatShitcoins={supportedFiatShitcoins}
        />
        <div>
          <a href="https://github.com/shyfire-131/sats2fiat.africa">
            <span className={styles.logo}>
              <Image
                src="/github.svg"
                alt="GitHub Logo"
                width={72}
                height={20}
              />
            </span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const paxfulApiInstance = paxfulApi({
    clientId: process.env.PAXFUL_CLIENT_ID || "",
    clientSecret: process.env.PAXFUL_CLIENT_SECRET || "",
  });

  const currencies = await paxfulApiInstance.invoke("/paxful/v1/currency/list");
  let tmpExchangeData: any = {};
  currencies.data.currencies.map(
    (element: {
      code: string;
      name: string;
      name_localized: string;
      min_trade_amount_usd: string;
      rate: { usd: number; btc: number };
    }) => {
      tmpExchangeData[element.code] = element.rate.btc;
    }
  );
  return {
    props: { ...tmpExchangeData },
  };
}
