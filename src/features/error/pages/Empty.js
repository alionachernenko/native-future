import styles from "./styles/Empty.module.css";
import skovoroda_cloud from "../../../assets/images/skovoroda_cloud.png";
import arrow_left from "../../../assets/icons/arrow_left-40.svg";

import { useLocation, useNavigate } from "react-router-dom";
export const Empty = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <button
          onClick={() => navigate(location.state?.from || "/home/main")}
          style={{
            position: "absolute",
            top: 14,
            backgroundColor: "transparent",
            border: "none",
            padding: 0,
            left: 16,
          }}
        >
          <img src={arrow_left} width={40} height={40} alt="Стрілка вліво" />
        </button>
        <div
          style={{
            maxWidth: 312,
            alignSelf: "center",
          }}
        >
          <p
            style={{
              fontSize: 26,
              lineHeight: "34px",
              fontFamily: "e-Ukraine-Regular",
              marginBottom: 20,
            }}
          >
            Упс!
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: "24px",
              fontFamily: "e-Ukraine-Light",
            }}
          >
            Команда{" "}
            <span style={{ fontFamily: "e-Ukraine-Regular" }}>
              Native Future
            </span>{" "}
            поспала на пару годин довше, тому цього розділу ще немає
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
          }}
        >
          <img
            src={skovoroda_cloud}
            alt="Зображення Григорія Сковороди, намальоване у 3D формати"
            width={375}
            height={395}
          />
          <p
            style={{
              fontSize: 14,
              lineHeight: "18px",
              fontFamily: "e-Ukraine-Light",
              position: "absolute",
              top: 55,
              width: 194,
              left: 18,
            }}
          >
            Не за обличчя судіть, а за серце.
          </p>
        </div>
      </div>
    </div>
  );
};
