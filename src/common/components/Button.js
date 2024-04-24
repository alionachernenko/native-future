import { colors } from "../colors/colors";
import styles from "./Button.module.css";

import google from "../../assets/icons/google-44.svg";
import apple from "../../assets/icons/apple-44.svg";
import facebook from "../../assets/icons/facebok-44.svg";

export const Button = ({
  text = "Далі",
  backgroundColor = colors.base.black,
  color = colors.base.white,
  borderColor = colors.base.black,
  type = "button",
  variant = "standard",
  disabled = false,
  authWith = "google",
  onClick = () => {},
  id = "",
}) => {
  const renderButton = () => {
    switch (variant) {
      case "standard":
        return (
          <StandardButton
            type={type}
            text={text}
            disabled={disabled}
            onClick={onClick}
            id={id}
          />
        );
      case "accent":
        return (
          <AccentButton
            type={type}
            text={text}
            disabled={disabled}
            onClick={onClick}
            id={id}
          />
        );
      case "gradient":
        return (
          <GradientButton
            type={type}
            text={text}
            disabled={disabled}
            onClick={onClick}
            id={id}
          />
        );
      case "auth":
        return (
          <AuthButton
            type={type}
            text={text}
            disabled={disabled}
            authWith={authWith}
            onClick={onClick}
            id={id}
          />
        );
      default:
        return (
          <StandardButton
            type={type}
            text={text}
            disabled={disabled}
            onClick={onClick}
          />
        );
    }
  };
  return <>{renderButton()}</>;
};

const StandardButton = ({ text, type, disabled, onClick, id }) => {
  return (
    <button
      id={id}
      onClick={(e) => onClick(e)}
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

const AuthButton = ({ type, disabled, authWith, onClick }) => {
  const renderIcon = () => {
    switch (authWith) {
      case "google":
        return google;
      case "apple":
        return apple;
      case "facebook":
        return facebook;
      default:
        return google;
    }
  };

  return (
    <div className={styles.button_auth_background}>
      <button
        disabled={disabled}
        type={type}
        className={styles.button_auth}
        onClick={(e) => onClick(e)}
      >
        <img
          alt={authWith === "google" ? "Гугл логотип" : "Епл логотип"}
          src={renderIcon()}
        />
      </button>
    </div>
  );
};
