import styles from "./styles/Topic.module.css";
import airfield from "../../../assets/topics/airfield.png";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import arrow_left from "../../../assets/icons/arrow_left-40.svg";
import { Button } from "../../../common/components/Button";
import skovoroda from "../../../assets/images/skovoroda.png";
import star from "../../../assets/emojis/star-24.png";
import { ReactComponent as CloudPolygon } from "../../../assets/clouds/polygon_big.svg";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../../config";
import { userActions } from "../../../user/userSlice";
import { ErrorPopup } from "../../error/components/ErrorPopup";

export const Topic = () => {
  const airfield = words.airfield;
  const tasks = airfield.tasks;

  const [searchParams] = useSearchParams();
  const topicName = searchParams.get("name");

  const [currentTask, setCurrentTask] = useState(0);
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(false);

  const innerBarWidth = (100 / 5) * (currentTask + 1);

  const task = tasks[currentTask];

  const user = useSelector((state) => state.user.user);

  const [answers, setAnswers] = useState({
    vocabulary: null,
    image_word: null,
    word_word: null,
    word_translate: null,
  });

  const dispatch = useDispatch();

  console.log({ currentTask });
  useEffect(() => {
    const uid = localStorage.getItem("uid");

    const init = () => {
      dispatch(
        userActions.setUser({
          ...user,
          topicsInProgress: [
            ...(user.topicsInProgress || []),
            {
              id: "military",
              title: "Military",
              subtitle: "Військова справа",
              imageAlt: "Піксель патерн військової форми",
              color: "#DFF770",
            },
          ],
        })
      );

      updateDoc(doc(db, "users", uid), {
        topicsInProgress: arrayUnion({
          id: "military",
          title: "Military",
          subtitle: "Військова справа",
          imageAlt: "Піксель патерн військової форми",
          color: "#DFF770",
        }),
      });
    };

    init();
  }, []);

  const navigate = useNavigate();
  const renderTask = () => {
    switch (currentTask) {
      case 0:
        return (
          <Vocabulary
            task={task}
            setCurrentTask={setCurrentTask}
            setPoints={setPoints}
            answers={answers}
            setAnswers={setAnswers}
          />
        );
      case 1:
        return (
          <ImageWord
            task={task}
            setCurrentTask={setCurrentTask}
            setPoints={setPoints}
            answers={answers}
            setAnswers={setAnswers}
          />
        );
      case 2:
        return (
          <WordWord
            task={task}
            setCurrentTask={setCurrentTask}
            setPoints={setPoints}
            answers={answers}
            setAnswers={setAnswers}
          />
        );
      case 3:
        return (
          <WordTranslate
            task={task}
            setCurrentTask={setCurrentTask}
            setPoints={setPoints}
            answers={answers}
            setAnswers={setAnswers}
            points={points}
          />
        );
      case 4:
        return <Results points={points} />;
      default:
        return (
          <Vocabulary
            task={task}
            setCurrentTask={setCurrentTask}
            setPoints={setPoints}
          />
        );
    }
  };

  const handleSkipPress = async () => {
    if (currentTask === 4) {
      navigate("/chat");
    }
    if (currentTask === 3) {
      dispatch(userActions.setUser({ ...user, points: user.points + points }));
      try {
        const uid = localStorage.getItem("uid");

        await updateDoc(doc(db, "users", uid), { points: increment(points) });
      } catch (e) {
        console.log("error", e);
        setError(true);
      }
    }

    setCurrentTask((prev) => prev + 1);
  };

  const handleQuit = async () => {
    if (currentTask === 4) {
      navigate("/home/words");
      return;
    }

    dispatch(userActions.setUser({ ...user, points: user.points + points }));
    try {
      const uid = localStorage.getItem("uid");

      await updateDoc(doc(db, "users", uid), { points: increment(points) });
    } catch (e) {
      console.log("error", e);
      setError(true);
    }
    setCurrentTask(4);
  };

  return (
    <div className={styles.page}>
      {error ? <ErrorPopup /> : null}
      <div className={styles.container}>
        <button
          onClick={() => {
            if (currentTask === 0) {
              navigate("/home/words");
              return;
            }
            setCurrentTask((prev) => prev - 1);
          }}
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
        <h1 className={styles.title}>
          Тема: {topicName}. {task?.name || "Тренування"}
        </h1>
        <div className={styles.progress_bar}>
          <div className={styles.progress_outer}></div>
          <div
            className={styles.progress_inner}
            style={{ width: `${innerBarWidth}%` }}
          >
            <p
              style={{
                fontSize: 20,
                lineHeight: "24px",
                fontFamily: "e-Ukraine-Regular",
                color: "white",
              }}
            >
              {currentTask + 1}/5
            </p>
          </div>
        </div>
        {renderTask()}
        <div style={{ position: "fixed", bottom: 16, width: "100%" }}>
          <div style={{ marginBottom: 12 }}>
            <Button
              variant="standard"
              text={
                currentTask === 4
                  ? "Перейти до чату"
                  : currentTask === 3
                  ? "Підтвердити відповідь"
                  : "Пропустити"
              }
              onClick={handleSkipPress}
            />
          </div>
          <Button
            variant="gradient"
            text={currentTask === 4 ? "Пізніше" : "Завершити"}
            onClick={handleQuit}
          />
        </div>
      </div>
    </div>
  );
};

const Vocabulary = ({
  task,
  setCurrentTask,
  setPoints,
  answers,
  setAnswers,
}) => {
  const handleChooseAnswer = (answer) => {
    setCurrentTask((prev) => prev + 1);
    setPoints((prev) => prev + answer.points);
    setAnswers((prev) => ({ ...prev, vocabulary: answer }));
  };

  return (
    <>
      <img
        src={task?.image}
        width={238}
        height={238}
        style={{
          marginTop: 24,
          alignSelf: "center",
          marginBottom: 35,
        }}
      />
      <p
        style={{
          fontSize: 26,
          lineHeight: "34px",
          fontFamily: "e-Ukraine-Regular",
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {task?.title}
      </p>
      <p
        style={{
          fontSize: 20,
          lineHeight: "24px",
          fontFamily: "e-Ukraine-Regular",
          textAlign: "center",
          textTransform: "capitalize",
          marginBottom: 16,
        }}
      >
        {task?.subtitle}
      </p>
      <div className={styles.options_container}>
        {task?.options.map((option) => {
          return (
            <div className={styles.option_button_container}>
              <button
                className={styles.option_button}
                onClick={() => handleChooseAnswer(option)}
                style={{
                  backgroundColor:
                    answers.vocabulary?.title === option.title
                      ? "#DEDEFF"
                      : "white",
                }}
              >
                {option.title}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

const ImageWord = ({
  task,
  setCurrentTask,
  setPoints,
  answers,
  setAnswers,
}) => {
  const handleChooseAnswer = (answer) => {
    setCurrentTask((prev) => prev + 1);
    setPoints((prev) => prev + answer.points);
    setAnswers((prev) => ({ ...prev, image_word: answer }));
  };

  return (
    <>
      <img
        src={task.image}
        width={238}
        height={238}
        style={{
          marginTop: 24,
          alignSelf: "center",
          marginBottom: 54,
        }}
      />
      <p>{task.title}</p>
      <p>{task.subtitle}</p>
      <div className={styles.options_container}>
        {task.options.map((option) => (
          <div className={styles.option_button_container}>
            <button
              className={styles.option_button}
              onClick={() => handleChooseAnswer(option)}
              style={{
                backgroundColor:
                  answers.image_word?.title === option.title
                    ? "#DEDEFF"
                    : "white",
              }}
            >
              {option.title}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

const WordWord = ({ task, setCurrentTask, setPoints, answers, setAnswers }) => {
  const handleChooseAnswer = (answer) => {
    setCurrentTask((prev) => prev + 1);
    setPoints((prev) => prev + answer.points);
    setAnswers((prev) => ({ ...prev, word_word: answer }));
  };

  return (
    <>
      <div className={styles.main_word_container}>
        <p>{task.word}</p>
      </div>
      <div className={styles.options_container}>
        {task.options.map((option) => (
          <div className={styles.option_button_container}>
            <button
              className={styles.option_button}
              onClick={() => handleChooseAnswer(option)}
              style={{
                backgroundColor:
                  answers.word_word?.title === option.title
                    ? "#DEDEFF"
                    : "white",
              }}
            >
              {option.title}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

const WordTranslate = ({
  task,
  setCurrentTask,
  setPoints,
  points,
  answers,
  setAnswers,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPoints =
      inputValue.toLowerCase().trim() === task.answer.toLowerCase().trim()
        ? 5
        : 0;

    setPoints((prev) => prev + newPoints);
    setCurrentTask((prev) => prev + 1);

    try {
      const uid = localStorage.getItem("uid");

      await updateDoc(doc(db, "users", uid), {
        points: increment(points + newPoints),
      });
    } catch (e) {
      console.log("error", e);
      setError(true);
    }
  };

  return (
    <>
      {error ? <ErrorPopup /> : null}
      <div className={styles.main_word_container}>
        <p>{task.word}</p>
      </div>
      <form>
        <div className={styles.input_background}>
          <input
            placeholder="Напиши відповідь тут"
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* <button onClick={(e) => handleSubmit(e)}>submit</button> */}
      </form>
    </>
  );
};

const Results = ({ points }) => {
  return (
    <>
      <p
        style={{
          fontSize: 20,
          lineHeight: "24px",
          fontFamily: "e-Ukraine-Regular",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 8,
        }}
      >
        Урок завершено!
      </p>
      <p
        style={{
          fontSize: 26,
          lineHeight: "34px",
          fontFamily: "e-Ukraine-Regular",
          textAlign: "center",
          marginTop: 10,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        + {points} балів!{" "}
        <img
          src={star}
          alt="Зірочка"
          width={24}
          height={24}
          style={{ marginLeft: 8 }}
        />
      </p>
      <div
        style={{
          alignSelf: "center",
          background: "linear-gradient(#79b0d3, #d3abd2, #a7b0c1)",
          borderRadius: 1000,
          overflow: "hidden",
          marginBottom: 41,
        }}
      >
        <img src={skovoroda} width={238} height={238} />
      </div>
      <div
        style={{
          width: 290,
          padding: "12px 18px",
          backgroundColor: "white",
          alignSelf: "center",
          borderRadius: 28,
          position: "relative",
        }}
      >
        <CloudPolygon
          style={{ position: "absolute", zIndex: -1, top: -40, left: 46 }}
        />
        <p
          style={{
            fontSize: 14,
            lineHeight: "18px",
            fontFamily: "e-Ukraine-Regular",
          }}
        >
          Ти вивчив нові слова! Закріпи результат на практиці у спілкуванні зі
          Сковородою
        </p>
      </div>
    </>
  );
};
const words = {
  airfield: {
    eng: "airfield",
    ua: "аєродром",
    tasks: [
      {
        type: "vocabulary",
        name: "Словник",
        options: [
          {
            title: "Знаю",
            points: 5,
          },
          {
            title: "Не знаю",
            points: 0,
          },
        ],
        image: airfield,
        title: "Airfield",
        subtitle: "аєродром",
      },
      {
        type: "image_word",
        name: "Тренування",
        options: [
          {
            title: "Airfield",
            points: 5,
          },
          {
            title: "No-fly zone",
            points: 0,
          },
          {
            title: "Ammunition",
            points: 0,
          },
          {
            title: "Airstrike",
            points: 0,
          },
        ],
        image: airfield,
      },
      {
        type: "word_word",
        name: "Тренування",
        options: [
          {
            title: "Airfield",
            points: 5,
          },
          {
            title: "No-fly zone",
            points: 0,
          },
          {
            title: "Ammunition",
            points: 0,
          },
          {
            title: "Airstrike",
            points: 0,
          },
        ],
        word: "Аєродром",
      },
      {
        type: "word_translate",
        name: "Тренування",
        answer: "Airfield",
        word: "Аєродром",
        points: 5,
      },
    ],
  },
};
