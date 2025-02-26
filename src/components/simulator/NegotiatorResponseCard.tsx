import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import geLogo from "../../assets/logo.png";
import Speech from 'speak-tts';

interface CardProps {
  content: string;
  isMuted: boolean;
}

function NegotiatorResponseCard({ content, isMuted }: CardProps) {
  const [speech] = useState(new Speech());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (speech.hasBrowserSupport()) {
      speech.init({
        volume: 1,
        lang: "en-US",
        rate: 1.2,
        pitch: 2,
        splitSentences: false,
      }).then((data) => {
        // console.log(data.voices)
        const desiredVoice = data.voices.find((voice: any) => /natural/i.test(voice.name) && voice.lang === "en-AU") || data.voices[0];
        if (desiredVoice) {
          speech.setVoice(desiredVoice.name);
        } else {
          console.warn("Desired voice not found, using default voice.");
        }
        setIsInitialized(true);
      }).catch(e => {
        console.error("Error initializing speech:", e);
      });
    }
  }, [speech]);

  useEffect(() => {
    if (!isInitialized || isMuted) return; // Stop if muted

    const timer = setTimeout(() => {
      speech.speak({
        text: content,
        queue: false,
      }).then(() => {
        // console.log("Speech finished");
      }).catch(e => {
        console.error("An error occurred during speech:", e);
      });
    }, 0);

    return () => {
      clearTimeout(timer);
      speech.cancel();
    };
  }, [content, speech, isInitialized, isMuted]);

  return (
    <div className="d-flex justify-content-start mb-3">
      <img
        className="me-3"
        src={geLogo}
        alt="GELogo"
        style={{ width: "auto", height: "30px" }} 
      />
      <Card className="col-9 col-lg-6 col-md-9" body>
        <span>{content}</span>
      </Card>
    </div>
  );
}


export default NegotiatorResponseCard;
