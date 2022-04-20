import React, { Component } from "react";
import { BrowserRouter as Router, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import DroppableContext from "./DroppableContext";

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Header />
          <DroppableContext/>
        </div>
    );
  }
}
export default App;
