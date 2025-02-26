import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link for navigation

interface FlippableCardProps {
  question: string;
  answer_list?: string[];
  answer?: string;
  back_title: string;
  nav_link?: string; 
  nav_link_hint?: string;
  click_here?: boolean;
  group_answer?: boolean;
}

const FlipCard: React.FC<FlippableCardProps> = ({
  question,
  answer = "",
  answer_list = [],
  back_title = "",
  nav_link = "/",
  click_here = true,
  nav_link_hint = "",
  group_answer = true,
}) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const handleFlip = () => {
    setIsFlipped(true);
  };

  return (
    <div className={`card-container ${isFlipped ? 'flipped' : ''}`} onMouseEnter={handleFlip}>
      <div className="card-wrapper">
        <Card className="card-content">
          <Card.Body className="card-front d-flex align-items-center justify-content-center fw-bold">
            <Card.Text className='fs-3 text-center'>{question}</Card.Text>
            {click_here && <Card.Text className='click-card'>Click here</Card.Text>}
          </Card.Body>
          <Card.Body className="card-back align-items-center justify-content-center">
            <Card.Text className="text-center fw-bold fs-2">{back_title}</Card.Text>

            {answer_list.length > 0 && (
              <div className="d-flex justify-content-center">
                <ul className={`${group_answer ? "list-group list-group-horizontal" : ""}`}>
                  {answer_list.map((line, index) => (
                    <li key={index} className={`${group_answer ? "list-group-item" : ""}`}>{line}</li>
                  ))}
                </ul>
              </div>
            )}

            {answer.length > 0 && (
              <Card.Text className="d-flex justify-content-center p-2">
                {answer}
              </Card.Text>
            )}

            {/* Nav link button below the answer */}
            {(nav_link !== "/") && (
              <div className="text-center mt-3">
                <Link to={nav_link}>
                  <Button variant="primary">
                    {nav_link_hint ? nav_link_hint: "Check the numbers"} 
                  </Button>
                </Link>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default FlipCard;
