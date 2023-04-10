import React, { useState } from "react";

import styles from "./ToggleButton.module.css";

export default function ToggleButton(props: any) {
  const [isToggled, setIsToggled] = useState(props.initialState);

  const toggle = () => {
    setIsToggled(!isToggled);
    let key = props.id + "Enabled";
    props.toggleHandler({ id: key });
  };

  return (
    <div className={styles.toggleWrapper}>
      <label className={styles.toggleLabel}>{props.label}</label>
      <button
        className={`${styles.toggleButton} ${isToggled ? styles.toggled : ""}`}
        onClick={toggle}
      >
        <span className={styles.toggleSwitch} />
      </button>
    </div>
  );
}
