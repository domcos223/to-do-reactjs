import React from 'react';
import Column from './Column';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';

const Container = styled.div`
 display: flex;
 justify-content: center;
`;

export default class DroppableContext extends React.Component {
    state = {
        columns : [],
        todos: []
    }

    componentDidMount() {
        axios.get(`https://localhost:7202/api/Columns`)
        .then(res => {
            console.log(res);
            this.setState({columns: res.data})
        })
        axios.get(`https://localhost:7202/api/Todos`)
        .then(res => {
            this.setState({todos: res.data})
        })
    }
    

    onDragEnd = result => {
        this.setState({
            homeIndex: null,
        });
        const {destination, source, draggableId} = result;  //result is an object that has these properties
        //dragged out of dragdropcontext
        if (!destination) {
            return;
        }
        //dragged to the same position nothing changes
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        //
        //const start = this.state.columns[source.droppableId];
        //const finish = this.state.columns[destination.droppableId];
        let start = source.droppableId;
        let finish = destination.droppableId;
        finish = parseInt(finish);

        //dragging happens inside one column
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds); //creating a new TaskIds array to avoid mutating explicitly
            newTaskIds.splice(source.index,1); //take out the moved item from its index
            newTaskIds.splice(destination.index, 0, draggableId); //not removing anything, but inserting the new task 

        const newColumn = {
            ...start,   //has the same properties but new taskIds - we keep the old properties ! 
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,  //passing the new column object at the changed index ,changing the old 
            },
        };
        this.setState(newState); //saving the order change
        return; //TODO: call endpoint updating database after change
        }
        const res = axios({
            method: 'put',
            url: 'https://localhost:7202/api/Todos/UpdateList',
            data: {
                id: finish,
                draggedtaskid:draggableId
            }
        })

        //moving from one column to another
    //     const startTaskIds = Array.from(start.taskIds); 
    //     startTaskIds.splice(source.index, 1); //remove dragged task-id 
    //     const newStart = {
    //         ...start,
    //         taskIds: startTaskIds,
    //     };

    //     const finishTaskIds = Array.from(finish.taskIds);  //add dropped task to new column 
    //     finishTaskIds.splice(destination.index, 0, draggableId);

    //     const newFinish = {
    //         ...finish,
    //         taskIds: finishTaskIds,
    //     };

    //     const newState = {
    //         ...this.state,
    //         columns: {
    //             ...this.state.columns,
    //             [newStart.id]: newStart,
    //             [newFinish.id]: newFinish,
    //         },
    //     };
    //     this.setState(newState);
        
     };


    render() {
        
        return (  
        <DragDropContext
        onDragEnd={this.onDragEnd}
        > 
        <Container> 
         {this.state.columns.map((columndata, index) => { 
            const columnKey = columndata.id.toString();
            const columnTitle = columndata.title;
            let tasks = this.state.todos;
            tasks = tasks.filter((item) => item.columnId === columndata.id);
            return (
                <Column
                 key={index}
                 column={columnKey}
                 columnTitle = {columnTitle}
                 tasks={tasks}
                 />
            );
        })}
        </Container>
        </DragDropContext>
        
        );
    }

    
}