import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ButtonGroup } from "react-bootstrap";
import {PencilIcon, XIcon, ClockIcon} from '@primer/octicons-react';
import moment from "moment";
import axios from "axios";


const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")}; /* if the task is dragged the color changes */
  display: flow-root;
`;


export default class Task extends React.Component {
  
  handleEdit(id) {
    window.location.href = `/edit?id=${id}`;
}
removeTodo = (e, task) => {
  e.preventDefault();

  if (this.props.removeClick) {
    this.props.removeClick(task);
  }
};


  render() {
    return (
      <Draggable draggableId={this.props.task.todoId.toString()} index={this.props.index}>
        {(provided, snapshot) => (  //snapshot is passed for styling 
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}   
            {...provided.dragHandleProps}  //to being able to move the container dragging from anywhere
            isDragging={snapshot.isDragging}
          > 
          <div id="taskHolder">
            <div id="taskLine" style={{display:"flex"}}>
            {this.props.task.title}
            <ButtonGroup style={{marginLeft:"auto", alignItems:"center"}}>
            <button id="editBtn" type="button" onClick={() => this.handleEdit(this.props.task.todoId)}>
              <span aria-hidden="true">
              <PencilIcon size={16}/>
              </span>
            </button>
            
            <button id="deleteBtn" type="button" onClick={e => this.removeTodo(e, this.props.task)}>
              <span aria-hidden="true">
              <XIcon size={16}/>
                </span>
            </button>
            </ButtonGroup>  
            </div>
            <div id="taskDate" style={{display:"flex", alignItems:"center"}}>
            <ClockIcon size={16}>
            </ClockIcon>
            {moment(this.props.task.dueDate).format('YYYY-MM-DD')}
            </div>
            </div>
          </Container>
        )}
      </Draggable>
      
    );
  }
}
