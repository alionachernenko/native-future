import { useState } from "react";
import styles from "./styles/option.module.css";
import checkIcon from "../../../assets/icons/Check.svg";

function Option({ desctiption, onClick, isChecked }) {
  const handleCheckboxChange = () => {
    onClick();
  };

  return (
    <div
      className={
        isChecked ? `${styles.option} ${styles.checked}` : styles.option
      }
    >
      <label className={styles.optionCheckBox}>
        <span className={styles.boxLabel}>{desctiption}</span>
        {isChecked ? (
          <span className={styles.boxIconChecked}>
            <img alt="" src={checkIcon} />
          </span>
        ) : null}
        <input
          className={
            isChecked ? `${styles.option} ${styles.checked}` : styles.option
          }
          type="checkbox"
          name={desctiption}
          onChange={handleCheckboxChange}
        ></input>
      </label>
    </div>
  );
}

export default Option;
