import React from "react";
import "../styles/header.css";

export default class AddHeader extends React.Component {
  render() {
  return (
    <div className="Header">
      <div className="HeaderText">
        <h2>Add new task</h2>
      </div>
    </div>
  );
}
};