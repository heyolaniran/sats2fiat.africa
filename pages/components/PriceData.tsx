import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useState } from "react";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const bootedAt = Date.now();

export default function PriceData(props: any) {
  const [showPriceData, setShowPriceData] = useState<boolean>(false);

  const revealPriceData = () => {
    setShowPriceData(true);
  };

  const formatPrice = (price: any) => {
    let newArr = price.supportedFiatShitcoins.map((shitCoin: any) => {
      return (
        "BTC/" +
        shitCoin.code.toUpperCase() +
        ": " +
        price.priceData[shitCoin.code].toLocaleString() +
        " ·"
      );
    });

    return newArr.join(" ");
  };

  return (
    <div>
      <div>
        Prices courtesy of the almighty{" "}
        <a href="https://paxful.com/">paxful.com</a>
      </div>
      <div>(last fetched {timeAgo.format(bootedAt)})</div>
      <div>
        {!showPriceData && (
          <button onClick={revealPriceData}>Show Raw Price Data</button>
        )}
        {showPriceData && <div>{formatPrice(props)}</div>}
      </div>
    </div>
  );
}
