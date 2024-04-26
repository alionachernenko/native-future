import { Configuration, OpenAIApi } from "openai";

export const sendChatMessage = async (message) => {
  const configuration = new Configuration({
    apiKey: "sk-proj-GCuaiTQnx6Ojcv2fjkjgT3BlbkFJ7nfGTmaOEQTfz51rdyE9",
  });

  const openai = new OpenAIApi(configuration);

  const baseConfig = {
    model: "gpt-3.5-turbo",
    temperature: 5,
    max_tokens: 1000,
  };
  try {
    const completion = openai.createChatCompletion({
      messages: [message],
      ...baseConfig,
    });

    const res = completion.data.choices[0].text.trim();

    return res;
  } catch (e) {
    console.log("error openai", e);
  }
};
