import { useState } from "react";
import styles from "./styles/Settings.module.css";
import { colors } from "../../../common/colors/colors";
import { useNavigate, useLocation } from "react-router-dom";

import eye from "../../../assets/icons/visibility_off-40.svg";
import arrow_left from "../../../assets/icons/arrow_left-40.svg";

export const Settings = () => {
  const [settings, setSettings] = useState({
    dyslexia_mode: false,
    listening_exercises: true,
    black_white_mode: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleChangeDyslexiaMode = () => {
    setSettings((prev) => ({
      ...prev,
      dyslexia_mode: !prev.dyslexia_mode,
    }));
  };

  const handleChangeListeningExercises = () => {
    setSettings((prev) => ({
      ...prev,
      listening_exercises: !prev.listening_exercises,
    }));
  };

  const handleChangeBlackWhiteMode = () => {
    setSettings((prev) => ({
      ...prev,
      black_white_mode: !prev.black_white_mode,
    }));
  };

  const otherSettings = [
    {
      title: "Профіль",
    },
    {
      title: "Навчання",
    },
    {
      title: "Дані",
    },
    {
      title: "Інтереси",
    },
    { title: "Служба підтримки" },
  ];
  return (
    <div
      className={styles.page}
      style={settings.black_white_mode ? { filter: "grayscale(100%)" } : null}
    >
      <div className={styles.container}>
        <button
          onClick={() => navigate(location.state.from)}
          style={{
            position: "absolute",
            top: 14,
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
        <h2 className={styles.title}>Налаштуй Діє.Слово під себе</h2>
        <div className={styles.settings_container}>
          {settings.black_white_mode ? (
            <AccessibilitySettings
              handleChangeBlackWhiteMode={handleChangeBlackWhiteMode}
            />
          ) : (
            <button
              className={styles.black_white_mode_button}
              onClick={handleChangeBlackWhiteMode}
            >
              Налаштування доступності
              <img src={eye} alt={"Закреслене око"} width={40} height={40} />
            </button>
          )}
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "e-Ukraine-Light",
              fontSize: 18,
              lineHeight: "24px",
              paddingTop: 12,
              paddingBottom: 12,
              paddingRight: 12,
              paddingLeft: 0,
            }}
          >
            Режим дислексії
            <div
              className={styles.setting_switch_label}
              style={{
                backgroundColor: settings.dyslexia_mode
                  ? settings.black_white_mode
                    ? colors.base.black
                    : "#05B254"
                  : colors.base.grey_40,
              }}
            >
              <div
                className={styles.setting_switch_label_controller}
                style={{ left: !settings.dyslexia_mode ? 2 : 32 }}
              ></div>
              <input
                type="checkbox"
                checked={settings.dyslexia_mode}
                onChange={handleChangeDyslexiaMode}
              />
            </div>
          </label>
          <label
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "e-Ukraine-Light",
              fontSize: 18,
              lineHeight: "24px",
              paddingTop: 12,
              paddingBottom: 12,
              paddingRight: 12,
              paddingLeft: 0,
            }}
          >
            Вправи на аудіювання
            <div
              className={styles.setting_switch_label}
              style={{
                backgroundColor: settings.listening_exercises
                  ? settings.black_white_mode
                    ? colors.base.black
                    : "#05B254"
                  : colors.base.grey_40,
              }}
            >
              <div
                className={styles.setting_switch_label_controller}
                style={{ left: !settings.listening_exercises ? 2 : 32 }}
              ></div>
              <input
                type="checkbox"
                checked={settings.listening_exercises}
                onChange={handleChangeListeningExercises}
              />
            </div>
          </label>
        </div>
        <h2 className={styles.other_settings_title}>Розширені налаштування</h2>
        <div className={styles.other_settings_buttons}>
          {otherSettings.map((setting) => (
            <div
              className={styles.other_settings_button_background}
              style={
                settings.black_white_mode
                  ? { background: "none", backgroundColor: "black" }
                  : {}
              }
            >
              <button className={styles.other_settings_button}>
                {setting.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccessibilitySettings = ({ handleChangeBlackWhiteMode }) => {
  return (
    <div className={styles.accessibility_settings}>
      <button className={styles.font_size_button}>
        <span>A</span>
      </button>
      <button className={styles.font_size_button}>
        <span>A</span>
      </button>
      <button className={styles.font_size_button}>
        <span>A</span>
      </button>
      <button
        className={styles.turn_accessibility_off_button}
        onClick={handleChangeBlackWhiteMode}
      >
        <img src={eye} alt={"Закреслене око"} width={40} height={40} />
        Звичайна версія сайту
      </button>
    </div>
  );
};
