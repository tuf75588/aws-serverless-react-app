import React from "react";
import { Route } from "react-router-dom";

function AppliedRoute({ component: C, props: cProps, ...rest }) {
  return <Route {...rest} render={(props) => <C {...props} {...cProps} />} />;
}

export default AppliedRoute;
