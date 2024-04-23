import Option from "../components/option";
import styles from './styles/onboarding.module.css';

function Onboarding() {
  return (
    <div className={styles.onboarding}>
      <Option desctiption='Я початківець' />
      <Option desctiption='Знаю деякі слова та фрази' />
      <Option desctiption='Можу підтримати просту розмову' />
      <Option desctiption='Дивлюся фільми та читаю книжки в оригіналі' />
    </div>
  );
}

export default Onboarding;