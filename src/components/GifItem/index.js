import React, { Component } from "react";
import { FaArrowUp } from "react-icons/fa";
import api from "../../utils/api";
import "./index.css";
export default class GifItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      voted: this.props.upvoted,
      votes: this.props.gif.data.votes
    };

    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(e) {
    e.preventDefault();
    const nodeId = e.currentTarget.dataset.id;
    if (!this.state.voted) {
      api.update(nodeId).then(response => {
        const upvotedGifs =
          JSON.parse(localStorage.getItem("upvoted_gifs")) || [];
        if (!upvotedGifs.includes(response.data.gifId))
          upvotedGifs.push(response.data.gifId);
        localStorage.setItem("upvoted_gifs", JSON.stringify(upvotedGifs));
        this.setState({ voted: true, votes: response.data.votes });
      });
    }
  }

  extractId(gif) {
    const ref = gif.ref[`@ref`];
    return ref.match(/([^\/]*)\/*$/)[0];
  }

  render() {
    const { gif } = this.props;
    return (
      <div className="gif-item">
        <div
          className="icon"
          onClick={this.handleVote}
          data-id={this.extractId(gif)}
          disabled={this.state.voted}
        >
          <FaArrowUp
            color={this.state.voted ? `orange` : `black`}
            style={{ opacity: this.state.voted ? 1 : 0.5 }}
          />
          <div className="vote-count">{this.state.votes}</div>
        </div>
        <img
          src={`https://media1.giphy.com/media/${gif.data.gifId}/giphy.gif`}
          alt=""
        />
        <h3 style={{ fontFamily: "Lora", marginLeft: "8px" }}>
          {gif.data.caption}
        </h3>
      </div>
    );
  }
}
