import React from "react";
import Header from "./Header";
import DroppableContext from "./DroppableContext";

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <Header />
          <DroppableContext/>
        </div>
    );
  }
}
export default App;
