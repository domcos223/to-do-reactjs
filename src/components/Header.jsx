import React from "react";
import "../styles/header.css";

export default class Header extends React.Component {
  render() {
  return (
    <div className="Header">
      <div className="HeaderText">
        <h2>My Task Manager</h2>
      </div>
    </div>
  );
}
};
