import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import React from "react";

export default class Add extends React.Component {
  render() {
    return (
      <Container id="maincontainer" className="d-grid">
        <Form id="addform" className="text-center">
          <h1 className="fs-3 fw-normal">Add new task</h1>
          <Form.Group>
              <Form.Control type="title" size="lg" placeholder="Task title"/>
          </Form.Group>

          <Button>Submit</Button>
        </Form>
      </Container>
    );
  }
}
