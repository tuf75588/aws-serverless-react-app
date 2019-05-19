import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";

const Home = React.lazy(() => import("./containers/Home"));
const Login = React.lazy(() => import("./components/Login"));
function App() {
  return (
    <Router>
      <div className='container App'>
        <Navigation />
        <React.Suspense fallback={<div>Loading..</div>}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route
              render={() => (
                <h1 className='NotFound'>Sorry, this page doesn't exist!</h1>
              )}
            />
          </Switch>
        </React.Suspense>
      </div>
    </Router>
  );
}

export default App;
