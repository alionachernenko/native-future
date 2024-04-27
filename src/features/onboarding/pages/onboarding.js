import Option from "../components/option";
import { ProgressBar } from "../components/progressBar";
import styles from "./styles/onboarding.module.css";
import { useEffect, useState } from "react";
import arrowLeft from "../../../assets/icons/arrow_left-40.svg";
import { useSelector, useDispatch } from "react-redux";
import info from "../../../assets/icons/info.svg";

import avatar1 from "../../../assets/avatars/Avatar-1.png";
import avatar2 from "../../../assets/avatars/Avatar-2.png";
import avatar3 from "../../../assets/avatars/Avatar-3.png";
import avatar4 from "../../../assets/avatars/Avatar-4.png";
import avatar5 from "../../../assets/avatars/Avatar-5.png";
import avatar6 from "../../../assets/avatars/Avatar-6.png";
import avatar7 from "../../../assets/avatars/Avatar-7.png";
import avatar8 from "../../../assets/avatars/Avatar-8.png";
import avatar9 from "../../../assets/avatars/Avatar-9.png";
import avatar10 from "../../../assets/avatars/Avatar.png";
import avatar11 from "../../../assets/avatars/Avatar-11.png";

import skovoroda from "../../../assets/images/adv-ai.png";

import { onboardingActions } from "../onboardingSlice";
import { colors } from "../../../common/colors/colors";
import { ReactComponent as Check } from "../../../assets/icons/Check.svg";
import { ReactComponent as SpeechCloud } from "../../../assets/clouds/speech_cloud_register.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticationService } from "../../authentication/authenticationService";
import { InfoPopup } from "../../popup/InfoPopup";

export const Onboarding = () => {
  const [step, setStep] = useState(1);

  const location = useLocation();

  const user = location?.state;
  const navigate = useNavigate();
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  useEffect(() => {
    const idToken = localStorage.getItem("id_token");
    const uid = localStorage.getItem("uid");

    if (!idToken || !user || !uid) {
      navigate("/login");
      return;
    }
  }, []);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectLevelStep setStep={setStep} />;
      case 2:
        return <SelectMotivationStep setStep={setStep} />;
      case 3:
        return <SelectTopicsStep setStep={setStep} />;
      case 4:
        return <SelectAvatarStep setStep={setStep} />;
      case 5:
        return <CreateUsernameStep setStep={setStep} name={user?.name} />;
      case 6:
        return (
          <SettingsStep
            setStep={setStep}
            userId={user?.userId}
            setShowInfoPopup={setShowInfoPopup}
          />
        );
      case 7:
        return <SuccessfullyRegistered setStep={setStep} />;
      default:
        break;
    }
  };

  return (
    <div
      className={styles.page}
      style={{
        background:
          step === 7 ? "linear-gradient(#CCE5FF, #EED4E8, #E7EEF3)" : "none",
      }}
    >
      {showInfoPopup ? (
        <InfoPopup
          onClose={() => setShowInfoPopup(false)}
          text={
            "Вимкнення вправ на аудіювання не впливатиме на ваш прогрес навчання."
          }
        />
      ) : null}

      <div className={styles.container}>
        {step > 1 && step !== 7 ? (
          <button
            className={styles.back_button}
            onClick={() => setStep((prev) => prev - 1)}
          >
            <img src={arrowLeft} />
          </button>
        ) : null}
        <ProgressBar step={step} />
        {renderStep()}
      </div>
    </div>
  );
};

const SelectLevelStep = ({ setStep }) => {
  const [selectedOptions, setSelectetOptions] = useState(
    useSelector((state) => state.onboarding.questions.level)
  );

  const dispatch = useDispatch();

  const options = [
    "Я початківець",
    "Знаю деякі слова та фрази",
    "Можу підтримати просту розмову",
    "Дивлюся фільми та читаю книжки в оригіналі",
  ];

  const handleNextClick = () => {
    setStep((prev) => prev + 1);

    dispatch(onboardingActions.setLevel(selectedOptions));
  };

  return (
    <>
      <h1 className={styles.title}>Як добре ти знаєш англійську?</h1>
      <div className={styles.options}>
        {options.map((option) => {
          const handleSelectOption = () => {
            if (selectedOptions.includes(option)) {
              setSelectetOptions((prev) => prev.filter((el) => el !== option));
            } else {
              setSelectetOptions((prev) => [...prev, option]);
            }
          };
          return (
            <Option
              desctiption={option}
              onClick={handleSelectOption}
              isChecked={selectedOptions.includes(option)}
            />
          );
        })}
      </div>
      <button className={styles.goNext} onClick={handleNextClick}>
        Далі
      </button>
    </>
  );
};

const SelectMotivationStep = ({ setStep }) => {
  const [selectedOptions, setSelectetOptions] = useState(
    useSelector((state) => state.onboarding.questions.motivation)
  );

  const dispatch = useDispatch();

  const options = [
    "Робота і навчання",
    "Спілкування під час подорожей",
    "Дивитись фільми та читати статті в оригіналі",
    "Не боятися спілкуватися з носіями мови",
    "Задля розваги",
    "Iнше",
  ];
  const handleNextClick = () => {
    setStep((prev) => prev + 1);

    dispatch(onboardingActions.setMotivation(selectedOptions));
  };

  return (
    <>
      <h1 className={styles.title}>Для чого ти хочеш вивчати англійську?</h1>
      <div className={styles.options}>
        {options.map((option) => {
          const handleSelectOption = () => {
            if (selectedOptions.includes(option)) {
              setSelectetOptions((prev) => prev.filter((el) => el !== option));
            } else {
              setSelectetOptions((prev) => [...prev, option]);
            }
          };
          return (
            <Option
              desctiption={option}
              onClick={handleSelectOption}
              isChecked={selectedOptions.includes(option)}
            />
          );
        })}
      </div>
      <button className={styles.goNext} onClick={handleNextClick}>
        Далі
      </button>
    </>
  );
};

const SelectTopicsStep = ({ setStep }) => {
  const [selectedOptions, setSelectetOptions] = useState(
    useSelector((state) => state.onboarding.questions.topics)
  );

  const dispatch = useDispatch();

  const options = [
    "Військова справа",
    "Спорт",
    "Кулінарія",
    "Подорожі",
    "Шопінг",
    "Школа і університет",
    "На співбесіді",
    "Бізнес і фінанси",
    "Почуття і емоції",
    "Характер",
  ];

  const handleNextClick = () => {
    setStep((prev) => prev + 1);

    dispatch(onboardingActions.setTopics(selectedOptions));
  };

  return (
    <>
      <h1 className={styles.title}>Які теми ти б хотів вивчати?</h1>
      <div className={styles.options}>
        {options.map((option) => {
          const handleSelectOption = () => {
            if (selectedOptions.includes(option)) {
              setSelectetOptions((prev) => prev.filter((el) => el !== option));
            } else {
              setSelectetOptions((prev) => [...prev, option]);
            }
          };
          return (
            <Option
              key={option}
              desctiption={option}
              onClick={handleSelectOption}
              isChecked={selectedOptions.includes(option)}
            />
          );
        })}
      </div>
      <button className={styles.goNext} onClick={handleNextClick}>
        Далі
      </button>
    </>
  );
};

const SelectAvatarStep = ({ setStep }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(
    useSelector((state) => state.onboarding.avatar)
  );

  const dispatch = useDispatch();

  const avatars = [
    {
      image: avatar11,
      alt: "Бджола",
      id: "Avatar-11",
    },
    {
      image: avatar1,
      alt: "Жінка з чорним середнім волоссям у фіолетовій рубашці",
      id: "Avatar-1",
    },
    {
      image: avatar2,
      alt: "Чоловік з коротким білим волоссям в сірій рубашці",
      id: "Avatar-2",
    },
    {
      image: avatar3,
      alt: "Жінка з каштановим середнім волоссям у блакитній рубашці",
      id: "Avatar-3",
    },
    {
      image: avatar4,
      alt: "Жінка з рудим середнім волоссям у блакитній рубашці",
      id: "Avatar-4",
    },
    {
      image: avatar5,
      alt: "Літній чоловік із сивим коротким волоссям в бежевій рубашці",
      id: "Avatar-5",
    },
    {
      image: avatar6,
      alt: "Чоловік в чорних сонцезахисних окулярах з чорним коротким волоссям в чорній кофті",
      id: "Avatar-6",
    },
    {
      image: avatar7,
      alt: "Чоловік з рудим коротким волоссям і рудою бородою в блакитній футболці",
      id: "Avatar-7",
    },
    {
      image: avatar8,
      alt: "Літня жінка з коротким сивим волоссям у фіолетовій рубашці",
      id: "Avatar-8",
    },
    {
      image: avatar9,
      alt: "Жінка у чорних сонцезахисних окулярах з чорним середнім волоссям в чорній кофті",
      id: "Avatar-9",
    },
    {
      image: avatar10,
      alt: "Чоловік з чорним коротким волоссям в чорній рубашці",
      id: "Avatar-10",
    },
  ];

  const handleNextStep = () => {
    setStep((prev) => prev + 1);

    dispatch(onboardingActions.setAvatar(selectedAvatar));
  };
  return (
    <>
      <h1 className={styles.title}>Обери собі круту аватарку</h1>
      <div className={styles.avatars_container}>
        {avatars.map((avatar) => {
          const selected = avatar.alt === selectedAvatar?.alt;

          return (
            <button
              className={styles.avatar_button}
              onClick={() => setSelectedAvatar(avatar)}
            >
              {selected ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: colors.accent.blueDarker,
                      opacity: 0.6,
                      zIndex: 1,
                      width: "100%",
                      height: "100%",
                      borderRadius: 100,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  ></div>
                  <Check
                    color="white"
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      zIndex: 111,
                    }}
                  />
                </div>
              ) : null}
              <img src={avatar.image} width={81} height={81} alt={avatar.alt} />
            </button>
          );
        })}
      </div>
      <button
        className={styles.goNext}
        onClick={handleNextStep}
        disabled={!selectedAvatar}
      >
        Далі
      </button>
    </>
  );
};

const CreateUsernameStep = ({ setStep, name }) => {
  const selectedAvatar = useSelector((state) => state.onboarding.avatar);

  const [username, setUsername] = useState(
    useSelector((state) => state.onboarding.username)
  );

  const dispatch = useDispatch();

  const handleNextStep = () => {
    setStep((prev) => prev + 1);

    dispatch(onboardingActions.setAvatar(selectedAvatar));
  };

  const handleGenerateRandomName = () => {
    const randomNumber = Math.floor(Math.random() * 9999);
    setUsername(`${name}${randomNumber}`);
  };

  return (
    <>
      <h1 className={styles.title}>Обери собі імʼя або згенеруй його</h1>
      <div className={styles.create_username_content}>
        <img
          src={selectedAvatar.image}
          alt={`Твій аватар: ${selectedAvatar.alt}`}
          width={102}
          height={102}
          className={styles.selected_avatar}
        />
        <div className={styles.username_input_background}>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className={styles.username_input}
            placeholder="@Введи нікнейм"
          />
        </div>
        <button
          className={styles.generate_name_button}
          onClick={handleGenerateRandomName}
        >
          Згенерувати імʼя
        </button>
        <button className={styles.goNext} onClick={handleNextStep}>
          Далі
        </button>
      </div>
    </>
  );
};

const SettingsStep = ({ setStep, userId, setShowInfoPopup }) => {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState(
    useSelector((state) => state.onboarding.settings)
  );

  const data = useSelector((state) => state.onboarding);

  const handleChangeDyslexiaMode = () => {
    setSettings((prev) => ({ ...prev, dyslexia_mode: !prev.dyslexia_mode }));
    dispatch(
      onboardingActions.setSettings({
        ...settings,
        dyslexia_mode: !settings.dyslexia_mode,
      })
    );
  };

  const handleChangeListeningExercises = (e) => {
    e.stopPropagation();
    setSettings((prev) => ({
      ...prev,
      listening_exercises: !prev.listening_exercises,
    }));
    dispatch(
      onboardingActions.setSettings({
        ...settings,
        listening_exercises: !settings.listening_exercises,
      })
    );
  };

  const handleChangeContrastMode = () => {
    setSettings((prev) => ({ ...prev, contrast_mode: !prev.contrast_mode }));
    dispatch(
      onboardingActions.setSettings({
        ...settings,
        contrast_mode: !settings.contrast_mode,
      })
    );
  };

  const handleNextStep = async () => {
    try {
      await authenticationService.createProfile(userId, data);

      setStep((prev) => prev + 1);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <h1 className={styles.title}>Налаштуй Діє.Слово під себе</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 24, position: 'relative' }}>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "e-Ukraine-Light",
            fontSize: 18,
            lineHeight: "24px",
          }}
        >
          Режим дислексії
          <div
            className={styles.setting_switch_label}
            style={{
              backgroundColor: settings.dyslexia_mode
                ? "#05B254"
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
        <button
          onClick={(e) => {
            e.stopPropagation();

            if (e.target !== e.currentTarget) {
              setShowInfoPopup(true);
            }
          }}
          style={{
            backgroundColor: "transparent",
            // padding: 10,
            border: "none",
            marginTop: 3,
            position: "absolute",
            top: 75,
            right: 85
          }}
        >
          <img src={info} alt="Інформація" width={24} height={24} />
        </button>
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "e-Ukraine-Light",
            fontSize: 18,
            lineHeight: "24px",
          }}
        >
          Вправи на аудіювання
          <div
            className={styles.setting_switch_label}
            style={{
              backgroundColor: settings.listening_exercises
                ? "#05B254"
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
        <label
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "e-Ukraine-Light",
            fontSize: 18,
            lineHeight: "24px",
          }}
        >
          Контрастний режим
          <div
            className={styles.setting_switch_label}
            style={{
              backgroundColor: settings.contrast_mode
                ? "#05B254"
                : colors.base.grey_40,
            }}
          >
            <div
              className={styles.setting_switch_label_controller}
              style={{ left: !settings.contrast_mode ? 2 : 32 }}
            ></div>
            <input
              type="checkbox"
              checked={settings.contrast_mode}
              onChange={handleChangeContrastMode}
            />
          </div>
        </label>
      </div>
      <button className={styles.goNext} onClick={handleNextStep}>
        Далі
      </button>
    </>
  );
};

const SuccessfullyRegistered = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };
  return (
    <>
      <h1 className={styles.title}>Ти успішно зареєструвався!</h1>
      <div className={styles.skovoroda_container}>
        <img src={skovoroda} width={239} height={239} />
      </div>
      <div style={{ position: "absolute", left: 16, top: 460 }}>
        <SpeechCloud />
        <p
          style={{
            position: "absolute",
            bottom: 14,
            fontFamily: "e-Ukraine-Regular",
            fontSize: 14,
            lineHeight: "20px",
            left: 18,
            width: 190,
          }}
        >
          Бери вершину і матимеш середину!
        </p>
      </div>
      <button className={styles.goNext} onClick={handleGoHome}>
        Перейти до навчання
      </button>
    </>
  );
};
