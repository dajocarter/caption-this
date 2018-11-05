import React from "react";
import Login from "../Login";

const AppHeader = props => {
  return (
    <header className="app-header">
      <div className="app-title-wrapper">
        <div className="app-left-nav">
          <div className="app-title-text">
            <h1 className="app-title">CaptionThis!</h1>
            <Login />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
