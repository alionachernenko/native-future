import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { authenticationService } from "../authenticationService";
import { Input } from "../../../common/components/Input";
import { Button } from "../../../common/components/Button";

import styles from "./styles/Login.module.css";
import diia_logo from "../../../assets/icons/diia_logo-32.svg";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordInputType, setPasswordInputType] = useState("password");

  const navigate = useNavigate();

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

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();

    try {
      const user = await authenticationService.signInUserWithEMailAndPassword(
        email,
        password
      );

      localStorage.setItem("id_token", user.getIdToken());
      localStorage.setItem("uid", user.uid);

      navigate("/home");

      console.log({ user });
    } catch (error) {
      console.log("Error login with email ", error);
    }
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();

    try {
      const user = await authenticationService.signInWithGoogle();

      localStorage.setItem("id_token", user.getIdToken());
      localStorage.setItem("uid", user.uid);

      navigate("/home");

      console.log({ user });
    } catch (error) {
      console.log("Error login with google ", e);
    }
  };

  const handleLoginwWithFacebook = async (e) => {
    e.preventDefault();

    try {
      const user = await authenticationService.signInWithFacebook();

      localStorage.setItem("id_token", user.getIdToken());
      localStorage.setItem("uid", user.uid);

      navigate("/home");

      console.log({ user });
    } catch (error) {
      console.log("Error login with facebook ", error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Привіт! Вітаю у Діє.Слово!</h1>
        <p className={styles.subtitle}>Увійдіть, щоб почати навчання</p>
        <form className={styles.form}>
          <div className={styles.inputs_container}>
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
              id={"sign-in-button"}
              text="Увійти"
              type="submit"
              onClick={(e) => handleLoginWithEmail(e)}
            />
            <button
              type="button"
              className={`${styles.button} ${styles.button_gradient}`}
            >
              Увійти через
              <img src={diia_logo} alt="Дія" width={32} height={32} />
            </button>
          </div>
          <p className={styles.login_with_provider}>Або увійти через</p>
          <div className={styles.alt_buttons_container}>
            <Button
              type="button"
              variant="auth"
              authWith="google"
              onClick={(e) => handleLoginWithGoogle(e)}
            />
            <Button
              type="button"
              variant="auth"
              authWith="facebook"
              onClick={(e) => handleLoginwWithFacebook(e)}
            />
          </div>
        </form>
        <div id="recaptcha-container"></div>
        <div className={styles.footer}>
          <span className={styles.footer_text}>Ще немає акаунту?</span>
          <Link to={"/signup"} className={styles.signup_link}>
            Зареєструватися
          </Link>
        </div>
      </div>
    </div>
  );
};
