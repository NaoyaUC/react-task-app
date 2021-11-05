import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

export const PublicRoute = ({ element: Component, ...rest }) => {
  const { user } = useAuthContext();
  //Routeコンポーネントをラップしたコンポーネントを作成する
  // userオブジェクトがなければ、元のRouteに
  // 存在している場合は /にリダイレクトさせる

  console.log(user);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return !user ? <Component {...routeProps} /> : <Navigate to="/" />;
      }}
    />
  );
};
