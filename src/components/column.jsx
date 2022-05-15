import React from "react";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import { Plus } from "react-bootstrap-icons";
import axios from "axios";


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
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")}; /* color changes if task is dragged over it */
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {

  handleRemove = task => {
    axios
      .delete(`https://localhost:7202/api/Todo/${task.todoId}`)
      .catch(err => {
        console.log(err);
      });
  };

  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks === this.props.tasks) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.tasks.map((task, index) => (
      <Task key={task.todoId} task={task} index={index} removeClick={this.handleRemove}/>
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
          {this.props.columnTitle}
          <Button variant="primary" id={this.props.column} onClick={() => this.handleAdd(this.props.column)} style={{ float: "right" }} className="btn-sm">
            <Plus style={{ backgroundColor: null }} />
          </Button>
        </Title>
        <Droppable
          droppableId={this.props.column}
        >
          {(provided, snapshot) => (
            <TaskList    //we need tasklist and innerlist separate so when dragging the other tasks that have no change won't render
              ref={provided.innerRef}  //provided has all the data to make a droppable function properly
              {...provided.droppableProps}  //provides the props to update DOM node
              isDraggingOver={snapshot.isDraggingOver} //for styling
            >
              <InnerList tasks={this.props.tasks} removeClick={this.props.handleRemove} />
              {provided.placeholder} 
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}