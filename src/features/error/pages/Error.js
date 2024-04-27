import robot from "../../../assets/images/robot.png";
import { Button } from "../../../common/components/Button";
import styles from "./styles/Error.module.css";

import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img
          src={robot}
          alt="Сумний робот блакитного кольору намальований у 3D стилі"
          width={206}
          height={296}
          style={{
            marginRight: 40,
          }}
        />
        <p
          style={{
            fontSize: 86,
            fontFamily: "e-Ukraine-Regular",
            marginBottom: 8,
          }}
        >
          404
        </p>
        <p
          style={{
            fontSize: 26,
            lineHeight: "34px",
            fontFamily: "e-Ukraine-Regular",
            marginBottom: 8,
          }}
        >
          Ой-ой
        </p>
        <p
          style={{
            fontSize: 18,
            lineHeight: "24px",
            fontFamily: "e-Ukraine-Regular",
          }}
        >
          Цієї сторінки не існує
        </p>
        <div
          style={{
            position: "fixed",
            bottom: 16,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            text="Перейти на головну"
            onClick={() => navigate("/home/main")}
          />
        </div>
      </div>
    </div>
  );
};
