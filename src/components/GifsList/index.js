import React, { Component } from "react";
import api from "../../utils/api";
import isLocalHost from "../../utils/isLocalHost";
import GifItem from "../GifItem";
import "./index.css";
export default class GifsList extends Component {
  state = { gifs: [] };

  componentDidMount() {
    api.readAll().then(gifs => {
      if (gifs.message === "unauthorized") {
        if (isLocalHost()) {
          alert(
            "FaunaDB key is not unauthorized. Make sure you set it in terminal session where you ran `npm start`. Visit http://bit.ly/set-fauna-key for more info"
          );
        } else {
          alert(
            "FaunaDB key is not unauthorized. Verify the key `FAUNADB_SERVER_SECRET` set in Netlify enviroment variables is correct"
          );
        }
        return false;
      }

      console.log("all gifs", gifs);
      this.setState({
        gifs: gifs
      });
    });
  }
  render() {
    const upvotedGifs = JSON.parse(localStorage.getItem("upvoted_gifs")) || [];
    console.log(upvotedGifs);
    return (
      <div className="gifs-list">
        {this.state.gifs &&
          this.state.gifs.map(gif => (
            <GifItem
              key={gif.ts}
              gif={gif}
              upvoted={upvotedGifs.includes(gif.data.gifId)}
            />
          ))}
      </div>
    );
  }
}
