import React, { Component } from "react";
import CircleBar from "./Component/CircleBar.js";

import "./App.css";

class App extends Component {
  state = {
    value: "",
    visibleTimers: ["hours", "minutes", "seconds"],
    timerValue: 0,
    inputValue: "",
    areaValue: ""
  };

  onSecondChange = e => {
    if (isNaN(e.target.value)) {
      alert("plz use numbers only");
      return;
    }
    this.setState({
      value: e.target.value,
      timerValue: e.target.value
    });
  };

  onInputChange = e => {
    let splitInputValue = e.target.value
      .toLowerCase()
      .split(",")
      .map(str => str.trim())
      .filter(str => ["hours", "minutes", "seconds"].includes(str));
    this.setState({
      inputValue: e.target.value,
      visibleTimers: splitInputValue,
      areaValue: splitInputValue.join("\n")
    });
  };

  onAreaChange = e => {
    let splitAreaValue = e.target.value
      .toLowerCase()
      .split("\n")
      .filter(str => ["hours", "minutes", "seconds"].includes(str));
    this.setState({
      areaValue: e.target.value,
      visibleTimers: splitAreaValue,
      inputValue: splitAreaValue
    });
  };

  startTimer = () => {
    this.date = Date.now();
    clearInterval(this.timer);
    if (this.state.value === "") return;
    this.timer = setInterval(() => {
      let timePass = Date.now() - this.date;
      let timeLeft = this.state.value - Math.floor(timePass / 1000);
      if (timeLeft <= 0) {
        clearInterval(this.timer);
        return;
      }
      this.setState({
        timerValue: timeLeft
      });
    }, 500);
  };

  onVisibleTimersChange = (e) => {
    const options = e.target.options;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    console.log(value)
    this.setState({
      visibleTimers: value,
      inputValue: value,
      areaValue: value.join("\n")
    });
  };

  resetTimer = () => {
    this.setState({
      timerValue: 0
    });
    clearInterval(this.timer);
  };

  render() {
    const {
      visibleTimers,
      value,
      timerValue,
      inputValue,
      areaValue
    } = this.state;
    return (
      <div classNameName="App">
        <div className="timer">
          {visibleTimers.includes("hours") && (
            <CircleBar
              text="hours"
              id="hours"
              className="hours-text"
              value={Math.floor(timerValue / 3600)}
            />
          )}
          {visibleTimers.includes("minutes") && (
            <CircleBar
              text="minutes"
              id="minutes"
              className="minutes-text"
              value={Math.floor(timerValue / 60) % 60}
            />
          )}
          {visibleTimers.includes("seconds") && (
            <CircleBar
              text="seconds"
              id="seconds"
              className="seconds-text"
              value={timerValue % 60}
            />
          )}
        </div>
        <input
          placeholder="Enter the time in seconds"
          value={value}
          onChange={this.onSecondChange}
        />
        <button onClick={this.resetTimer} className="control-button">
          {" "}
          Reset{" "}
        </button>
        <button onClick={this.startTimer} className="control-button">
          {" "}
          Start{" "}
        </button>
        <select
          multiple
          size="3"
          value={visibleTimers}
          onChange={this.onVisibleTimersChange}
        >
          <option key="hours" value="hours">Hours</option>
          <option key="minutes" value="minutes">Minutes</option>
          <option key="seconds" value="seconds">Seconds</option>
        </select>
        <input
          placeholder="seconds, minutes, hours"
          value={inputValue}
          onChange={this.onInputChange}
        />
        <textarea
          placeholder="seconds&#10;minutes&#10;hours"
          value={areaValue}
          onChange={this.onAreaChange}
        />
        <p>Press "Ctrl" or "Shift" for multi select</p>
      </div>
    );
  }
}

export default App;
