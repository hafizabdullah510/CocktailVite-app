import React, { useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, Link, useNavigation } from "react-router-dom";
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksRef = useRef(null);
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  const handleToggle = () => {
    setShowLinks(!showLinks);
  };
  const linksStyle = {
    height: showLinks
      ? `${linksRef.current.getBoundingClientRect().height}px`
      : "0px",
  };
  return (
    <>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <h2>CocktailDb</h2>
            <FaBars className="fa-bars" onClick={handleToggle} />
          </div>
          <div className="links-cont" style={linksStyle}>
            <div className="nav-links" ref={linksRef}>
              <Link to="/" onClick={handleToggle}>
                home
              </Link>
              <Link to="/about" onClick={handleToggle}>
                about
              </Link>
              <Link to="/newsletter" onClick={handleToggle}>
                newsletter
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {isPageLoading ? <div className="loading" /> : <Outlet />}
    </>
  );
};

export default Navbar;
