import React, { Component, Fragment } from "react";
import api from "../../utils/api";
import "./index.css";

export default class GifCaption extends Component {
  constructor(props) {
    super(props);

    this.state = { gifId: null, caption: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getRandomGif() {
    return fetch(
      `http://api.giphy.com/v1/gifs/random?api_key=2C40RpauBXJXFyrVrwNjjFSGGHlVVObw&rating=pg-13`
    )
      .then(resp => resp.json())
      .then(response => {
        this.setState({ gifId: response.data.id, caption: "" });
      });
  }

  componentDidMount() {
    this.getRandomGif();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // Form gif data
    const { gifId, caption } = this.state;
    const gifData = { gifId, caption, timestamp: new Date().getTime() * 10000 };
    // Use API to save gif in database
    api
      .create(gifData)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log("An API error occurred", err);
      });
    // Show a new gif
    this.getRandomGif();
  }

  render() {
    const { gifId, caption } = this.state;
    const isInvalid = caption === "";
    return (
      <Fragment>
        {gifId && (
          <div className="gif-caption">
            <img
              src={`https://media1.giphy.com/media/${gifId}/giphy.gif`}
              alt=""
              className="gif-caption__gif"
            />
            <form className="gif-caption__form" onSubmit={this.handleSubmit}>
              <input
                type="text"
                name="caption"
                value={caption}
                onChange={this.handleChange}
                className="gif-caption__caption"
              />
              <button
                type="submit"
                disabled={isInvalid}
                className="gif-caption__submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}
