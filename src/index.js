import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data';
import Column from './components/column';
import "./index.css";
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './components/Header';
import {BrowserRouter, Route} from "react-router-dom";
import Add from './components/Add';

const Container = styled.div`
 display: flex;
 justify-content: center;
`;

class App extends React.Component {
    state = initialData;
    

    onDragStart = start => {
        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

        this.setState({
            homeIndex,
        });
    };

    onDragEnd = result => {
        this.setState({
            homeIndex: null,
        });
        const {destination, source, draggableId} = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppable &&
            destination.index === source.index
        ) {
            return;
        }
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
            ...start,
            taskIds: newTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newColumn.id]: newColumn,
            },
        };
        this.setState(newState);
        return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1); //remove dragged task-id 
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);
        
    };


    render() {
        
        return (  
        <DragDropContext
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        >
        <Header/>
        <Container>
         {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId],
            );

            return (
                <Column
                 key={column.id}
                 column={column}
                 tasks={tasks}
                 />
            );
        })}
        </Container>
        {/* <BrowserRouter>
            <Route exact path="/add" component={Add}/>
        </BrowserRouter> */}
        </DragDropContext>
        
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));