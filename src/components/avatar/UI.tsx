import { useRef } from "react";
import { useChat } from "../avatar/useChat";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

export const UI = ({ hidden, ...props }) => {
  const input = useRef();
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();

  const sendMessage = () => {
    const text = input.current.value;
    // console.log(text)
    if (!loading && !message) {
      // console.log(text)
      chat(text);
      input.current.value = "";
    }
  };
  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">Avatar Simulator</h1>
        </div>
              <div className="flex flex-col items-end justify-center gap-4">
                <button
                  onClick={() => setCameraZoomed(!cameraZoomed)}
                  className="pointer-events-auto bg-pink-500 hover:bg-pink-600  p-4 rounded-md"
                >
                  {cameraZoomed ? (
                    <FiZoomOut />

                  ) : (
                    <FiZoomIn />
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="p-4 bg-white"
                  placeholder="Type a message..."
                  ref={input}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <button
                  disabled={loading || message}
                  onClick={sendMessage}
                  className={`p-4 px-10 ${loading || message ? "cursor-not-allowed opacity-30" : ""
                    }`}
                >
                  Send
                </button>
              </div>
      </div>
    </>
  );
};
