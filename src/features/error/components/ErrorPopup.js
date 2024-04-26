import error from "../../../assets/icons/error.svg";
import { Button } from "../../../common/components/Button";
import styles from "./styles/ErrorPopup.module.css";
export const ErrorPopup = () => {
  return (
    <div className={styles.container}>
      <div
        style={{
          width: 354,
          paddingTop: 44,
          paddingBottom: 24,
          paddingLeft: 24,
          paddingRight: 24,
          borderRadius: 24,
          backgroundColor: "#E7EEF3",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <img src={error} alt="Помилка" />
          <p
            style={{
              fontSize: 14,
              lineHeight: "18px",
              fontFamily: "e-Ukraine-Regular",
            }}
          >
            Упс, щось пішло не так. Онови сторінку і перевір Інтернет зʼєднання
          </p>
        </div>
        <Button
          text="Оновити сторінку"
          onClick={() => window.location.reload()}
        />
      </div>
    </div>
  );
};
