import Header from "../reusable/Header";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Leva } from "leva";
import { Col, Container, Row } from "react-bootstrap";
import SimulatorPageContent from "../simulator/SimulatorPageContent";

export default function AvatarPage() {
  return (
    <main>
      <Header />
      <Loader />
      <Leva hidden />
      <Container>
        <Row>
          <Col lg={8}>    
          <Header />
          <SimulatorPageContent />
          </Col>
          <Col lg={4}>
            <Canvas shadows camera={{ position: [0, 0, 0.5], fov: 30 }} style={{ height: 600, pointerEvents: "none"}}>
              <Experience />
            </Canvas>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
