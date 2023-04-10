import React, { useState } from "react";

import styles from "./ToggleButton.module.css";

interface ToggleProps {
  id: string;
  initialState: boolean;
  label: string;
  toggleHandler: ({}) => void;
}

export default function ToggleButton(props: ToggleProps) {
  const [isToggled, setIsToggled] = useState<boolean>(props.initialState);

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
