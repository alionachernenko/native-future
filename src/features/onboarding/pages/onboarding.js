import Option from "../components/option";
import { ProgressBar } from "../components/progressBar";
import styles from "./styles/onboarding.module.css";
import { useState } from "react";

function Onboarding() {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstStep />;
      default:
        break;
    }
  };
  return (
    <div className={styles.onboardingWrapper}>
      <button onClick={() => setStep((prev) => prev - 1)}>назад</button>
      <ProgressBar />
      {renderStep()}
      <button className={styles.goNext} onClick={() => setStep((prev) => prev + 1)}>Далі</button>
    </div>
  );
}

const FirstStep = () => {
  return (
    <>
    <h1 className={styles.onboardingQuestion}>Як добре ти знаєш англійську?</h1>
    <div className={styles.onboarding}>
      <Option desctiption="Я початківець" />
      <Option desctiption="Знаю деякі слова та фрази" />
      <Option desctiption="Можу підтримати просту розмову" />
      <Option desctiption="Дивлюся фільми та читаю книжки в оригіналі" />
    </div>
    </>
  );
};
export default Onboarding;
