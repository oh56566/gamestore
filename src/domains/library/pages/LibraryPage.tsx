// src/domains/library/pages/LibraryPage.tsx

import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  type RootState,
  type LibraryItem,
  setSelectedLibraryItem,
  removeGameFromLibrary,
} from "../../../app/store";
import { FaPlay, FaGamepad, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import "../../../App.css";
import GlassImage from "../../catalog/components/GlassImage";
import Breadcrumb from "../../../shared/components/Breadcrumb";
const LibraryPage: React.FC = () => {
  const LibraryState = useSelector((state: RootState) => state.library);
  const libraryItems = LibraryState.items;
  const [selectedGame, setSelectedGame] = useState<LibraryItem | null>(null);
  const dispatch = useDispatch();
  const selectedItemId = LibraryState.selectedItemId;

  const startGame = () => {
    if (selectedGame) {
      Swal.fire({
        html: `<div style="text-align: center;">
        <h3><strong>[${selectedGame.name}]</strong></h3>
        <p>실행 중...</p>`,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };
  React.useEffect(() => {
    if (libraryItems.length === 0) {
      setSelectedGame(null);
      dispatch(setSelectedLibraryItem(null));
      return;
    }
    let gameToSelect: LibraryItem | undefined = undefined;
    if (selectedItemId !== null) {
      gameToSelect = libraryItems.find((g) => g.id === selectedItemId);
    }

    // C. Redux ID가 없거나 (새로고침 등), ID에 해당하는 게임을 못 찾으면, 첫 번째 아이템 선택
    if (!gameToSelect) {
      gameToSelect = libraryItems[0];
    }

    // D. 최종 선택된 게임을 로컬 상태에 반영하고, Redux 상태도 업데이트 (리스트 활성화용)
    if (gameToSelect && selectedGame?.id !== gameToSelect.id) {
      setSelectedGame(gameToSelect);
      // 선택된 게임 ID를 Redux에도 반영
      dispatch(setSelectedLibraryItem(gameToSelect.id));
    }
  }, [libraryItems, selectedItemId, dispatch, selectedGame?.id]);

  const handleItemClick = (game: LibraryItem) => {
    setSelectedGame(game);
    dispatch(setSelectedLibraryItem(game.id));
  };

  const handleDelete = (id: number, name: string) => {
    Swal.fire({
      title: "설치 제거",
      text: `설치된 [${name}] 게임을 제거할까요? 설치 제거시, 라이브러리에서 제거됩니다.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "설치 제거",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeGameFromLibrary(id));
        Swal.fire({
          title: "설치 제거",
          html: `<div style="text-align: center;">
        <p><strong>[${name}]</strong></p>
        <p>라이브러리에서 제거되었습니다.</p>`,
          icon: "success",
        });
      }
    });
  };

  if (libraryItems.length === 0) {
    return (
      <div className="App app-shell">
        <Container className="py-5">
          <Breadcrumb />
          <h2 className="mb-4 d-flex align-items-center">
            <FaGamepad className="me-2" />내 라이브러리
          </h2>
          <Alert variant="info" className="text-center">
            라이브러리가 비어 있습니다. 게임을 구매하여 채워주세요!
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="App app-shell">
      <Container className="py-5">
        <Breadcrumb />
        <h2 className="mb-4 d-flex align-items-center">
          <FaGamepad className="me-2" />내 라이브러리
        </h2>

        <Row>
          {/* 1. 왼쪽: 게임 리스트 (스크롤 가능) */}
          <Col xs={3} className="mb-4 mb-md-0">
            <h5 className="mb-1">내 게임 ({libraryItems.length})</h5>
            <ListGroup className="library-list" style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {libraryItems.map((game) => (
                <ListGroup.Item
                  key={game.id}
                  onClick={() => handleItemClick(game)}
                  active={selectedGame?.id === game.id}
                  className="library-list-item d-flex justify-content-between align-items-center"
                  action
                  variant="dark"
                >
                  <div className="list-item-truncate">{game.name}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          {/* 2. 오른쪽: 상세 정보 */}
          <Col xs={9}>
            {selectedGame ? (
              <Card text="white" className="card-lib">
                <Card.Header
                  as="h3"
                  className="py-3 d-flex justify-content-between align-items-center"
                >
                  {selectedGame.name}
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() =>
                      handleDelete(selectedGame.id, selectedGame.name)
                    }
                  >
                    <FaTrashAlt />
                  </Button>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <GlassImage
                        className="library-hero-img mb-3"
                        src={`/image/${selectedGame.id}.jpg`}
                        alt={selectedGame.name}
                      />
                      <Button
                        variant="success"
                        size="lg"
                        className="w-100 custom-hover-btn-success"
                        onClick={startGame}
                      >
                        <FaPlay className="me-2" /> 게임 실행
                      </Button>
                    </Col>
                    <Col md={6}>
                      <p className="pt-3">
                        구매일: {selectedGame.purchaseDate}
                      </p>
                      <hr />
                      <h5>설명</h5>
                      <p>{selectedGame.description}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              <Alert variant="secondary" className="text-center">
                리스트에서 게임을 선택해주세요.
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LibraryPage;
