import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import Add from "./pages/Add";
import NotFound from "./pages/NotFound";
import App from "./components/App";
import { BrowserRouter, Route, Routes} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/add" element={<Add />}/>
    <Route path="/edit" element={<Add />}/>
    <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>, document.getElementById("root"));
