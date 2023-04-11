import React, { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ToggleButton from "./ToggleButton";
import styles from "./SettingsMenu.module.css";
import { ToggleHandler, FiatShitCoin } from "../../types/types";

interface SettingsProps {
  fiatShitcoins: FiatShitCoin[];
  toggleHandler: ToggleHandler;
  state: { [key: string]: boolean };
}

export default function SettingsMenu(props: SettingsProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.settingsMenu}>
      <button
        className={`${styles.settings} ${isOpen ? styles.isOpen : ""}`}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`${styles.nav} ${isOpen ? styles.openNav : ""}`}>
        <Link
          href="https://bitcoinekasi.com/"
          target={"_blank"}
          rel="noreferrer"
        >
          <Image
            src="/images/bitcoinekasi.png"
            width={100}
            height={100}
            alt={"Follow the 🐇"}
          />
        </Link>
        <div className={styles.toggleButtons}>
          {props.fiatShitcoins.map((shitcoin: FiatShitCoin) => {
            return (
              <ToggleButton
                key={shitcoin.id}
                id={shitcoin.id}
                label={shitcoin.name}
                toggleHandler={props.toggleHandler}
                initialState={props.state[shitcoin.id + "Enabled"]}
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
}
