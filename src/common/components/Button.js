import { colors } from "../colors/colors";
import styles from "./Button.module.css";

import google from "../../assets/icons/google-44.svg";
import apple from "../../assets/icons/apple-44.svg";

export const Button = ({
  text = "Далі",
  backgroundColor = colors.base.black,
  color = colors.base.white,
  borderColor = colors.base.black,
  type = "button",
  variant = "standard",
  disabled = false,
  authWith = "google",
}) => {
  const renderButton = () => {
    switch (variant) {
      case "standard":
        return <StandardButton type={type} text={text} disabled={disabled} />;
      case "accent":
        return <AccentButton type={type} text={text} disabled={disabled} />;
      case "gradient":
        return <GradientButton type={type} text={text} disabled={disabled} />;
      case "auth":
        return (
          <AuthButton
            type={type}
            text={text}
            disabled={disabled}
            authWith={authWith}
          />
        );
      default:
        return <StandardButton type={type} text={text} disabled={disabled} />;
    }
  };
  return <>{renderButton()}</>;
};

const StandardButton = ({ text, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles.button} ${styles.button_standard}`}
    >
      {text}
    </button>
  );
};

const AccentButton = ({ text, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles.button} ${styles.button_accent}`}
    >
      {text}
    </button>
  );
};

const GradientButton = ({ text, type, disabled }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${styles.button} ${styles.button_gradient}`}
    >
      {text}
    </button>
  );
};

const AuthButton = ({ type, disabled, authWith }) => {
  const renderIcon = () => {
    switch (authWith) {
      case "google":
        return google;
      case "apple":
        return apple;
      default:
        return google;
    }
  };

  return (
    <button disabled={disabled} type={type} className={styles.button_auth}>
      <img
        alt={authWith === "google" ? "Гугл логотип" : "Епл логотип"}
        src={renderIcon()}
      />
    </button>
  );
};
