import { Carousel } from "react-bootstrap";
import "../../../App.css";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { type Game } from "../model/game"; // 인터페이스 임포트

interface CarouselProps {
  items: Game[]; // 프롭스 타입 정의
}

const MyCarousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <Carousel
      prevIcon={
        <span aria-hidden="true" style={{ fontSize: "3rem", color: "white" }}>
          <HiArrowCircleLeft />
        </span>
      }
      nextIcon={
        <span aria-hidden="true" style={{ fontSize: "3rem", color: "white" }}>
          <HiArrowCircleRight />
        </span>
      }
    >
      {items.map((game) => (
        <Carousel.Item key={game.id}>
          <div className="carousel-item-custom">
            <img
              className="fixed-size-img"
              src={`image/${game.id}.jpg`}
              alt={game.name}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
