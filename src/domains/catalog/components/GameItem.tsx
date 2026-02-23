// src/domains/catalog/components/GameItem.tsx

import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { type Game } from "../model/game";
import "../../../App.css";
import { type RootState } from "../../../app/store";
import { useSelector } from "react-redux";
import GlassImage from "./GlassImage";

// GameItem 컴포넌트가 받을 props 정의 (상품 데이터)
interface GameItemProps {
  game: Game;
}
const GameItem: React.FC<GameItemProps> = ({ game }) => {
  // 상세 페이지 경로 설정
  const detailPath = `/detail/${game.id}`;

  const navigate = useNavigate();

  const libraryItems = useSelector((state: RootState) => state.library);

  const isOwned = libraryItems.items.some((item) => item.id === game.id);

  return (
    // 상품 카드를 감싸는 부트스트랩 Col을 제거하고, Card 자체만 반환하여
    // homePage에서 Row와 Col을 유연하게 배치하도록 합니다.
    <Card className="h-100 shadow-sm text-white">
      {/* 썸네일 영역 (요구 사항: Cards 사용) */}
      <GlassImage
        className="card-img"
        src={`/image/${game.id}.jpg`}
        alt={game.name}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{game.name}</Card.Title>
        <Card.Text className="mb-3 card-desc">{game.description}</Card.Text>

        {/* 가격 정보 표시 */}
        <Card.Text className="mt-auto">
          {" "}
          {/* mt-auto로 버튼과 가격 사이 간격 확보 */}
          {game.price === 0 ? (
            <span className="custom-price-tag">
              <span className="fs-5 fw-bold">무료</span>
            </span>
          ) : game.isOnSale && game.discountedPrice ? (
            <>
              {/*  "가격: " 텍스트 추가 */}
              <span className="me-2"></span>
              <del className="text-secondary me-2" style={{ color: 'var(--text-2)' }}>
                ₩ {game.price.toLocaleString()}원
              </del>
              <span className="custom-price-tag">
                <span className="text-success fw-bold fs-5">
                  ₩ {game.discountedPrice.toLocaleString()}원
                </span>
              </span>
            </>
          ) : (
            // 할인 중이 아닐 때 로직 (기존 유지)
            <span className="custom-price-tag">
              <span className="fs-5">₩ {game.price.toLocaleString()}원</span>
            </span>
          )}
        </Card.Text>

        {/* 상세 페이지로 이동하는 버튼 */}
        {isOwned ? (
          <Button
            variant="secendery"
            className="w-100 mt-1 text-white custom-hover-btn glass-btn"
            onClick={() => navigate(detailPath)}
          >
            상세 보기 (구매함)
          </Button>
        ) : (
          <Button
            variant="secendery"
            className="w-100 mt-1 text-white custom-hover-btn glass-btn"
            onClick={() => navigate(detailPath)}
          >
            상세 보기 및 구매
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default GameItem;
