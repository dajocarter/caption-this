import React, { Component } from "react";

export default class GifItem extends Component {
  render() {
    const { gif } = this.props;
    return (
      <div>
        <img
          src={`https://media1.giphy.com/media/${gif.data.gifId}/giphy.gif`}
          alt=""
          className="gif-caption__gif"
        />
        <h2>{gif.data.caption}</h2>
      </div>
    );
  }
}
