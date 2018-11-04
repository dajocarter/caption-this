import React, { Component } from "react";
import { FaArrowUp } from "react-icons/fa";
import api from "../../utils/api";
import "./index.css";
export default class GifItem extends Component {
  constructor(props) {
    super(props);

    this.state = { voted: false };

    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(e) {
    e.preventDefault();
    const nodeId = e.currentTarget.dataset.id;
    const updated = api.update(nodeId);
    console.log("UPDATED: ", updated);
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
        >
          <FaArrowUp
            color={this.state.voted ? `orange` : `black`}
            style={{ opacity: this.state.voted ? 1 : 0.5 }}
          />
          <div className="vote-count">{gif.data.votes}</div>
        </div>
        <img
          src={`https://media1.giphy.com/media/${gif.data.gifId}/giphy.gif`}
          alt=""
        />
        <h2>{gif.data.caption}</h2>
      </div>
    );
  }
}
