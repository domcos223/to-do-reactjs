import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "../styles/add.css";
import axios from "axios";
import EditHeader from "../components/EditHeader";
import AddHeader from "../components/AddHeader";

export default class Add extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    const title = event.target[0].value
    const description = event.target[1].value
    const dueDate = event.target[2].value
    const todo = {
      title: title,
      description: description,
      duedate : dueDate,
      columnid : id

    };

    console.log("A backendnek elküldtük az alábbi objektumot.")
    console.log({
      id: id,
      title: title,
      description: description,
      dueDate: dueDate
    })
  axios({
    method: "post",
    url: "https://localhost:7202/api/Todo",
    data: todo
  })
    .then(function (response) {
      //handle success
  
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
    this.routeChange();

  }

  routeChange=()=> {
    window.location.href = `/`;
  }

  render() {
    return (
      <Container id="main-container" className="d-grid">
        <Form id="addform" className="text-center" onSubmit={this.handleSubmit} method="GET">
        {window.location.pathname !== `/add` ? <EditHeader /> : <AddHeader/>}
          <Form.Group id="tasktitle">
              <Form.Control type="title" size="lg" placeholder="Task title" />
          </Form.Group>
          <Form.Group id="taskdesc">
              <Form.Control type="description" size="lg" placeholder="Description"/>
          </Form.Group>
          <Form.Group id="taskdate">
              <Form.Control type="date" size="lg"/>
          </Form.Group>
          <a><Button id="submitBtn" type="submit" className="btn-light">Submit</Button></a>
          <a><Button id="backBtn" type="button" className="btn btn-warning" onClick={this.routeChange}>Cancel</Button></a>
        </Form>
      </Container>
    );
  }
}
