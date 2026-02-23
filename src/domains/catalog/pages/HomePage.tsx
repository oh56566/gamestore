import React, { useMemo } from "react";
import MyCarousel from "../components/Carousel";
import { Container, Row, Col } from "react-bootstrap";
import gamedata from "../model/game";
import GameItem from "../components/GameItem";
import { MdDiscount } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { useSelector } from "react-redux";
import { type RootState } from "../../../app/store";
import { getRecentViewedGameIds } from "../utils/recentViewed";
import Breadcrumb from "../../../shared/components/Breadcrumb";

const HomePage: React.FC = () => {
  const libraryItems = useSelector((state: RootState) => state.library.items);

  const recentViewedGames = useMemo(() => {
    const ids = getRecentViewedGameIds();
    return ids
      .map((id) => gamedata.find((g) => g.id === id))
      .filter((g): g is (typeof gamedata)[number] => Boolean(g))
      .slice(0, 3);
  }, []);

  // 통합 추천 로직
  const { carouselItems, listItems } = useMemo(() => {
    const ownedIds = libraryItems.map((item) => item.id); // 보유 아이디 추출

    let baseList = [];

    if (ownedIds.length === 0) {
      // 라이브러리 비었을 때 평점순
      baseList = [...gamedata].sort(
        (a, b) => (b.star?.length || 0) - (a.star?.length || 0)
      );
    } else {
      // 라이브러리에 게임이 있을 때 카테고리 기반 추천
      const myCats = gamedata
        .filter((g) => ownedIds.includes(g.id))
        .flatMap((g) => g.category || []);
      const uniqueCats = [...new Set(myCats)];

      baseList = gamedata
        .filter((g) => !ownedIds.includes(g.id)) // 구매한 게임은 제외
        .sort((a, b) => {
          const aMatch = a.category?.some((c) => uniqueCats.includes(c))
            ? 1
            : 0;
          const bMatch = b.category?.some((c) => uniqueCats.includes(c))
            ? 1
            : 0;
          return (
            bMatch - aMatch || (b.star?.length || 0) - (a.star?.length || 0)
          );
        });
    }

    return {
      carouselItems: baseList.slice(0, 3),
      listItems: baseList.slice(0, 3),
    };
  }, [libraryItems]);

  const sectionTitle =
    libraryItems.length > 0 ? "나의 취향 맞춤 추천" : "최고 평점";

  return (
    <div className="App app-shell">
      <Container className="py-5">
        <Breadcrumb />
        {/* 프롭스 전달 */}
        <MyCarousel items={carouselItems} />
        {recentViewedGames.length > 0 && (
          <>
            <h2 className="mb-4 d-flex align-items-center">
              <FaHistory className="me-2" />
              최근 본 게임
            </h2>
            <Row className="justify-content-center mx-0 mb-5">
              {recentViewedGames.map((product) => (
                <Col
                  xs={12}
                  md={4}
                  key={product.id}
                  className="mb-4 d-flex justify-content-center"
                >
                  <GameItem game={product} />
                </Col>
              ))}
            </Row>
          </>
        )}

        <h2 className="mb-4 d-flex align-items-center">
          <MdDiscount className="me-2" />
          {sectionTitle}
        </h2>
        <Row className="justify-content-center mx-0">
          {listItems.map((product) => (
            <Col
              xs={12}
              md={4}
              key={product.id}
              className="mb-4 d-flex justify-content-center"
            >
              <GameItem game={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
