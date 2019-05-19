import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
function App() {
  return (
    <Router>
      <div className='container App'>
        <Nav />
        <h1>Taking some notes</h1>
      </div>
    </Router>
  );
}

export default App;
