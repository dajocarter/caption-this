import React from 'react';
import './index.css';
export default function Report(props) {
  return (
    <form
      className="report-form"
      action="https://formspree.io/baggasumit@gmail.com"
      method="POST"
    >
      <input type="hidden" name="gifId" value={props.gifId} />
      <button className="report-button">Report</button>
    </form>
  );
}
