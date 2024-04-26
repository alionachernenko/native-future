import styles from "./styles/Main.module.css";
import { useSelector } from "react-redux";

import waving_hand from "../../assets/emojis/waving_hand-24.png";
import star from "../../assets/emojis/star-24.png";
import { ProgressBar } from "../../features/onboarding/components/progressBar";

import Article1 from "../../assets/images/Article-1.png";
import { Link } from "react-router-dom";

export const Main = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles.container}>
      <div className={styles.name_container}>
        <p className={styles.name}>Hello, {user.name}</p>
        <img
          src={waving_hand}
          alt="Рука, яка махає з привітанням"
          width={24}
          height={24}
        />
      </div>
      <div className={styles.info_container}>
        <img src={user.avatar} width={102} height={102} alt="Твій аватар" />
        <div>
          <div className={styles.stars_container}>
            <img src={star} width={24} height={24}></img>
            <p>0</p>
          </div>
          <button className={styles.gift_button}>Обрати нагороду</button>
        </div>
      </div>
      <div className={styles.level_container}>
        <p className={styles.level}>Ти на 1 рівні</p>
        <div className={styles.level_progress_container}>
          <div className={styles.level_progress_inner}></div>
        </div>
      </div>
      <div className={styles.streak_container}>
        <p className={styles.streak_title}>Днів безперервного навчання</p>
        <div className={styles.streak_days}>
          {Array.from({ length: 5 }).map((el, index) => (
            <div
              className={
                index === 0 ? styles.streak_day_passed : styles.streak_day
              }
            >
              <p>{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.articles_header}>
        <p>Нові статті для тебе</p>
        <button>Більше статтей</button>
      </div>
      <Link className={styles.article}>
        <img
          src={Article1}
          alt="Депутати стоять із прапорцями України"
          width={138}
          height={138}
        />
        <div>
          <h4 className={styles.article_title}>
            Results 20.04: Decision of the Congress
          </h4>
          <p className={styles.article_preview_text}>
            House of the US Congress - adopted a draft law on the provision of
            almost $61 billion in aid to Ukraine.
          </p>
        </div>
      </Link>
    </div>
  );
};