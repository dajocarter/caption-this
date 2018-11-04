import React, { Component, Fragment } from "react";
import api from "../../utils/api";
import "./index.css";

export default class GifCaption extends Component {
  constructor(props) {
    super(props);

    this.state = { gifId: null, caption: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getNextGif = this.getNextGif.bind(this);
  }

  getRandomGif() {
    return fetch(
      `https://api.giphy.com/v1/gifs/random?api_key=hkcLA4ffXS79l3c15HjsFB7676dog3jn&rating=pg-13`
    )
      .then(resp => resp.json())
      .then(response => {
        this.setState({ gifId: response.data.id, caption: "" });
      });
  }

  getNextGif() {
    this.getRandomGif();
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
    const gifData = {
      gifId,
      caption,
      votes: 1
    };
    // Use API to save gif in database
    api
      .create(gifData)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log("An API error occurred", err);
      });
    // Reload page
    window.location.reload();
  }

  render() {
    const { gifId, caption } = this.state;
    const isInvalid = caption === "";
    return (
      <Fragment>
        {gifId && (
          <div className="main-gif-wrapper">
            <div className="main-gif-wrapper">
              <div className="gif-container">
                <img
                  src={`https://media1.giphy.com/media/${gifId}/giphy.gif`}
                  alt=""
                  className="gif-caption__gif"
                />
              </div>
              <div className="next-btn">
                <button onClick={this.getNextGif}>Next</button>
              </div>
            </div>

            <form className="form" onSubmit={this.handleSubmit}>
              <div className="label">
                <label htmlFor="caption">Write a caption for this gif:</label>
              </div>
              <div className="textarea">
                <textarea
                  rows="2"
                  type="text"
                  name="caption"
                  value={caption}
                  onChange={this.handleChange}
                />
              </div>
              <div className="btn-div">
                <button
                  className="btn-submit"
                  type="submit"
                  disabled={isInvalid}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </Fragment>
    );
  }
}
