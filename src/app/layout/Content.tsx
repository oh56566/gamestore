import React from "react";
import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ListPage from "../../domains/catalog/pages/ListPage";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";

import HomePage from "../../domains/catalog/pages/HomePage";
import CartPage from "../../domains/cart/pages/CartPage";
import DetailPage from "../../domains/catalog/pages/DetailPage";
import LibraryPage from "../../domains/library/pages/LibraryPage";
import type { RootState } from "../store";
import AboutPage from "../../shared/pages/AboutPage";
import MobileNavigation from "../../shared/components/MobileNavigation";

const Content: React.FC = () => {
  // 현재 URL 경로를 가져옵니다. (예: "/", "/Libreary", "/Cart")
  const location = useLocation();
  const navigate = useNavigate();

  const cartItems = useSelector((state: RootState) => state.cart3.cart1);

  const cartCount = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  // 페이지 이동 시 스크롤을 맨 위로 초기화
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="app-shell">
      <Navbar
        className="ms-2 me-2"
        data-bs-theme="dark"
      >
        <Container>
          <div className="navbar-layout">
            <Navbar.Brand as={Link} to="/">
              <h1>GameStore</h1>
            </Navbar.Brand>

            <Nav className="main-nav" variant="pills">
              <Nav.Item>
                {/* Home */}
                <Nav.Link
                  as={Link}
                  to="/"
                  active={location.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                {/*상 점 */}
                <Nav.Link
                  as={Link}
                  to="/list"
                  active={
                    location.pathname.startsWith("/list") ||
                    location.pathname.startsWith("/detail")
                  }
                >
                  상점
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                {/* 라이브러리 */}
                <Nav.Link
                  as={Link}
                  to="/library"
                  active={location.pathname.startsWith("/library")}
                >
                  라이브러리
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                {/* 더보기 */}
                <Nav.Link
                  as={Link}
                  to="/about"
                  active={location.pathname.startsWith("/about")}
                >
                  지원
                </Nav.Link>
              </Nav.Item>

            </Nav>

            {/* Mobile search icon - only visible on mobile */}
            <div className="mobile-search-icon">
              <button
                type="button"
                className="btn p-0 border-0 bg-transparent"
                aria-label="게임 검색"
                onClick={() => navigate("/list")}
              >
                <FaSearch
                  style={{
                    color: "var(--text-0)",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </button>
            </div>

            <Nav className="cart-nav" variant="pills">
              <Nav.Item className="cart-accent">
                {/* 장바구니 */}
                <Nav.Link
                  as={Link}
                  to="/cart"
                  active={location.pathname.startsWith("/cart")}
                  className="d-flex align-items-center"
                >
                  <FaShoppingCart color="#ffffff" className="me-2" />
                  장바구니
                  {cartCount > 0 && (
                    <Badge pill bg="danger" className="ms-1">
                      {cartCount}
                    </Badge>
                  )}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Container>
      </Navbar>
      <div key={location.pathname} className="page-fade">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={"페이지가 존재하지 않습니다. 확인해주세요."} />
        </Routes>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNavigation />
    </div>
  );
};
export default Content;
