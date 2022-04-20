import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "../styles/add.css";

export default class Add extends React.Component {
  render() {
    return (
      <Container id="main-container" className="d-grid">
        <Form id="addform" className="text-center">
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
          <a><Button id="submitBtn" type="button" class="btn-light btn-lg">Submit</Button></a>
          <a><Button id="backBtn" type="button" class="btn btn-warning">Cancel</Button></a>
        </Form>
      </Container>
    );
  }
}
