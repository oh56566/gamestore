import React from "react";
import { Container } from "react-bootstrap";
import { AiFillCustomerService } from "react-icons/ai";
import Breadcrumb from "../components/Breadcrumb";

const AboutPage: React.FC = () => {
  return (
    <div className="App app-shell">
      <Container className="py-5">
        <Breadcrumb />
        <h2 className="mb-4 d-flex align-items-center">
          <AiFillCustomerService className="me-2 " />
          고객지원
        </h2>
        <div className="p-4 glass-panel">
          안녕하세요. 컴퓨터 공학과 202232133 오대현입니다.
        </div>
      </Container>
    </div>
  );
};
export default AboutPage;
