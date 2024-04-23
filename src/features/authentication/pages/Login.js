import styles from "./styles/Login.module.css";

export const Login = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Привіт! Вітаю у Діє.Слово!</h1>
        <p className={styles.subtitle}>Увійдіть, щоб почати навчання</p>
        <form className={styles.form}>
          <input
            className={styles.input}
            placeholder="Email або номер телефону"
          />
          <input className={styles.input} placeholder="Введіть пароль" />
          <button type="submit" className={styles.login_button}>
            Увійти
          </button>
        </form>
      </div>
    </div>
  );
};
