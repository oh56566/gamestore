import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGamepad, FaBook, FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { type RootState } from '../../app/store';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const cartItems = useSelector((state: RootState) => state.cart3.cart1);

  const cartCount = React.useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const navItems = [
    { path: '/', label: '홈', icon: <FaHome /> },
    { path: '/list', label: '상점', icon: <FaGamepad /> },
    { path: '/library', label: '라이브러리', icon: <FaBook /> },
    { path: '/cart', label: '장바구니', icon: <FaShoppingCart />, badge: cartCount },
  ];

  return (
    <div className="mobile-navigation">
      <Nav className="justify-content-around align-items-center">
        {navItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link
              as={Link}
              to={item.path}
              className={`mobile-nav-link ${
                location.pathname === item.path ||
                (item.path === '/list' && (location.pathname.startsWith('/list') || location.pathname.startsWith('/detail'))) ||
                (item.path === '/cart' && location.pathname.startsWith('/cart')) ||
                (item.path === '/library' && location.pathname.startsWith('/library'))
                  ? 'active'
                  : ''
              }`}
            >
              <div className="mobile-nav-icon d-flex align-items-center">
                {item.icon}
                {item.badge && item.badge > 0 ? (
                  <span className="mobile-nav-badge">{item.badge}</span>
                ) : null}
              </div>
              <div className="mobile-nav-label">{item.label}</div>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default MobileNavigation;
