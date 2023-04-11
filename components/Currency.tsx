import styles from "./Currency.module.css";
import CurrencyInput from "react-currency-input-field";

export default function Currency(props: any) {
  let isBTCInput = false;
  if (props.id == "sats" || props.id == "btc") {
    isBTCInput = true;
  }

  let value = props.amount;

  if (props.id == "btc" && value && Number.isFinite(value)) {
    value = value.toFixed(8);
  }

  return (
    <div className={styles.currencyinput}>
      {props.enabled && (
        <CurrencyInput
          id={props.id}
          name={props.id}
          placeholder="0"
          prefix={props.prefix}
          value={value}
          allowNegativeValue={false}
          allowDecimals={props.allowDecimals}
          decimalsLimit={props.decimalsLimit}
          onValueChange={(value, name) => props.onValueChanged(name, value)}
        ></CurrencyInput>
      )}
      <br />
      <label htmlFor={props.id}>
        {props.flagIcon} {props.name}
      </label>
    </div>
  );
}
