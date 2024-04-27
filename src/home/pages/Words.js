import styles from "./styles/Words.module.css";
import family from "../../assets/topics/family.png";
import military from "../../assets/topics/military.png";
import { useSelector } from "react-redux";

import food from "../../assets/topics/food.png";
import nature from "../../assets/topics/weather.png";
import { Link } from "react-router-dom";
import { colors } from "../../common/colors/colors";

export const Words = () => {
  const filters = ["Загальні", "Тематичні", "Жестова мова"];

  const user = useSelector((state) => state.user.user);

  return (
    <div className={styles.container}>
      <button
        aria-label="Перейти до слів, завантажених мною"
        className={styles.my_words_btn}
      >
        Мої слова
      </button>
      <div className={styles.filters}>
        {filters.map((filter, index) => (
          <button
            aria-label={`Відобразити слова категорії ${filter}`}
            style={{
              padding: "12px 16px",
              fontSize: 14,
              lineHeight: "18px",
              fontFamily: "e-Ukraine-Light",
              whiteSpace: "nowrap",
              borderRadius: 100,
              border: index === 0 ? "1.5px solid #5B5AEC" : "none",
              opacity: index === 2 ? 0.4 : 1,
              backgroundColor: index === 2 ? "#DEDEFF" : "#BDBDFF",
              position: "relative",
              color: colors.base.black,
            }}
          >
            {filter}
            {index === 1 ? (
              <span
                style={{
                  position: "absolute",
                  backgroundColor: "#FFDB4D",
                  padding: "2px 8px",
                  borderRadius: 20,
                  top: -10,
                  right: -11.5,
                }}
              >
                Скоро
              </span>
            ) : null}
          </button>
        ))}
      </div>
      <section className={styles.words_in_progress_section}>
        <h2 className={styles.title} style={{ marginBottom: 12 }}>
          Слова в процесі
        </h2>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "nowrap",
            overflowX: "scroll",
            width: "100%",
          }}
        >
          <button
            aria-label="Відобразити нові слова"
            className={styles.words_in_progress_empty}
            style={{ color: colors.base.black }}
          >
            <p>Нові слова</p>
          </button>

          {user?.topicsInProgress
            ? user?.topicsInProgress.map((topic) => {
                return (
                  <Link
                    to={`/topic?name=${topic.title}`}
                    style={{
                      height: 130,
                      width: 130,

                      borderRadius: 22,
                      display: "flex",
                      alignItems: "end",
                      padding: 14,
                      color: colors.base.black,
                      backgroundColor: topic.color,
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontSize: 18,
                          lineHeight: "24px",
                          fontFamily: "e-Ukraine-Regular",
                          color: colors.base.black,
                          fontWeight: 500,
                          marginBottom: 8,
                        }}
                      >
                        {topic.title}
                      </h4>
                      <p
                        style={{
                          fontSize: 14,
                          lineHeight: "18px",
                          fontFamily: "e-Ukraine-Light",
                          color: colors.base.black,
                        }}
                      >
                        {topic.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              })
            : null}
        </div>
      </section>
      <section className={styles.all_words_section}>
        <h2 className={styles.title} style={{ marginBottom: 12 }}>
          Нові теми
        </h2>
        {topics.map((topic) => {
          return (
            <Link
              to={`/topic?name=${topic.id}`}
              style={{
                display: "flex",
                width: "100%",
                height: 110,
                backgroundColor: topic.color,
                borderRadius: 22,
                marginBottom: 12,
                overflow: "hidden",
                opacity: topic.id === "military" ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 12,
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <h4
                  style={{
                    fontSize: 18,
                    lineHeight: "24px",
                    fontFamily: "e-Ukraine-Regular",
                    color: colors.base.black,
                    fontWeight: 500,
                  }}
                >
                  {topic.title}
                </h4>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: "18px",
                    fontFamily: "e-Ukraine-Light",
                    color: colors.base.black,
                  }}
                >
                  {topic.subtitle}
                </p>
              </div>
              <img
                src={topic.cover}
                alt={topic.imageAlt}
                style={{
                  height: 110,
                  margin: 0,
                  padding: 0,
                  marginLeft: "auto",
                }}
              />
            </Link>
          );
        })}
      </section>
    </div>
  );
};

const topics = [
  {
    id: "military",
    title: "Military",
    subtitle: "Військова справа",
    cover: military,
    imageAlt: "Піксель патерн військової форми",
    color: "#DFF770",
  },
  {
    id: "family",
    title: "Family",
    subtitle: "Сім'я",
    cover: family,
    imageAlt: "Щаслива сімʼя",
    color: "#FFE270",
  },
  {
    id: "food",
    title: "Food",
    subtitle: "Їжа",
    cover: food,
    imageAlt: "Смачна їжа",
    color: "#EAABB8",
  },
  {
    id: "nature",
    title: "Nature",
    subtitle: "Природа",
    cover: nature,
    imageAlt: "Світанок",
    color: "#66B1FE",
  },
];
