import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  //Routeコンポーネントをラップしたコンポーネントを作成
  
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return user ? <Component {...routeProps} /> : <Navigate to="/login" />;
      }}
    />
  );

};
