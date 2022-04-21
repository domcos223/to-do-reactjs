import React from "react";
import Task from "./task";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { Plus } from "react-bootstrap-icons";


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 5%;
  width: 220px;
  background: #efefef;
  display: flex;
  flex-direction: column;
  width: 350px;
`;
const Title = styled.h3`
  padding: 8px;
  margin: 3px;
`;
const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2 ease;
  border-radius: 5%;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.id} task={task} index={index} />
    ));
  }
}

export default class Column extends React.Component {
    handleAdd(id) {
        window.location.href = `/add?id=${id}`;
    }

  render() {
    return (
      <Container>
        <Title>
          {this.props.column.title}
          <Button variant="primary" onClick={() => this.handleAdd(this.props.column.id)} style={{ float: "right" }} className="btn-sm">
            <Plus style={{ backgroundColor: null }} />
          </Button>
        </Title>
        <Droppable
          droppableId={this.props.column.id}
          isDropDisabled={this.props.isDropDisabled}
        >
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              <InnerList tasks={this.props.tasks} />
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}