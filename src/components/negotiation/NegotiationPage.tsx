import { Button, Col, Container, Row } from "react-bootstrap";
import PageContent from "../reusable/PageContent"
import Changes from "../../assets/changes.jpg";
import './negotiation.css'
import { useState } from "react";
import FlipCard from "../reusable/FlipCard";
import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const NegotiationContent = () => {

  const [flipCard] = useState([
    [{
      "question": "1. Do Your Research",
      "answer_list": [
        "Find out what your position pays.",
        "Check out salary websites and chat with your network of contacts",
        "Find out what the going rate is. After all, knowledge is money! "
      ],
      "back_title": "1. Do your Research",
      "click_here": false,
      "group_answer": false,
    },
    {
      "question": "2. Know Your Worth",
      "answer_list": [
        "It's time to show off",
        "List your skills, achievements, and factors that make you stand out",
        "Get ready to show them why they should invest in you."
      ],
      "back_title": "2. Know Your Worth",
      "group_answer": false,
      "click_here": false,
    },
    {
      "question": "3. Practice Your Pitch",
      "answer_list": [
        "Don't improvise!",
        "Practice your key points until you sound fluent and confident",
        "Consider it as your 'I'm great' speech!"
      ],
      "back_title": "3. Practice Your Pitch",
      "group_answer": false,
      "click_here": false,
    }],
    [{
      "question": "4. Stay Calm and Confident",
      "answer_list": [
        "Nervous? It's okay to be!",
        "Speak clearly, stay calm, and let your confidence speak."
      ],
      "back_title": "4. Stay Calm and Confident",
      "click_here": false,
      "group_answer": false,
    },
    {
      "question": "5. Maintain an open mindset",
      "answer_list": [
        "Maintain an open mindset",
        "Sometimes benefits, bonuses, or flexible working hours can make trading more attractive like cash!"
      ],
      "back_title": "5. Maintain an open mindset",
      "group_answer": false,
      "click_here": false,
    }],
  ]);




  return (
    <div className="min-h-content">
      <Container fluid className="negotiation-content" id="negotiation-content">
        <Row className="banner-content p-4">
          <h1>Negotiation Guide</h1>
          <Col sm={12} lg={6} className="d-flex justify-content-center align-items-center p-3">
            <div>
              <p>
                Salary negotiations don't have to be stressful. With the right approach, you can confidently ask for the salary you deserve. <br /> Here are 5 simple steps to help you negotiate like a pro and secure the salary you deserve. <br /> <br />
              </p>
              <span>Ready to get started? </span>
              <Link to="/avatar">
                <Button>
                  Meet the simulator
                </Button>
              </Link>
            </div>
          </Col>
          <Col sm={12} lg={6} className="p-4 d-flex justify-content-center align-items-center">
            <div className="background d-none d-xl-block">
              <img src={Changes} alt="AUD Changes" style={{ "borderRadius": "60%", height: "400px" }} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>
              5 Stages of Negotiation{" "}
              <a
                href="https://www.linkedin.com/pulse/5-steps-salary-negotiation-donna-hay-jones-jd-ma/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline-primary" size="sm" className="ms-2">
                  <FiExternalLink /> External Link
                </Button>
              </a>
            </h2>
          </Col>

        </Row>
        {flipCard.map((chunk, rowIndex) => (
          <Row className="p-4" key={rowIndex}>
            {chunk.map((card, colIndex) => (
              <Col key={colIndex}
                sm={12}
                lg={rowIndex === 0 ? 4 : 6}
                className="p-2"
              >
                <FlipCard {...card} />
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
};

export default function NegotiationPage() {
  return (
    <main>
      <PageContent>
        <NegotiationContent />
      </PageContent>
    </main>
  );
}
