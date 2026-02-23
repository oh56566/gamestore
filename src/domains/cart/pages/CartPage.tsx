// src/domains/cart/pages/CartPage.tsx
import React from "react";
import { Container, Table, Button, Row, Col, Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItem,
  addGameToLibrary,
  type CartItem,
  type RootState,
} from "../../../app/store";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import Swal from "sweetalert2";
import Breadcrumb from "../../../shared/components/Breadcrumb";

const CartPage: React.FC = () => {
  // Redux 스토어에서 장바구니 데이터 읽어오기
  const cartItems = useSelector((state: RootState) => state.cart3.cart1);
  const dispatch = useDispatch();

  // 총액 계산 (Total Amount Selector 역할)
  const totalAmount = React.useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const handleRemove = (id: number) => {
    dispatch(removeItem(id));
  };

  const handlePurchase = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        text: "장바구니가 비어 있습니다.",
      });
      return;
    }
    const itemNames = cartItems.map((item) => item.name);
    const displayNames =
      itemNames.length > 2
        ? `${itemNames.slice(0, 2).join(", ")} 외 ${itemNames.length - 2}건`
        : itemNames.join(", ");

    // 구매한 아이템을 라이브러리에 추가
    const libraryItems = cartItems.map((item) => ({
      ...item,
      purchaseDate: new Date().toISOString(),
    }));
    dispatch(addGameToLibrary(libraryItems));
    cartItems.forEach((item) => {
      dispatch(removeItem(item.id)); // 장바구니에서 아이템 제거
    });
    Swal.fire({
      title: "결제 완료!",
      html: `
      <div style="text-align: center;">
        <p><strong>[${displayNames}]</strong></p>
        <p>총 ${
          cartItems.length
        }건, <strong>₩${totalAmount.toLocaleString()}</strong></p>
        <p>결제가 성공적으로 완료되었습니다.</p>
      </div>
    `,
      icon: "success",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="App app-shell">
        <Container className="py-5">
          <Breadcrumb />
          <h2 className="mb-4 d-flex align-items-center">
            <FaShoppingCart className="me-2" />
            장바구니
          </h2>
          <Alert variant="info" className="text-center">
            장바구니가 비어 있습니다. 상품을 담아주세요!
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
          <FaShoppingCart className="me-2" />
          장바구니
        </h2>

        {/* 장바구니 목록 테이블 */}

        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <div
              className="p-4 glass-panel"
            >
              <Table
                striped
                bordered
                hover
                responsive
                variant="dark"
                className="shadow-lg"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th className="text-center">가격</th>
                    <th className="text-center">삭제</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {cartItems.map((item: CartItem, index: number) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td className="text-end">
                        {item.price.toLocaleString()}원
                      </td>

                      {/* 삭제 버튼 */}
                      <td className="text-center">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                        >
                          <FaTrash className="d-flex align-items-center" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          {/* 총액 및 결제 버튼 */}

          <Col lg={4} md={12}>
            <div
              className="p-4 glass-panel"
            >
              <h4 className="mb-3">총 결제 금액</h4>
              <h3 className="fw-bold mb-4">{totalAmount.toLocaleString()}원</h3>
              <Button
                variant="success"
                size="lg"
                className="w-100"
                onClick={handlePurchase}
              >
                결제하기
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
