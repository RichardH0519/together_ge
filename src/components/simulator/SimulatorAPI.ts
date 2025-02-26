import { Client } from "@gradio/client";

const getSystemMessage = (userMessage: string) => {
  let baseMessage =
    "You are an HR interviewer conducting a salary negotiation interview with a fresh graduate. Keep your responses concise, acknowledging any technical aspects, but do not ask follow-up technical questions. After one follow-up question, shift focus to salary expectations or general teamwork skills.";

  if (userMessage.toLowerCase().includes("project")) {
    baseMessage =
      "Acknowledge the user's role in the project, and ask about how the experience shaped their teamwork or leadership skills. Then shift to salary expectations.";
  } else if (userMessage.toLowerCase().includes("internship")) {
    baseMessage =
      "Ask the user briefly about their responsibilities during the internship, then move on to questions about their career goals and salary expectations.";
  } else if (userMessage.toLowerCase().includes("salary")) {
    baseMessage =
      "Focus the conversation on salary expectations and how the user's previous experience justifies their expectations. Avoid diving into technical details.";
  }

  return baseMessage;
};

export const callChatAPI = async (userMessage: string) => {
  try {
    const client = await Client.connect("JeetFaldu/CheckLLama", {
    });

    const result = await client.predict("/chat", {
      message: userMessage,
      system_message: getSystemMessage(userMessage),
      max_tokens: 150,
      temperature: 0.3,
      top_p: 0.7,
    });

    return result;
  } catch (error) {
    console.log("Error during API call ", error);
  }
};
