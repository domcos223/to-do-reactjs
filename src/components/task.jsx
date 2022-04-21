import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { ButtonGroup } from "react-bootstrap";
import {PencilIcon, XIcon, ClockIcon} from '@primer/octicons-react'

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};

  display: flow-root;
`;


export default class Task extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          > 
          <div id="taskHolder">
            <div id="taskLine" style={{display:"flex"}}>
            {this.props.task.content}
            <ButtonGroup style={{marginLeft:"auto", alignItems:"center"}}>
            <button id="editBtn" type="button">
              <span aria-hidden="true">
              <PencilIcon size={16}/>
              </span>
            </button>
            
            <button id="deleteBtn" type="button" aria-label="Close">
              <span aria-hidden="true">
              <XIcon size={16}/>
                </span>
            </button>
            </ButtonGroup>  
            </div>
            <div id="taskDate" style={{display:"flex"}}>
            <ClockIcon size={16}>
            </ClockIcon>
            {this.props.task.dueDate}
            </div>
            </div>          
          </Container>
        )}
      </Draggable>
    );
  }
}
