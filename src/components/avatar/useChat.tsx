import { createContext, useContext, useEffect, useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Should remove this afterward
  });

const ChatContext = createContext();

const readJsonTranscript = async () => {
    return {
        "metadata": {
          "soundFile": "",
          "duration": 5.32
        },
        "mouthCues": [
          { "start": 0.00, "end": 0.77, "value": "X" },
          { "start": 0.77, "end": 0.85, "value": "B" },
          { "start": 0.85, "end": 0.99, "value": "E" },
          { "start": 0.99, "end": 1.41, "value": "F" },
          { "start": 1.41, "end": 1.55, "value": "B" },
          { "start": 1.55, "end": 1.63, "value": "A" },
          { "start": 1.63, "end": 1.70, "value": "C" },
          { "start": 1.70, "end": 1.83, "value": "F" },
          { "start": 1.83, "end": 1.97, "value": "G" },
          { "start": 1.97, "end": 2.04, "value": "C" },
          { "start": 2.04, "end": 2.18, "value": "B" },
          { "start": 2.18, "end": 2.25, "value": "C" },
          { "start": 2.25, "end": 2.60, "value": "B" },
          { "start": 2.60, "end": 2.67, "value": "C" },
          { "start": 2.67, "end": 2.88, "value": "B" },
          { "start": 2.88, "end": 3.02, "value": "C" },
          { "start": 3.02, "end": 3.23, "value": "B" },
          { "start": 3.23, "end": 3.31, "value": "A" },
          { "start": 3.31, "end": 3.80, "value": "B" },
          { "start": 3.80, "end": 3.87, "value": "C" },
          { "start": 3.87, "end": 4.01, "value": "H" },
          { "start": 4.01, "end": 4.08, "value": "B" },
          { "start": 4.08, "end": 4.29, "value": "C" },
          { "start": 4.29, "end": 4.38, "value": "A" },
          { "start": 4.38, "end": 4.42, "value": "B" },
          { "start": 4.42, "end": 4.60, "value": "C" },
          { "start": 4.60, "end": 4.74, "value": "B" },
          { "start": 4.74, "end": 4.87, "value": "X" },
          { "start": 4.87, "end": 4.93, "value": "B" },
          { "start": 4.93, "end": 4.98, "value": "C" },
          { "start": 4.98, "end": 5.19, "value": "B" },
          { "start": 5.19, "end": 5.32, "value": "X" }
        ]
      }
      ;
  };

export const ChatProvider = ({ children }: any) => {
  const chat = async (userMessage: any) => {
    setLoading(true);

    try {
      // Call OpenAI API directly
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 1000,
        temperature: 0.6,
        messages: [
          {
            role: "system",
            content: `
              You are a virtual friend.
              Always reply with a JSON array of messages (max 3).
              Each message has a text, facialExpression, and animation.
              Facial expressions: smile, sad, angry, surprised, funnyFace, default.
              Animations: Argue, Talking, Talking_2, BowDown.
            `,
          },
          {
            role: "user",
            content: userMessage || "Hello",
          },
        ],
      });
      // console.log(completion)
    //   let messages = JSON.parse(completion.choices[0].message.content);
    // Assume the string contains special characters or unwanted formatting
let rawMessageContent = completion.choices[0].message.content;

// Clean the string to make sure it's valid JSON
let cleanedMessageContent = rawMessageContent
    .replace(/```json/g, '')  // Remove opening markdown code block if specified as JSON
    .replace(/```/g, '')      // Remove closing markdown code block
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')  // Remove any special characters
    .trim(); // Trim leading and trailing whitespaces

// Now parse it into a JSON object
  let respond = JSON.parse(cleanedMessageContent);
  // console.log(respond);

      // Process messages (e.g., generate audio, lipsync)
      for (let i = 0; i < respond.length; i++) {
        const message = respond[i];
        message.audio = null;
        // message.lipsync = await readJsonTranscript(`/api_1.json`);

        message.lipsync = await readJsonTranscript();
      }     
      // console.log(messages)
      setMessages((messages) => [...messages, ...respond]);
      // console.log(messages)
      setLoading(false);
      
    } 
    catch (error) {
      console.error("Error during OpenAI request:", error);
    }
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
