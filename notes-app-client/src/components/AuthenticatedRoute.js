import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthenticatedRoute({ component: C, props: cProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        cProps.isAuthenticated ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${
              props.location.search
            }`}
          />
        )
      }
    />
  );
}
export default AuthenticatedRoute;
