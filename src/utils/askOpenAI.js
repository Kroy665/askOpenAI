import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const turnOff = false

async function askOpenAI(question) {

  if (turnOff) {
    return "Sorry, I am sleeping"
  } else {
    if (question === "" || question === " " || question === "\n") {
      return "please ask a question"
    } else {
      try {
        const prompt = `Q: ${question} A:`;
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          temperature: 0.7,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        });
        return response.data.choices[0].text;
      } catch (error) {
        console.log(error);
        return "Sorry, I don't know the answer to that question";
      }
      
    }
  }
}

export default askOpenAI;