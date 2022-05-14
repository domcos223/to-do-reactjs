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
      //  console.log(res);
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
    //
    let start = this.state.columns[source.droppableId - 1];
    let finish = this.state.columns[destination.droppableId - 1];
    let draggedTodo = start.todos[draggableId - 1];

    //let start = source.droppableId; //id of the column the task was moved from
    //let finish = destination.droppableId;
    //finish = parseInt(finish);
    //console.log("Honnan: "+ start + " Hova: "+finish+" Mit: "+draggableId );

    //dragging happens inside one column
    if (start === finish) {
      const newTaskIds = Array.from(start.todos); //creating a new TaskIds array to avoid mutating explicitly
      newTaskIds.splice(source.index, 1); //take out the moved item from its index
      newTaskIds.splice(destination.index, 0, draggedTodo); //not removing anything, but inserting the new task

      const newColumn = {
        ...start, //has the same properties but new taskIds - we keep the old properties !
        todos: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.columnId - 1]: newColumn, //passing the new column object at the changed index ,changing the old
        },
      };
      this.setState(Array.from(newState)); //saving the order change, updating (?)
      return;
    }
    // const res = axios({
    //     method: 'put',
    //     url: 'https://localhost:7202/api/Todos/UpdateList',
    //     data: {
    //         id: finish,
    //         draggedtaskid:draggableId
    //     }
    // })

    // moving from one column to another
    const startTaskIds = Array.from(start.todos);
    startTaskIds.splice(source.index, 1); //remove dragged task-id
    const newStart = {
      ...start,
      todos: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.todos); //add dropped task to new column
    finishTaskIds.splice(destination.index, 0, draggedTodo);

    const newFinish = {
      ...finish,
      todos: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.columnId - 1]: newStart,
        [newFinish.columnId - 1]: newFinish,
      },
    };

    const draggableIdParsed = parseInt(draggableId);
    axios
      .put(
        `https://localhost:7202/api/Todo/MoveTodo?destinationId=${finish.columnId}&draggableId=${draggableIdParsed}`
      )
      .then((response) => {
        axios.get(`https://localhost:7202/api/Column`).then((res) => {
          //  console.log(res);
          this.setState({ columns: res.data });
        });
      });

    //this.setState({columns : newState});
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
