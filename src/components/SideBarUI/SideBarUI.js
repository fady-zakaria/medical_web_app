import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebarui.css";

const SideBarUI = (props) => {
  // const [showSideBar, setShowSideBar] = useState(false);

  const SidebarContainerRef = useRef(null);
  const arrowRef = useRef(null);
  const arrowiconRef = useRef(null);

  useEffect(() => {
    //  const sidebarwidth = SidebarContainerRef.current.getBoundingClientRect().width;
    if (props.compact) {
      SidebarContainerRef.current.style.width = `70px`;
      arrowRef.current.style.textAlign = `center`;
      arrowiconRef.current.style.transform = `rotate(180deg)`;
    } else if (!props.compact) {
      SidebarContainerRef.current.style.width = `20.7rem`;
      arrowRef.current.style.textAlign = `right`;
      arrowiconRef.current.style.transform = `rotate(0deg)`;
    }
  }, [props.compact]);
  return (
    <div className="sidebar-container" ref={SidebarContainerRef}>
      {/* <div
      className={`${
        props.compact
          ? "sidebar-container compact-container"
          : "sidebar-container fullsidebar-container"
      }`}
      
    > */}
      {/* <button
        className="sidebar-toggle"
        onClick={() => setShowSideBar(!showSideBar)}
      >
        <i class="bi bi-list"></i>
      </button> */}
      {props.children}
      <button
        className="sidebar-toggle"
        onClick={() => props.oncompact()}
        ref={arrowRef}
      >
        <i ref={arrowiconRef} className="fas fa-chevron-left"></i>
      </button>
    </div>
  );
};

export default SideBarUI;
