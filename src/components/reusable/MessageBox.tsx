import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import { CiMicrophoneOn } from "react-icons/ci";
import { FaMicrophoneAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

interface MessageBoxProps {
  onSendPressed: (message: string) => string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ onSendPressed }) => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); 
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleExpandClick = () => {
    setIsExpanded(true);
  };

  const handleCloseClick = () => {
    setIsExpanded(false);
    setText(""); // Clear the text input when closing
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setText(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (text.trim() !== "") {
        onSendPressed(text);
        setText("");
      }
    }
  };

  const handleMicrophoneClick = () => {
    if (!isListening) {
      
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTimeout(() => {
          onSendPressed(speechToText);
        }, 0.5);
      };

      recognition.onspeechend = () => {
        recognition.stop();
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error detected: " + event.error);
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <Form.Group>
      <InputGroup>
        <InputGroup.Text
          onClick={handleMicrophoneClick}
          style={{
            cursor: 'pointer',
            backgroundColor: isListening ? '#007bff' : '#f8f9fa',
            color: isListening ? 'white' : 'black',
            border: isFocused ? '2px solid #007bff' : '1px solid #ced4da',
            transition: 'background-color 0.3s, border 0.3s',
            textAlign: 'center'
          }}
        >
          <div>
            Speak
            {isListening ? (
              <FaMicrophoneAlt style={{ width: 'auto', height: '30px' }} />
            ) : (
              <CiMicrophoneOn style={{ width: 'auto', height: '30px' }} />
            )}
          </div>
        </InputGroup.Text>

        {/* Expand Button */}
        {!isExpanded && (
          <Button
            variant="outline-primary"
            onClick={handleExpandClick}
            className="ms-2"
            style={{
              transition: 'width 0.3s ease-out', 
              overflow: 'hidden', 
              whiteSpace: 'nowrap',
              width: isExpanded ? '100%' : '150px'
            }}
          >
            Click to type
          </Button>
        )}

        {/* Close Button */}
        {isExpanded && (
          <>
            <Form.Control
              className="p-3"
              as={TextareaAutosize}
              minRows={1}
              maxRows={5}
              placeholder="Message Negotiator"
              value={text}
              onChange={handleChange}
              style={{
                resize: 'none',
                borderRadius: '0 0.375rem 0.375rem 0',
                border: isFocused ? '2px solid #007bff' : '1px solid #ced4da',
                boxShadow: isFocused ? '0 0 5px rgba(0, 123, 255, 0.5)' : 'none',
                transition: 'width 0.3s ease-out',
              }}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={handleCloseClick}
            >
              <AiOutlineClose style={{ width: 'auto', height: '20px' }} />
            </Button>
          </>
        )}
      </InputGroup>
    </Form.Group>
  );
};

export default MessageBox;
