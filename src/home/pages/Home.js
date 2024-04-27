import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../../user/userService";
import {
  NavLink,
  useLocation,
  useNavigate,
  Outlet,
  Link,
} from "react-router-dom";
import { userActions } from "../../user/userSlice";

import styles from "./styles/Home.module.css";
import styles_main from "./styles/Main.module.css";

import ChatTab from "../../assets/icons/chat-tab.svg";
import MainTab from "../../assets/icons/main-tab.svg";
import GrammarTab from "../../assets/icons/grammar-tab.svg";
import WordsTab from "../../assets/icons/words-tab.svg";

import skovoroda from "../../assets/images/adv-ai.png";
import { Button } from "../../common/components/Button";

import waving_hand from "../../assets/emojis/waving_hand-24.png";
import star from "../../assets/emojis/star-24.png";
import { colors } from "../../common/colors/colors";

import { ReactComponent as CloudPolygon } from "../../assets/clouds/app_onb_cloud_polygon.svg";
import { ReactComponent as Settings } from "../../assets/icons/settings.svg";
import { ErrorPopup } from "../../features/error/components/ErrorPopup";
import { Oval } from "react-loader-spinner";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [appOnboardingDone, setAppOnboardingDone] = useState(
    localStorage.getItem("app_onboarding_done")
  );

  const tabs = [
    {
      id: "main",
      route: "main",
      icon: ChatTab,
      title: "Головна",
    },
    {
      id: "words",
      route: "words",
      icon: GrammarTab,
      title: "Слова",
    },
    {
      id: "grammar",
      route: "/empty",
      icon: WordsTab,
      title: "Граматика",
    },
    {
      id: "chat",
      route: "/chat",
      icon: MainTab,
      title: "Чат",
    },
  ];

  useEffect(() => {
    const init = async () => {
      const uid = localStorage.getItem("uid");

      if (!uid) {
        navigate("/login");
      }

      try {
        const user = await userService.getUserDocument(uid);
        dispatch(userActions.setUser(user));

        if (!user) {
          navigate("/login");
          return;
        }
        setLoading(false);
        localStorage.setItem("user", user);

        if (location.pathname === "/home") {
          navigate("main");
        }
      } catch (e) {
        console.log(e);
        setError(true);
      }
    };

    init();
  }, []);

  const location = useLocation();
  if (loading) {
    return (
      <Oval
        visible={true}
        height="70"
        width="70"
        color="#5B5AEC"
        secondaryColor="#BDBDFF"
        ariaLabel="oval-loading"
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass=""
      />
    );
  }

  return (
    <div className={styles.page}>
      {error ? <ErrorPopup /> : null}
      {!appOnboardingDone ? (
        <AppOnboarding setAppOnboardingDone={setAppOnboardingDone} />
      ) : null}

      <div className={styles.container}>
        {location.pathname !== "/home/grammar" &&
        location.pathname !== "/home/gifts" &&
        location.pathname !== "/home/article" ? (
          <Link
            state={{ from: location.pathname }}
            to={"/settings"}
            style={{
              position: "absolute",
              top: 10,
              left: 16,
            }}
          >
            <Settings />
          </Link>
        ) : null}
        <Outlet />
      </div>
      {location.pathname !== "/home/grammar" &&
        location.pathname !== "/home/gifts" && (
          <nav className={styles.navbar}>
            <ul className={styles.tabbar}>
              {tabs.map((tab) => {
                if (tab.id === "chat") {
                  return (
                    <Link to={tab.route} className={styles.navlink}>
                      <img src={tab.icon} />
                      <p>{tab.title}</p>
                    </Link>
                  );
                }
                return (
                  <NavLink
                    to={tab.route}
                    className={({ isActive }) =>
                      isActive ? styles.navlink_active : styles.navlink
                    }
                  >
                    <img src={tab.icon} />
                    <p>{tab.title}</p>
                  </NavLink>
                );
              })}
            </ul>
          </nav>
        )}
    </div>
  );
};

const AppOnboarding = ({ setAppOnboardingDone }) => {
  const [step, setStep] = useState(0);
  console.log({ step });

  const renderHighlight = () => {
    switch (step) {
      case 1:
        return <FirstHighlight />;
      case 2:
        return <SecondHighlight />;
      default:
        <FirstHighlight />;
    }
  };

  const steps = [
    {
      text: "Привіт! Я Сковорода, твій помічник. Давай я покажу тобі, як користуватися цим додатком",
    },
    {
      text: "Ось тут знаходяться твої бали, які ти отримаєш за вивчені слова та пройдені теми",
    },
    {
      text: "Це твій навчальний прогрес, він збільшуватиметься, коли ти вивчатимеш більше",
    },
    {
      text: "Це Слова, тут ти вивчатимеш нові слова англійською та тренуватимеш їх, виконуючи вправи.",
    },
    {
      text: "Це Чат зі Сковородою, тут ти практикуватимеш вивчені слова англійською, спілкуючись у чаті.",
    },
  ];

  return (
    <>
      <div className={styles.onboarding_container}>
        <div className={styles.onboarding_innerContainer}>
          {renderHighlight()}
          <AppOnboardingTooltip
            setAppOnboardingDone={setAppOnboardingDone}
            text={steps[step].text}
            step={step}
            setStep={setStep}
          />
        </div>
      </div>
    </>
  );
};

const AppOnboardingTooltip = ({
  text,
  step,
  setStep,
  setAppOnboardingDone,
}) => {
  const topValues = [191, 238, 405, "", ""];
  const bottomValues = ["", "", "", 100, 100];

  const tooltipPolygonStyles = [
    { display: "none" },
    { top: -19, left: 100 },
    { top: -19, left: 100 },
    { bottom: -19, left: 95, transform: "rotate(180deg)" },
    { bottom: -19, right: 17, transform: "rotate(180deg)" },
  ];

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#E7EEF3",
        width: "calc(100% - 32px)",
        borderRadius: 24,
        paddingTop: 44,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        top: topValues[step],
        bottom: bottomValues[step],
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <CloudPolygon
        style={{
          position: "absolute",
          ...tooltipPolygonStyles[step],
          width: 42,
          height: 28,
        }}
        width={42}
        height={28}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 16,
          gap: 10,
        }}
      >
        <img src={skovoroda} width={82} height={82} />
        <p
          style={{
            fontSize: 14,
            lineHeight: "18px",
            fontFamily: "e-Ukraine-Regular",
          }}
        >
          {text}
        </p>
      </div>
      <Button
        variant="gradient"
        text={step === 4 ? "Завершити" : "Далі"}
        onClick={() => {
          if (step === 4) {
            localStorage.setItem("app_onboarding_done", true);
            setAppOnboardingDone(true);
            return;
          }
          setStep((prev) => prev + 1);
        }}
      />
      <p
        style={{
          marginTop: 16,
          fontSize: 18,
          fontFamily: "e-Ukraine-Light",
          lineHeight: "24px",
        }}
      >{`${step + 1}/5`}</p>
    </div>
  );
};

const FirstHighlight = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <div
      style={{
        position: "absolute",
        alignSelf: "center",
        top: 45,
        left: 4,
        backgroundColor: colors.base.brightGrey,
        padding: "15px 12px",
        borderRadius: 24,
      }}
    >
      <div className={styles_main.name_container}>
        <p className={styles_main.name}>Hello, {user.name}</p>
        <img
          src={waving_hand}
          alt="Рука, яка махає з привітанням"
          width={24}
          height={24}
        />
      </div>
      <div className={styles_main.info_container} style={{ marginBottom: 0 }}>
        <img src={user.avatar} width={102} height={102} alt="Твій аватар" />
        <div>
          <div className={styles_main.stars_container}>
            <img src={star} width={24} height={24}></img>
            <p>0</p>
          </div>
          <button className={styles_main.gift_button}>Обрати нагороду</button>
        </div>
      </div>
    </div>
  );
};

const SecondHighlight = () => {
  return (
    <div
      style={{
        position: "absolute",
        alignSelf: "center",
        top: 201,
        left: 4,
        backgroundColor: colors.base.brightGrey,
        padding: "15px 12px",
        borderRadius: 24,
      }}
    >
      <div className={styles_main.level_container}>
        <p className={styles_main.level}>Ти на 1 рівні</p>
        <div className={styles_main.level_progress_container}>
          <div className={styles_main.level_progress_inner}></div>
        </div>
      </div>
      <div className={styles_main.streak_container} style={{ marginBottom: 0 }}>
        <p className={styles_main.streak_title}>Днів безперервного навчання</p>
        <div className={styles_main.streak_days}>
          {Array.from({ length: 5 }).map((el, index) => (
            <div
              className={
                index === 0
                  ? styles_main.streak_day_passed
                  : styles_main.streak_day
              }
            >
              <p>{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
