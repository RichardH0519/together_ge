import { Card } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";

interface CardProps {
  content: string;
}

const UserInputCard: React.FC<CardProps> = ({ content }) => {
  return (
    <div className="d-flex justify-content-end mb-3">
      <Card className="col-9 col-lg-6 col-md-9" body>
        {content}
      </Card>
      <FaRegUserCircle
        className="ms-3"
        style={{ width: "auto", height: "30px" }}
      />
    </div>
  );
};

export default UserInputCard;
