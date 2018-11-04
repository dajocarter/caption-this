import React from "react";
import deployButton from "../../assets/deploy-to-netlify.svg";
import logo from "../../assets/logo.svg";
import github from "../../assets/github.svg";
import styles from "./AppHeader.css"; // eslint-disable-line

const AppHeader = props => {
  return (
    <header className="app-header">
      <div className="app-title-wrapper">
        <div className="app-left-nav">
          <div className="app-title-text">
            <h1 className="app-title">CaptionThis!</h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
