import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const userInfo = JSON.parse(sessionStorage.getItem("blog/user"));
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userInfo?.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
