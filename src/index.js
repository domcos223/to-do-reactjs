import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Add from './components/Add';
import './index.css';
import DroppableContext from './components/DroppableContext';


class App extends React.Component {
    render() {
        return (
            <div>
            <Header/>
            <DroppableContext>
            </DroppableContext>
            </div>
        );
    }
    
}

{/* <BrowserRouter>
            <Route exact path="/add" component={Add}/>
        </BrowserRouter> */}

ReactDOM.render(
    <App />,
document.getElementById('root'));