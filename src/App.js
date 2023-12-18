import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const menuItems = [
    "Home",
    "About",
    "Services",
    "Portfolio",
    "Contact",
    "Blog",
    // Add more items as needed
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibleItems, setVisibleItems] = useState([]);
  const [hiddenItems, setHiddenItems] = useState([]);
  const [isMoreVisible, setIsMoreVisible] = useState(true);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    updateMenuItems();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  const updateMenuItems = () => {
    const maxVisibleItems = calculateMaxVisibleItems();
    setVisibleItems(menuItems.slice(0, maxVisibleItems));
    setHiddenItems(menuItems.slice(maxVisibleItems));
  };

  const calculateMaxVisibleItems = () => {
    const breakpoint = 768;
    return windowWidth < breakpoint ? 2 : menuItems.length;
  };

  const renderMenuItems = (items) => {
    return items.map((item, index) => <li key={index}>{item}</li>);
  };

  const toggleMoreVisibility = () => {
    setIsMoreVisible(!isMoreVisible);
  };

  return (
    <div>
      <nav>
        <ul className="visible-menu">{renderMenuItems(visibleItems)}</ul>
        {hiddenItems.length > 0 && (
          <div>
            <button onClick={toggleMoreVisibility}>
              {isMoreVisible ? "Hide More" : "Show More"}
            </button>
            {isMoreVisible && (
              <ul className="hidden-menu">
                <li>More</li>
                {renderMenuItems(hiddenItems)}
              </ul>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default App;
