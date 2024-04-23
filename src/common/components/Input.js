import { useState } from "react";

import { colors } from "../colors/colors";
import styles from "./Input.module.css";

import visibility_on from "../../assets/icons/visibility_on-40.svg";
import visibility_off from "../../assets/icons/visibility_off-40.svg";

export const Input = ({
  value = "",
  variant = "standard",
  type = "text",
  placeholder = "",
  onChange = () => {},
  showVisibilityButton,
}) => {
  const renderInput = () => {
    switch (variant) {
      case "standard":
        return (
          <StandardInput
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            showVisibilityButton={showVisibilityButton}
          />
        );
      case "gradient":
        return (
          <GradientInput
            value={value}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
          />
        );
      default:
        return <StandardInput />;
    }
  };
  return <>{renderInput()}</>;
};

const StandardInput = ({
  value,
  placeholder,
  onChange,
  showVisibilityButton = false,
}) => {
  const backgroundColor =
    value.length > 0 ? colors.accent.blueDarker_20 : colors.base.white;

  const [type, setType] = useState("text");

  const handleVisibilityButtonClick = () => {
    if (type === "text") {
      setType("password");
    } else {
      setType("text");
    }
  };
  return (
    <div className={styles.container}>
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        className={styles.input_standard}
        onChange={(e) => onChange(e)}
        style={{
          backgroundColor,
          paddingRight: showVisibilityButton ? 70 : 20,
        }}
      ></input>

      {showVisibilityButton ? (
        <button
          style={{ marginTop: type === "password" ? 3 : 0 }}
          className={styles.visibility_button}
          onClick={() => handleVisibilityButtonClick()}
        >
          <img src={type === "password" ? visibility_off : visibility_on} />
        </button>
      ) : null}
    </div>
  );
};

const GradientInput = () => {
  return <input />;
};
