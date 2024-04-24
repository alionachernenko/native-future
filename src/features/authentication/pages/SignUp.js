import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../../common/components/Input";
import { Button } from "../../../common/components/Button";

import styles from "./styles/SignUp.module.css";
import diia_logo from "../../../assets/icons/diia_logo-32.svg";
import { authenticationService } from "../authenticationService";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordInputType, setPasswordInputType] = useState("password");

  const navigate = useNavigate();

  const handleEnterName = (e) => {
    setName(e.target.value);
  };

  const handleEnterEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleEnterPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleVisibilityButtonClick = () => {
    if (passwordInputType === "text") {
      setPasswordInputType("password");
    } else {
      setPasswordInputType("text");
    }
  };

  const handleSignUpWithEmail = async (e) => {
    e.preventDefault();

    try {
      const user = await authenticationService.signUpUserWithEmailAndPassword(
        name,
        email,
        password
      );

      navigate("/");

      console.log({ user });
    } catch (e) {
      console.log("error", e);
    }
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const user = await authenticationService.signInWithGoogle();
      navigate("/");

      console.log({ user });
    } catch (error) {
      console.log("Error login with google ", e);
    }
  };

  const handleLoginwWithFacebook = async (e) => {
    e.preventDefault();

    try {
      const user = await authenticationService.signInWithFacebook();
      navigate("/");

      console.log({ user });
    } catch (error) {
      console.log("Error login with facebook ", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Привіт! Вітаю у Діє.Слово!</h1>
        <p className={styles.subtitle}>Створи акаунт щоб почати навчання</p>
        <form className={styles.form}>
          <div className={styles.inputs_container}>
            <Input value={name} onChange={handleEnterName} placeholder="Імʼя" />
            <Input
              value={email}
              onChange={handleEnterEmail}
              placeholder="Емейл"
              type="email"
            />
            <Input
              value={password}
              type={passwordInputType}
              onChange={handleEnterPassword}
              placeholder="Введіть пароль"
              showVisibilityButton={true}
              onVisibilityButtonClick={handleVisibilityButtonClick}
            />
          </div>

          <div className={styles.buttons_container}>
            <Button
              text="Зареєструватися"
              type="submit"
              onClick={(e) => handleSignUpWithEmail(e)}
            />
            <button
              type="button"
              className={`${styles.button} ${styles.button_gradient}`}
            >
              Зареєструватися з
              <img src={diia_logo} alt="Дія" />
            </button>
          </div>
          <p className={styles.login_with_provider}>Зареєструватись через</p>
          <div className={styles.alt_buttons_container}>
            <Button
              text="Увійти"
              type="button"
              variant="auth"
              authWith="google"
              onClick={(e) => handleLoginWithGoogle(e)}
            />
            <Button
              text="Увійти"
              type="button"
              variant="auth"
              authWith="facebook"
              onClick={(e) => handleLoginwWithFacebook(e)}
            />
          </div>
        </form>
        <div className={styles.footer}>
          <span className={styles.footer_text}>Уже є акаунт?</span>
          <Link to={"/login"} className={styles.signup_link}>
            Увійти
          </Link>
        </div>
      </div>
    </div>
  );
};
