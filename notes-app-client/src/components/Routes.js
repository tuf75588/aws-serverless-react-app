import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoutes";
const Signup = React.lazy(() => import("../containers/Signup"));
const Home = React.lazy(() => import("../containers/Home"));
const Login = React.lazy(() => import("../components/Login"));

function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute exact path='/' component={Home} props={childProps} />
      <AppliedRoute path='/signup' component={Signup} props={childProps} />
      <AppliedRoute path='/login' component={Login} props={childProps} />
      <Route
        render={() => (
          <h1 className='NotFound'>Sorry, this page doesn't exist.</h1>
        )}
      />
    </Switch>
  );
}
export default Routes;
