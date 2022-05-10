import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import initialData from '../initial-data';
import "../styles/add.css";

export default class Add extends React.Component {
  state = initialData;

  handleSubmit = event => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    const title = event.target[0].value
    const description = event.target[1].value
    const createdDate = event.target[2].value

    console.log("A backendnek elküldtük az alábbi objektumot.")
    console.log({
      id: id,
      title: title,
      description: description,
      createdDate: createdDate
    })
    //fetch("POST", {
//    id: girpgripe
//  task title: event.taskTitle
//  description: event.disciption
//  })
  }

  routeChange=()=> {
    window.location.href = `/`;
  }

  render() {
    return (
      <Container id="main-container" className="d-grid">
        <Form id="addform" className="text-center" onSubmit={this.handleSubmit} method="GET">
          <h1 className="fs-3 fw-normal">Add new task</h1>
          <Form.Group id="tasktitle">
              <Form.Control type="title" size="lg" placeholder="Task title"/>
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
