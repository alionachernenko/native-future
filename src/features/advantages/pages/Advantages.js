import styles from "./styles/Advantages.module.css";
import flashcards from "../../../assets/images/adv-flashcards.png";
import ai from "../../../assets/images/adv-ai.png";
import articles from "../../../assets/images/adv-articles.png";
import bonuses from "../../../assets/images/adv-bonuses.png";
import partners from "../../../assets/images/adv-partners.png";
import diia from "../../../assets/images/adv-diia.png";
import { useEffect, useState } from "react";
import { Button } from "../../../common/components/Button";

import { useNavigate } from "react-router-dom";

export const Advantages = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (uid) {
      navigate("/home");
    }
  }, []);

  const handleNextPress = () => {
    if (step === 5) {
      navigate("signup");
      return;
    }

    setStep((prev) => prev + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Flashcards />;
      case 1:
        return <Ai />;
      case 2:
        return <Articles />;
      case 3:
        return <Bonuses />;
      case 4:
        return <Partners />;
      case 5:
        return <Diia />;
      default:
        return <Flashcards />;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container} style={{ paddingBottom: 100 }}>
        <p className={styles.progress}>{`${step + 1}/6`}</p>
        {renderStep()}
      </div>
      <div className={styles.button_container}>
        <Button
          onClick={handleNextPress}
          text={step === 5 ? "Зареєструватися" : "Далі"}
        />
      </div>
    </div>
  );
};

const Flashcards = () => {
  return <Step data={advantages[0]} />;
};

const Ai = () => {
  return <Step data={advantages[1]} />;
};

const Articles = () => {
  return <Step data={advantages[2]} />;
};

const Bonuses = () => {
  return <Step data={advantages[3]} />;
};

const Partners = () => {
  return <Step data={advantages[4]} />;
};

const Diia = () => {
  return <Step data={advantages[5]} />;
};

const Step = ({ data }) => {
  return (
    <>
      <img
        src={data.image}
        className={styles.image}
        // width={data.imageWidth}
        height={300}
      />
      <div className={styles.info_container}>
        <p className={styles.title}>{data.title}</p>
        <p className={styles.description}>{data.description}</p>
      </div>
    </>
  );
};

const advantages = [
  {
    id: "flashcards",
    title: "Флешкартки",
    description:
      "допоможуть тобі концентруватися на конкретних словах і фразах, зроблять процес вивчення більш інтерактивним та гнучким",
    image: flashcards,
    imageWidth: 300,
  },
  {
    id: "ai",
    title: "Спілкування англійською з помічником",
    description:
      "Практикуй мову в зручний час, без страху бути оціненим. Пан Сковорода завжди готовий тобі допомогти та надати корисні поради",
    image: ai,
    imageWidth: 302,
  },
  {
    id: "articles",
    title: "Статті про Україну англійською",
    description:
      "Читай англійською в своє задоволення, а не нудні теми про екологію",
    image: articles,
    imageWidth: 304,
  },
  {
    id: "bonuses",
    title: "Накопичуй бали і отримай знижки",
    description:
      "Вивчай нові слова і теми, спілкуйся з чат-ботом та отримай бали, які можна обміняти на знижки від партнерів",
    image: bonuses,
    imageWidth: 276,
  },
  {
    id: "partners",
    title: "Знижки від парнерів",
    description:
      "допоможуть тобі концентруватися на конкретних словах і фразах, зроблять процес вивчення більш інтерактивним та гнучким",
    image: partners,
    imageWidth: 328,
  },
  {
    id: "diia",
    title: "Сертифікат в Дії",
    description: "Отримай офіційне підтвердження володіння мовою",
    image: diia,
    imageWidth: 348,
  },
];
