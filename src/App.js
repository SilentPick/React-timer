import React, { Component } from "react";
import CircleBar from "./Component/CircleBar.js";

import "./App.css";

class App extends Component {
  state = {
    value: "",
    visibleTimers: ["hours", "minutes", "seconds"]
  };

  onSecondChange = e => {
    if (isNaN(e.target.value)) {
      alert("plz use number only");
      return;
    }
    this.setState({
      value: e.target.value
    });
  };

  startTimer = () => {
    clearInterval(this.timer);
    if (this.state.value === "") return;
    this.timer = setInterval(() => {
      if (this.state.value === 0) {
        clearInterval(this.timer);
        return;
      }
      this.setState({
        value: +this.state.value - 1
      });
    }, 900);
  };

  onVisibleTimersChange = e => {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ visibleTimers: value });
  };

  resetTimer = () => {
    this.setState({
      value: 0
    });
  };

  render() {
    const { visibleTimers, value } = this.state;
    return (
      <div classNameName="App">
        <div className="timer">
          {visibleTimers.includes("hours") && (
            <CircleBar
              text="hours"
              id="hours"
              className="hours-text"
              value={Math.floor(value / 3600)}
            />
          )}
          {visibleTimers.includes("minutes") && (
            <CircleBar
              text="minutes"
              id="minutes"
              className="minutes-text"
              value={Math.floor(value / 60) % 60}
            />
          )}
          {visibleTimers.includes("seconds") && (
            <CircleBar
              text="seconds"
              id="seconds"
              className="seconds-text"
              value={value % 60}
            />
          )}
        </div>
        <input
          placeholder="Enter the time in seconds"
          value={value}
          onChange={this.onSecondChange}
        />
        <button onClick={this.resetTimer}> Reset </button>
        <button onClick={this.startTimer}> Start </button>
        <select
          multiple
          size="3"
          value={visibleTimers}
          onChange={this.onVisibleTimersChange}
        >
          <option value="hours">Hours</option>
          <option value="minutes">Minutes</option>
          <option value="seconds">Seconds</option>
        </select>
        <p>Press "Ctrl" of "Shift" for multi select</p>
      </div>
    );
  }
}

export default App;
