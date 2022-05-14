import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import "../styles/add.css";
import axios from "axios";
import EditHeader from "../components/EditHeader";
import AddHeader from "../components/AddHeader";
import moment from "moment";

export default class Add extends React.Component {
  constructor(props){  
    super(props);  
    this.state = {  
         title: "",
         description: "",
         dueDate: ""
      }  
    this.handleChange = this.handleChange.bind(this);  
  }
  handleChange(title,description,duedate){
    var formattedDate = moment(duedate).format('YYYY-MM-DD');
    this.setState({ title: title,  description: description, dueDate: formattedDate })
  }  
  componentDidMount() {
    if(window.location.pathname==="/edit"){
      //get id from url
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
 
      //get todo element data
      axios.get(`https://localhost:7202/api/Todo/${id}`)
                .then(res => {
                  //set todo element data into form value
                  this.handleChange( res.data.title, res.data.description, res.data.dueDate);
      })
    }
}

  handleSubmit = event => {
    event.preventDefault();
    if (window.location.pathname === "/edit"){
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id")
      const title = event.target[0].value
      const description = event.target[1].value
      const dueDate = event.target[2].value
      try {
        axios
      .put(
        `https://localhost:7202/api/Todo/EditTodo?id=${id}&title=${title}&description=${description}&dueDate=${dueDate}`
      )
        this.routeChange();
    } catch (err) {
        // Handle error
        console.log(err);
    }

    }
    else {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id")
    const title = event.target[0].value
    const description = event.target[1].value
    const dueDate = event.target[2].value
    const todo = {
      title: title,
      description: description,
      duedate : dueDate,
      columnid : id

    };

    try {
      axios({
        method: "post",
        url: "https://localhost:7202/api/Todo",
        data: todo
      })
      this.routeChange();
  } catch (err) {
      // Handle error
      console.log(err);
  }
 
  }
}

  routeChange=()=> {
    window.location.href = `/`;
  }

  render() {
    return (
      <Container id="main-container" className="d-grid">
        <Form id="addform" className="text-center needs-validation" onSubmit={this.handleSubmit} method="GET">
        {window.location.pathname !== `/add` ? <EditHeader /> : <AddHeader/>}
          <Form.Group id="tasktitle">
              <Form.Control  type="title" size="lg" defaultValue={this.state.title} placeholder="Task title" required />
          </Form.Group>
          <Form.Group id="taskdesc">
              <Form.Control type="description" size="lg" defaultValue={this.state.description} placeholder="Description" required/>
          </Form.Group>
          <Form.Group id="taskdate">
              <Form.Control type="date" size="lg" max={ "9999-12-31" } defaultValue={this.state.dueDate} required/>
          </Form.Group>
          <a><Button id="submitBtn" type="submit" className="btn-light">Submit</Button></a>
          <a><Button id="backBtn" type="button" className="btn btn-warning" onClick={this.routeChange}>Cancel</Button></a>
        </Form>
      </Container>
    );
  }
}
