import React, { Component } from "react";
import AppHeader from "./components/AppHeader";
import GifCaption from "./components/GifCaption";
import "./App.css";
import GifsList from "./components/GifsList";
import Login from "./components/Login";
import faunadb from "faunadb";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { faunadb_token: null, error: null, user: {} };
  }

  onAuthChange(faunadb_token) {
    console.log("app.js onAuthChange", faunadb_token);
    this.setState({ faunadb_token });
    this.client = new faunadb.Client({ secret: faunadb_token });
    console.log("onAuthChange", faunadb_token);
  }

  onError(error) {
    this.setState({ error });
  }

  updateUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <Login
          onError={this.onError.bind(this)}
          onAuthChange={this.onAuthChange.bind(this)}
          updateUser={this.updateUser.bind(this)}
        />
        <div className="container">
          <GifCaption authedUser={this.state.user} />
          <GifsList />
        </div>
      </div>
    );
  }
}
