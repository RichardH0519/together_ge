import MessageBox from "../reusable/MessageBox";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import UserInputCard from "./UserInputCard";
import NegotiatorResponseCard from "./NegotiatorResponseCard";
import { MessageDatatype } from "./MessageDatatype";
import CustomizedLoader from "../reusable/CustomizedLoader";
import OpenAI from "openai";
import "./simulator.css";
import PromptCard from "../reusable/PromptCard";
import { useMediaQuery } from "react-responsive";
import { FiVolumeX } from "react-icons/fi";
import { FiVolume2 } from "react-icons/fi";


const SimulatorPageContent: React.FC = () => {
  const messages: MessageDatatype[] = [
    {
      message_source: "negotiator",
      message_content:
        "Hi there, I'm Robin, HR from Code Waves! Thanks for having me today.",
    },
  ];

  const prompts = [
    {
      header: "How can I ask for a raise to $100k?",
      content:
        "I have been performing well and believe my skills and experience warrant a salary of $100k. How can I approach this discussion with confidence?",
    },
    {
      header: "How can I ensure my salary is fair?",
      content:
        "As a recent software engineering graduate, how can I ensure that my salary aligns fairly with industry standards and internal benchmarks?",
    },
    {
      header: "How do I negotiate a $90k starting salary?",
      content:
        "For an entry-level role, how can I justify a $90k salary in our industry?",
    },
    {
      header: "Can I practice salary negotiation with HR?",
      content:
        "Could I have the opportunity to discuss and practice salary negotiation strategies to feel more confident during formal reviews?",
    },
  ];

  const [messagesList, setMessagesList] = useState(messages);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [promptStatus, setPromptStatus] = useState(true);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  const handleSendPressed = (userMessage: string) => {
    setPromptStatus(false);

    const newUserMessage: MessageDatatype = {
      message_source: "user",
      message_content: userMessage,
    };

    setMessagesList((messages) => [...messages, newUserMessage]);
    setLoading(true);

    // API call
    handleBotReply(userMessage);
  };

  const handleAPICall = async (userMessage: string) => {
    try {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true, // Should remove this afterward
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 350,
        messages: [
          {
            role: "system",
            content:
              "You are an HR interviewer in a salary discussion where neither side has strong agreement or disagreement. You are open to negotiation and try to find a middle ground between the company's initial offer and the candidate's expectations. Never accept demand of salary above 110k if they don't have any experience and salary of 200k if they have years of experience and 250k in case of more than 10 years of experience. Politely deny their offer and give them counter offer. Strictly provide your response in 50 words and no special characters in response like asterisk",
          },
          { role: "user", content: userMessage },
        ],
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      // console.log("Error when calling the API", error);
      return "Sorry, something went wrong.";
    }
  };

  const handleBotReply = async (userMessage: string) => {
    try {
      const newBotMessage: MessageDatatype = {
        message_source: "negotiator",
        message_content: await handleAPICall(userMessage),
      };

      setMessagesList((messages) => [...messages, newBotMessage]);
      setLoading(false);
    } catch (error) {
      console.log("Error when handling bot reply", error);
    }
  };

  const handleMuteClick = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div
      className="container-flux d-flex flex-column"
      style={{ paddingTop: "2.5rem", height: "80vh" }}
    >
      <div className="text-center pb-3">
        <h3>
          Practice Negotiate with HR
        </h3>
        <h3>

        <Form.Check
            type="switch"
            id="mute-switch"
            className="ms-3"
            label={isMuted ? <FiVolumeX style={{color: "red"}}/> : <FiVolume2 style={{color: "green"}}/>}
            checked={isMuted}
            onChange={handleMuteClick}  
            style={{ display: 'inline-block' }}
          />
        </h3>
      </div>

      {/* Chat content will scroll */}
      <div className="">
        <div className="container chat-content">
          {messagesList.map((message) =>
            message.message_source === "negotiator" ? (
              <div key={message.message_content}>
                <NegotiatorResponseCard
                  content={message.message_content}
                  isMuted={isMuted}
                />
                <div ref={chatEndRef}></div>
              </div>
            ) : (
              <div key={message.message_content}>
                <UserInputCard content={message.message_content} />
                <div ref={chatEndRef}></div>
              </div>
            )
          )}
        </div>

        <Container className={promptStatus ? "" : "d-none"}>
          <Row className="flex-grow-1">
            {prompts
              .slice(0, useMediaQuery({ maxWidth: 576 }) ? 2 : prompts.length)
              .map((prompt, index) => {
                return (
                  <Col className="p-2" key={index}>
                    <PromptCard
                      header={prompt.header}
                      content={prompt.content}
                      onSendPressed={handleSendPressed}
                    />
                  </Col>
                );
              })}
          </Row>
        </Container>
      </div>

      {/* This section stays at the bottom */}
      <Container className="mt-auto">
        <Row className="justify-content-center">
          <Col>
            {loading ? (
              <div className="col-9 col-lg-6 col-md-6">
                <CustomizedLoader />
              </div>
            ) : (
              <Form className="">
                <MessageBox onSendPressed={handleSendPressed} />
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </div>

  );
};

export default SimulatorPageContent;
