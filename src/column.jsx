import React from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { AlignBottom, AlignCenter, AlignMiddle, Plus } from 'react-bootstrap-icons';



const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 5%;
    width: 220px;
    background: #EFEFEF;
    display: flex;
    flex-direction: column;

`;
const Title = styled.h3`
    padding: 8px;
    margin: 3px;
`;

const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2 ease;
    border-radius: 5%;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
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
    render () {
        return this.props.tasks.map((task,index) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

export default class Column extends React.Component {
    render() {
        return (
        <Container>
            <Title>{this.props.column.title}
            <Button variant="primary" style={{float: "right"}}>
            <Plus style={{backgroundColor: "#EFEFEF",}}/>
            </Button>
            </Title>
            <Droppable
             droppableId={this.props.column.id}
             isDropDisabled={this.props.isDropDisabled}
             >
            {(provided,snapshot) => (
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