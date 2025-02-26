import { useVoiceToText } from "react-speakup";

const VoiceToTextComponent = () => {
  const { startListening, stopListening, transcript, reset } = useVoiceToText();

  return (
    <div>
      <button onClick={startListening}>Start Listening</button>
      <button onClick={stopListening}>Stop Listening</button>
      <span>{transcript}</span>
      <button onClick={reset}>Reset Transcript</button>
    </div>
  );
};

export default VoiceToTextComponent; 