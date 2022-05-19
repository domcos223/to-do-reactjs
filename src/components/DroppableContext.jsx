import React from "react";
import Column from "./Column";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default class DroppableContext extends React.Component {
  state = {
    columns: [],
  };

  componentDidMount() {
    axios.get(`https://localhost:7202/api/Column`).then((res) => {
      this.setState({ columns: res.data });
    });
  }

  onDragEnd = (result) => {
    this.setState({
      homeIndex: null,
    });
    var { destination, source, draggableId } = result; //result is an object that has these properties
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

    let start = this.state.columns[source.droppableId - 1];
    let finish = this.state.columns[destination.droppableId - 1];
    let draggedTodo = start.todos[source.index]; 
    const draggableIdParsed = parseInt(draggableId);
    let newOrderId = destination.index + 1;

    //moving inside one column
    if (start === finish) {
      const getTodos = Array.from(start.todos); 
      getTodos.splice(source.index, 1); 
      getTodos.splice(destination.index, 0, draggedTodo); 

      const reIndexedValues = {
        ...start,
        todos: getTodos,
      };

      let columns = [...this.state.columns];
      let reIndexStart = { ...columns[start.columnId - 1] };
      reIndexStart.todos = reIndexedValues.todos;
      columns[start.columnId - 1] = reIndexStart;
      axios.put(`https://localhost:7202/api/Todo/MoveTodo?destinationId=${start.columnId}&draggableId=${draggableIdParsed}&orderId=${newOrderId}`)

      this.setState({ columns: columns });
      return;
    }

    // moving from one column to another
    const startTodos = Array.from(start.todos);
    startTodos.splice(source.index, 1); //remove dragged task-id
    const newStartElements = {
      ...start,
      todos: startTodos,
    };

    const finishTodos = Array.from(finish.todos); //add dropped task to new column
    finishTodos.splice(destination.index, 0, draggedTodo);

    const newFinishElements = {
      ...finish,
      todos: finishTodos,
    };

    axios.put(
      `https://localhost:7202/api/Todo/MoveTodo?sourceId=${start.columnId}&destinationId=${finish.columnId}&draggableId=${draggableIdParsed}&orderId=${newOrderId}`
    );

    let columns = [...this.state.columns]; 
    let columnStart = { ...columns[start.columnId - 1] }; 
    columnStart.todos = newStartElements.todos; //setting todos now without the moved todo for the copy
    columns[start.columnId - 1] = columnStart; //updates value of copy

    let columnFinish = { ...columns[finish.columnId - 1] };
    columnFinish.todos = newFinishElements.todos;
    columns[finish.columnId - 1] = columnFinish;

    this.setState({ columns: columns }); //update the original columns with the new values
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
          {this.state.columns.map((columndata, index) => {
            const columnId = columndata.columnId.toString();
            const columnTitle = columndata.title;
            let tasks = columndata.todos;
            return (
              <Column
                key={index}
                column={columnId}
                columnTitle={columnTitle}
                tasks={tasks}
              />
            );
          })}
        </Container>
      </DragDropContext>
    );
  }
}
