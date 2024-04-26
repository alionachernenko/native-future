import styles from "./styles/Article.module.css";
import cover from "../../../assets/images/article_cover_big.png";
import arrow_left from "../../../assets/icons/arrow_left-40.svg";
import { useNavigate, useLocation } from "react-router-dom";

export const Article = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.container}>
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          padding: "14px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          backgroundColor: "#e7eef3",
          maxWidth: 358,
        }}
      >
        <button
          onClick={() => navigate(location?.state?.from || "/home/main")}
          style={{
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
          }}
        >
          <img
            src={arrow_left}
            width={40}
            height={40}
            alt="Стрілка вліво, кнопка назад"
          />
        </button>
        <button className={styles.more_button}>Більше статей</button>
      </header>
      <img
        src={cover}
        width={358}
        height={170}
        alt="Депутати аплодують стоячи з прапорцями України в руках"
        style={{
          marginBottom: 12,
        }}
      />
      <p
        style={{
          fontSize: 14,
          lineHeight: "18px",
          fontFamily: "e-Ukraine-Regular",
          marginBottom: 20,
        }}
      >
        26.04.24
      </p>
      <h1
        style={{
          fontSize: 20,
          lineHeight: "24px",
          fontFamily: "e-Ukraine-Regular",
          fontWeight: 500,
          marginBottom: 24,
        }}
      >
        "How the USA is Supporting Ukraine and the Challenges It Faces"
      </h1>
      <p
        style={{
          fontSize: 16,
          lineHeight: "24px",
          fontFamily: "e-Ukraine-Light",
          marginBottom: 32,
        }}
      >
        Recently, the USA agreed to help Ukraine with defense. It's expected by
        the end of summer if President Joe Biden says yes. This help will
        protect Ukraine from Russia. <br />
        <br />
        It will let Ukraine keep areas that Russia took. After Congress said
        okay, Biden will sign and give Ukraine what it needs. This could be guns
        and other stuff. Also, Ukraine might get help from American stuff in
        Poland and Germany. <br />
        <br />
        Opposition lawmaker Vadym Ivchenko mentioned potential delays in aid
        delivery to Ukraine due to logistical challenges and bureaucracy.
        Details remain classified, but Ukrainian forces urgently need artillery
        shells and anti-missile rockets.
        <br />
        <br />
        Various types of shells and aviation bombs are urgently needed on the
        front line to counter Russian preparations for a counterattack. While
        experts believe Russia and Ukraine won't mount a major offensive until
        next year, Russia continues attacks along various points of the front.
        <br />
        <br />
        Ivchenko highlighted that Ukraine's current focus is to maintain
        positions until new aid arrives, allowing them to concentrate on
        regaining recently lost territory in the Donetsk region.
      </p>
    </div>
  );
};

const Test = () => {
    const questions = [
        {}
    ]
}