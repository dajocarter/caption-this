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
        <h2
          style={{
            fontFamily: "Lora",
            marginLeft: "8px",
            marginBottom: "2rem",
            borderBottom: "solid 1px #444"
          }}
        >
          {" "}
          Most Voted Gifs
        </h2>
        {this.state.gifs &&
          this.state.gifs.map(gif => (
            <div key={gif.ts}>
              <GifItem
                gif={gif}
                upvoted={upvotedGifs.includes(gif.data.gifId)}
              />
            </div>
          ))}
      </div>
    );
  }
}
