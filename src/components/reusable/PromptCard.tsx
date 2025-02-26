import React from "react";

interface CardProps {
  header: string;
  content: string;
  onSendPressed: (message: string) => string;
}

const PromptCard: React.FC<CardProps> = ({
  header,
  content,
  onSendPressed,
}) => {
  const handleOnClick = () => {
    onSendPressed(content);
  };

  return (
    <div
      className="card p-1 ge-hover"
      style={{ maxHeight: 175, minHeight: 140 }}
      onClick={handleOnClick}
    >
      <div className="card-body d-flex align-items-center justify-content-center">
        <p className="card-text">{header}</p>
      </div>
    </div>
  );
};

export default PromptCard;
