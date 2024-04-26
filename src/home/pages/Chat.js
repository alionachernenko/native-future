import styles from "./styles/Chat.module.css";
import skovoroda from "../../assets/images/skovoroda.png";
import arrow_left from "../../assets/icons/arrow_left-40.svg";
import { ReactComponent as CloudPolygon } from "../../assets/clouds/polygon_big.svg";
import { ReactComponent as Send } from "../../assets/icons/send.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { db, sendChatMessage } from "../../config";
import { useEffect, useRef, useState } from "react";
import { Button } from "../../common/components/Button";
import { useSelector, useDispatch } from "react-redux";
import skovoroda_grad from "../../assets/images/skovoroda_grad.png";
import quit from "../../assets/icons/quit.svg";
import { userActions } from "../../user/userSlice";
import { doc, increment, updateDoc } from "firebase/firestore";
import star from "../../assets/emojis/star-24.png";
import { ErrorPopup } from "../../features/error/components/ErrorPopup";
import info from "../../assets/icons/info.svg";
import { InfoPopup } from "../../features/popup/InfoPopup";

const systemMessage = {
  role: "system",
  content:
    "You are an English conversation assistant designed to help users improve their English language skills. Communicate with them only in English so they can practice and learn. You can give advice on grammar, correctness of writing, vocabulary, and pronunciation, as well as answer questions about grammar and other aspects of the English language. Be friendly, patient, and encourage the user to continue learning the language.",
};

export const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [chatStarted, setChatStarted] = useState(false);
  const [error, setError] = useState(false);

  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const user = useSelector((state) => state.user.user);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();

  const [practiceFinished, setPracticeFinished] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm Skovoroda! Let's practice!",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFinishPractice = async () => {
    setPracticeFinished(true);

    dispatch(userActions.setUser({ ...user, points: user.points + 50 }));
    try {
      const uid = localStorage.getItem("uid");

      await updateDoc(doc(db, "users", uid), { points: increment(50) });
    } catch (e) {
      console.log("error", e);
      setError(true);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();

    const newMessage = {
      message: userInput,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    setIsTyping(true);
    setUserInput("");
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization:
          "Bearer " +
          "sk-proj-GCuaiTQnx6Ojcv2fjkjgT3BlbkFJ7nfGTmaOEQTfz51rdyE9",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className={styles.page}>
      {showInfoPopup ? (
        <InfoPopup
          onClose={() => setShowInfoPopup(false)}
          text={
            "Ти можеш практикувати англійську разом з чатом штучного інтелекту. Також Сковорода допоможе тобі з вивченням англійською: запитай у нього щось, з чим у тебе зʼявилися труднощі."
          }
        />
      ) : null}
      {error ? <ErrorPopup /> : null}
      <div className={styles.container}>
        <div className={styles.header}>
          <button
            onClick={() => navigate(location?.state?.from || "/home")}
            style={{
              position: "absolute",
              top: 24,
              left: 16,
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
          <h1 className={styles.header_title}>Skovoroda чат</h1>
          <button
            onClick={() => setShowInfoPopup(true)}
            style={{
              backgroundColor: "transparent",
              padding: 10,
              border: "none",
              marginTop: 3,
            }}
          >
            <img src={info} alt="Інформація про чат" width={24} height={24} />
          </button>
        </div>

        {!chatStarted ? (
          <>
            <p
              style={{
                marginTop: 100,
                fontSize: 26,
                lineHeight: "34px",
                fontFamily: "e-Ukraine-Regular",
                marginBottom: 20,
              }}
            >
              Привіт!
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
                width: 169,
                padding: 20,
                backgroundColor: "white",
                alignSelf: "center",
                borderRadius: 28,
                position: "relative",
              }}
            >
              <CloudPolygon
                style={{ position: "absolute", zIndex: -1, top: -40, left: 20 }}
              />
              <p
                style={{
                  fontSize: 14,
                  lineHeight: "18px",
                  fontFamily: "e-Ukraine-Regular",
                }}
              >
                Поспілкуємося?
              </p>
            </div>
          </>
        ) : !practiceFinished ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {messages.map(({ message, sender }) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: sender === "ChatGPT" ? "row" : "row-reverse",
                    gap: 11,
                  }}
                >
                  <img
                    width={40}
                    height={40}
                    src={sender === "ChatGPT" ? skovoroda_grad : user?.avatar}
                    alt={
                      sender === "ChatGPT"
                        ? "Картинка сковороди"
                        : "Твій аватар"
                    }
                  />
                  <div
                    style={{
                      backgroundColor:
                        sender === "ChatGPT" ? "white" : "#FFF0B7",
                      padding: "12px 10px",
                      maxWidth: 241,
                      borderTopLeftRadius: 24,
                      borderTopRightRadius: 24,
                      borderBottomLeftRadius: sender === "ChatGPT" ? 0 : 24,
                      borderBottomRightRadius: sender === "ChatGPT" ? 24 : 0,
                    }}
                  >
                    <p
                      style={
                        {
                          // wordBreak: "break-all",
                        }
                      }
                    >
                      {message}
                    </p>
                  </div>
                  <div ref={messagesEndRef} />
                </div>
              );
            })}
          </div>
        ) : (
          <Finished />
        )}
      </div>

      <div className={styles.footer}>
        <div
          style={{
            width: "100%",
            maxWidth: 390,
            display: "flex",
            gap: 10,
          }}
        >
          {practiceFinished ? (
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Button
                text="Повернутися на головну"
                onClick={() => navigate("/home/main")}
              />
            </div>
          ) : chatStarted ? (
            <>
              <button
                style={{
                  transform: "rotate(180deg)",
                  border: "none",
                  backgroundColor: "transparent",
                }}
                onClick={handleFinishPractice}
              >
                <img src={quit} width={40} height={40} alt="Вихід із чату" />
              </button>
              <form
                style={{ position: "relative", flexGrow: 1 }}
                onSubmit={handleSend}
              >
                <input
                  placeholder="Напиши повідомлення"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                />
                <button
                  style={{
                    position: "absolute",
                    right: 12,
                    padding: 0,
                    border: "none",
                    backgroundColor: "transparent",
                    top: "50%",
                    transform: "translate(0, -50%)",
                  }}
                >
                  <Send />
                </button>
              </form>
            </>
          ) : (
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Button
                text="Почати розмову"
                onClick={() => setChatStarted(true)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Finished = () => {
  return (
    <>
      <p
        style={{
          marginTop: 100,
          fontSize: 20,
          lineHeight: "24px",
          fontFamily: "e-Ukraine-Regular",
          marginBottom: 8,
        }}
      >
        Практика завершена!
      </p>
      <p
        style={{
          fontSize: 26,
          lineHeight: "34px",
          fontFamily: "e-Ukraine-Regular",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        + 50 балів! <img src={star} width={24} height={24} alt="Зірочка" />
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
          width: 248,
          padding: "10px 20px",
          backgroundColor: "white",
          alignSelf: "center",
          borderRadius: 28,
          position: "relative",
        }}
      >
        <CloudPolygon
          style={{ position: "absolute", zIndex: -1, top: -40, left: 20 }}
        />
        <p
          style={{
            fontSize: 14,
            lineHeight: "18px",
            fontFamily: "e-Ukraine-Regular",
          }}
        >
          О, коли б змога писати так само багато, як і мислити!?
        </p>
      </div>
    </>
  );
};
