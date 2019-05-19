import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Routes from "./components/Routes";

const Home = React.lazy(() => import("./containers/Home"));
const Login = React.lazy(() => import("./components/Login"));
function App() {
  const [loggedIn, setAuthenticated] = useState(false);

  function userIsAuthenticated(authenticated) {
    setAuthenticated(authenticated);
  }
  const childProps = {
    isAuthenticated: loggedIn,
    userHasAuthenticated: userIsAuthenticated
  };
  console.log(childProps.isAuthenticated);
  return (
    <Router>
      <div className='container App'>
        <Navigation
          isAuthenticated={childProps.isAuthenticated}
          onNavClick={childProps.userHasAuthenticated}
        />
        <React.Suspense fallback={<div>Loading..</div>}>
          <Routes childProps={childProps} />
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
