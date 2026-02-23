import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <div className="app-shell">
      <footer className="py-3">
        <Container className="text-center muted">
          <hr></hr>
          대표 : 오대현
          <br />
          이메일 :{" "}
          <a href="mailto:ohdang5@gachon.ac.kr">ohdang5@gachon.ac.kr</a>
          <br />
          Copyright ⓒ 오대현게임연구소 Corp. All Rights Reserved.
          <br />
        </Container>
      </footer>
    </div>
  );
};
export default Footer;
