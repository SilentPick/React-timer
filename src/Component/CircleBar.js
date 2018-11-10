import React, { Component } from "react";

class CircleBar extends Component {
  render() {
    return (
      <div className="svg-wrapper">
        <svg
          width="200"
          height="200"
          viewport="0 0 100 100"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            stroke-dasharray="565.48"
            stroke-dashoffset="0"
          />
          <circle
            className="value"
            id={this.props.id}
            r="90"
            cx="100"
            cy="100"
            fill="transparent"
            stroke-dasharray="565.48"
            stroke-dashoffset={(565.48 / 60) * (60 - this.props.value)}
          />
        </svg>
        <div className="info-wrapper">
          <div className="time-left"> {this.props.value} </div>
          <div className={this.props.className}> {this.props.text} </div>
        </div>
      </div>
    );
  }
}

export default CircleBar;
