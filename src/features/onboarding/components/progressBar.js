import styles from "./styles/progressBar.module.css";

export const ProgressBar = ({ step }) => {
  const innerBarWidth = (100 / 7) * step;

  return (
    <div className={styles.barOuter}>
      <div
        className={styles.barInner}
        style={{ width: `${innerBarWidth}%` }}
      ></div>
    </div>
  );
};
