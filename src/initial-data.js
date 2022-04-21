// import Axios from "axios";
// initialData = Axios.get(`localhost:3000/`);

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "CRUD műveletek" },
    "task-2": { id: "task-2", content: "JSON mock backend" },
    "task-3": {
      id: "task-3",
      content: "Feladatokhoz részletek (leírás,határidő)",
    },
    "task-4": { id: "task-4", content: "UI elemek a műveletekhez" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "TODO",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Postponed",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],

  buttons: {
    "addbtn-1": { id: "addbtn-1" },
  },
};

export default initialData;
