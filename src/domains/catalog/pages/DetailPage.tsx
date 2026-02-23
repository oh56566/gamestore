// src/domains/catalog/pages/DetailPage.tsx

import React, { useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import gamesData, { type Game } from "../model/game";
import "../../../App.css";
import Swal from "sweetalert2";
// ⭐ Redux 훅 및 액션 임포트

import { useSelector, useDispatch } from "react-redux";
import { addItem, type RootState, setSelectedLibraryItem } from "../../../app/store";
import { addRecentViewedGameId } from "../utils/recentViewed";
import GlassImage from "../components/GlassImage";
import Breadcrumb from "../../../shared/components/Breadcrumb";
import { FaArrowLeft } from "react-icons/fa";

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const gameId = id ? parseInt(id) : undefined;
  const game = gamesData.find((g) => g.id === gameId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const libraryItems = useSelector((state: RootState) => state.library.items);

  const isGameinLibrary = libraryItems.some((item) => item.id === gameId);

  useEffect(() => {
    if (gameId !== undefined) addRecentViewedGameId(gameId);
  }, [gameId]);

  const handleGoToLibrary = () => {
    if (gameId !== undefined) {
      // 현재 게임 ID를 Redux 상태에 저장
      dispatch(setSelectedLibraryItem(gameId));
      // 라이브러리 페이지로 이동
      navigate("/library");
    }
  };

  if (!game) {
    return (
      <Container className="py-5">
        <h2>게임 정보를 찾을 수 없습니다. (ID: {id})</h2>
        <Button onClick={() => navigate("/")} variant="primary">
          홈으로 돌아가기
        </Button>
      </Container>
    );
  }

  //  장바구니 추가 핸들러: Redux 액션 디스패치
  const handleAddToCart = (gameToAdd: Game) => {
    dispatch(addItem(gameToAdd)); // Game 객체 전체를 payload로 전달
    Swal.fire({
      title: "장바구니에 담겼습니다!",
      html: `<div style="text-align: center;">
        <p><strong>[${game.name}]</strong></p>
        <p>상품이 장바구니에 추가되었습니다</p>`,
      icon: "success",
      showCancelButton: true, // 취소 버튼 생성
      confirmButtonText: "장바구니로 이동",
      cancelButtonText: "쇼핑 계속하기",
      reverseButtons: true, // 버튼 순서 변경 (선택 사항)
    }).then((result) => {
      /* 사용자가 '장바구니로 이동'을 눌렀을 때만 이동 */
      if (result.isConfirmed) {
        navigate("/cart");
      }
      /* '쇼핑 계속하기'를 누르면 아무 일도 일어나지 않고 페이지에 남습니다. */
    });
  };

  const renderPrice = () => {
    if (game.price === 0) {
      return (
        <span className="custom-price-tag">
          <span className="fs-3 fw-bold">무료</span>
        </span>
      );
    }

    if (game.isOnSale && game.discountedPrice) {
      return (
        <>
          <Badge bg="success" className="me-2 fs-5">
            할인 중!
          </Badge>
          <p className="fs-3">
            <del className="text-secondary me-3 fs-5" style={{ color: 'var(--text-2)' }}>
              ₩ {game.price.toLocaleString()}원
            </del>
            <span className="custom-price-tag">
              <span className="text-success fw-bold fs-3">
                ₩ {game.discountedPrice.toLocaleString()}원
              </span>
            </span>
          </p>
        </>
      );
    }

    return (
      <p>
        <span className="custom-price-tag">
          <span className="fw-bold fs-3">
            ₩ {game.price.toLocaleString()}원
          </span>
        </span>
      </p>
    );
  };

  return (
    <div className="app-shell">
      <Container
        className="py-5 px-5 text-white glass-panel"
      >
        <Breadcrumb />
        <Row>
          <Col md={7}>
            {/* 게임 이미지 표시 */}
            <GlassImage
              className="detail-hero-img"
              src={`/image/${game.id}.jpg`}
              alt={game.name}
            />
          </Col>

          <Col md={5}>
            <div className="p-3">
              <h1 className="mb-3">{game.name}</h1>

              {/* 카테고리 표시 (배열 처리)*/}
              <p className="fs-5 d-flex align-items-center">
                카테고리:
                {game.category?.map((cat, index) => (
                  <span className="custom-category-tag ms-1" key={index}>
                    {cat}
                  </span>
                )) || <span className="ms-2">없음</span>}
              </p>

              <p className="lead mt-4">{game.description}</p>

              <p className="lead mt-4">평가: {game.star}</p>

              <hr />
              {renderPrice()}

              <hr />

              {/* 게임 목록으로 돌아가기 버튼 */}
              <Button
                variant="outline-secondary"
                className="w-100 mb-3"
                onClick={() => navigate("/list")}
              >
                <FaArrowLeft className="me-2" />
                게임 목록으로 돌아가기
              </Button>

              {isGameinLibrary ? (
                <Button
                  variant="success"
                  size="lg"
                  className="w-100 custom-hover-btn-success"
                  onClick={handleGoToLibrary}
                >
                  라이브러리에 있음
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="lg"
                  className="w-100 custom-hover-btn-success"
                  onClick={() => handleAddToCart(game)}
                >
                  장바구니에 담기
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailPage;
