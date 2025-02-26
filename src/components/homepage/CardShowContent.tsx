import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IconType } from "react-icons";
import { FiBriefcase, FiCheckCircle } from "react-icons/fi";
import { IoAccessibility } from "react-icons/io5";

interface CardContentProps {
  title: string;
  content: string;
  icon?: IconType; // Made icon optional
}

const SingleCard: React.FC<CardContentProps> = ({ title, content, icon: Icon }) => {
  return (
    <Card style={{ width: '18rem', minHeight: '10rem' }}>
      <Card.Body>
        <Card.Text className="text-center fs-1">{Icon && <Icon />}</Card.Text>
        <Card.Title className="text-center">
          {title}
        </Card.Title>
        <Card.Text className="pt-2 p-1">{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default function CarouselContent() {
  const [content] = useState<CardContentProps[]>([
    {
      title: "What Is It?",
      content: "Experience real-world negotiations in a virtual setting. Practice, improve, and master the art",
      icon: IoAccessibility,
    },
    {
      title: "Realistic Scenarios",
      content: "Negotiate in scenarios that simulated real job situations. Be ready for anything",
      icon: FiBriefcase,
    },
    {
      title: "Why Use Our Simulation?",
      content: "Boost your confidence, refine your skills.",
      icon: FiCheckCircle,

    },
    
  ]);

  return (
    <Container fluid="md" className="p-2 py-4">
      <Row>
        {content.map((obj, index) => (
          <Col key={index} className="p-2 d-flex justify-content-center align-items-center">
            <SingleCard {...obj} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
