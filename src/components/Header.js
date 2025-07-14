import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="logo">GlowNest</div>
      <nav className="nav">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>Cart</Link>
        <Link to="/wishlist" className={location.pathname === "/wishlist" ? "active" : ""}>Wishlist</Link>
      </nav>
    </header>
  );
};

export default Header;
