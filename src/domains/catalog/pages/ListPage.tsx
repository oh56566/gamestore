// src/domains/catalog/pages/ListPage.tsx

import React, { useState, useMemo } from "react";
import gamedata from "../model/game";
import { Container, Row, Col, Alert, Form, InputGroup } from "react-bootstrap";
import GameItem from "../components/GameItem";
import "../../../App.css";
import { useSearchParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // FaSearch 추가

import { FaListUl } from "react-icons/fa6";
import Breadcrumb from "../../../shared/components/Breadcrumb";

const ListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterCategory = searchParams.get("category") || "전체"; // 기본값 설정
  const [searchTerm, setSearchTerm] = useState(""); // 1. 실시간 검색어 상태 추가

  // 2. 통합 필터링 로직 (URL 카테고리 + 실시간 검색어)
  const filteredGames = useMemo(() => {
    return gamedata.filter((game) => {
      // 카테고리 매칭 확인
      const matchesCategory =
        filterCategory === "전체" ||
        (game.category &&
          game.category
            .map((c) => c.toLowerCase())
            .includes(filterCategory.toLowerCase()));

      // 검색어 매칭 확인 (제목)
      const matchesSearch = game.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchTerm]);

  // 3. 카테고리 목록 생성 (데이터 기반 자동 추출)
  const categories = [
    "전체",
    ...new Set(gamedata.flatMap((g) => g.category || [])),
  ].sort((a, b) => {
    // 1. "전체"는 항상 최상단
    if (a === "전체") return -1;
    if (b === "전체") return 1;

    // 2. 우선순위를 두고 싶은 태그 정의
    const priority = { "싱글 플레이": 1, "멀티 플레이": 2 };
    const aOrder = priority[a as keyof typeof priority] || 999;
    const bOrder = priority[b as keyof typeof priority] || 999;

    // 우선순위가 같다면 가나다순으로 정렬
    if (aOrder === bOrder) return a.localeCompare(b);
    return aOrder - bOrder;
  });

  // 카테고리 변경 핸들러 (URL 업데이트)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "전체") {
      setSearchParams({}); // 쿼리 파라미터 삭제
    } else {
      setSearchParams({ category: val }); // 쿼리 파라미터 업데이트
    }
  };

  return (
    <div className="App app-shell">
      <Container className="py-5">
        <Breadcrumb />
        <Row className="mb-4 g-3">
          <Col md={4}>
            <h2 className="mb-4 d-flex align-items-center">
              <FaListUl className="me-2" />
              {filterCategory === "전체"
                ? "전체 게임 목록"
                : `${filterCategory} 게임`}
            </h2>
          </Col>

          {/* 🔍 검색 및 필터 컨트롤 영역 */}

          <Col md={6}>
            <InputGroup className="shadow-sm">
              <InputGroup.Text className="glass-input-addon">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="찾으시는 게임 제목을 입력하세요..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="glass-input"
              />
            </InputGroup>
          </Col>
          <Col md={2}>
            <Form.Select
              value={filterCategory}
              onChange={handleCategoryChange}
              className="custom-select-dark"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        <div
          className="hr mb-4"
          style={{ height: "1px" }}
        ></div>

        <Row>
          {filteredGames.length > 0 ? (
            filteredGames.map((item) => (
              <Col
                md={4}
                xs={12}
                key={item.id}
                className="mb-4 d-flex justify-content-center"
              >
                <GameItem game={item} />
              </Col>
            ))
          ) : (
            <Col xs={12} className="text-center py-5">
              <Alert variant="dark">
                <p className="fs-5 mb-0">
                  해당 조건에 맞는 게임이 없습니다. 다른 검색어를 입력해 보세요!
                </p>
              </Alert>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default ListPage;
