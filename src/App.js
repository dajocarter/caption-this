import React, { Component } from "react";
import AppHeader from "./components/AppHeader";
import GifCaption from "./components/GifCaption";
import "./App.css";
import GifsList from "./components/GifsList";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader />
        <GifCaption />
        <GifsList />
      </div>
    );
  }
}
