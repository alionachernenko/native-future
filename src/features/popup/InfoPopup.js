import { Button } from "../../common/components/Button";
import styles from "./InfoPopup.module.css";

export const InfoPopup = ({ text, onClose }) => {
  return (
    <div className={styles.container}>
      <div
        style={{
          width: 358,
          paddingTop: 44,
          padding: "32px 24px",
          backgroundColor: "#E7EEF3",
          borderRadius: 24
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
          <p
            style={{
              fontSize: 16,
              lineHeight: "24px",
              fontFamily: "e-Ukraine-Light",
            }}
          >
            {text}
          </p>
        </div>
        <Button text="Продовжити" onClick={onClose} />
      </div>
    </div>
  );
};
