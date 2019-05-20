import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoutes";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
const Signup = React.lazy(() => import("../containers/Signup"));
const Home = React.lazy(() => import("../containers/Home"));
const Login = React.lazy(() => import("../components/Login"));
const NewNote = React.lazy(() => import("../containers/NewNote"));
const Notes = React.lazy(() => import("../containers/Notes"));
function Routes({ childProps }) {
  return (
    <Switch>
      <AppliedRoute exact path='/' component={Home} props={childProps} />
      <UnauthenticatedRoute
        path='/login'
        exact
        component={Login}
        props={childProps}
      />
      <UnauthenticatedRoute
        path='/signup'
        exact
        component={Signup}
        props={childProps}
      />
      <AuthenticatedRoute
        path='/notes/new'
        exact
        component={NewNote}
        props={childProps}
      />
      <AuthenticatedRoute
        path='/notes/:id'
        exact
        component={Notes}
        props={childProps}
      />

      <Route
        render={() => (
          <h1 className='NotFound'>Sorry, this page doesn't exist.</h1>
        )}
      />
    </Switch>
  );
}
export default Routes;
