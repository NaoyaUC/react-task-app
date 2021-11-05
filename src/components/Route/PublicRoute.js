import { Route, Redirect } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

export const PublicRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuthContext();
  //Routeコンポーネントをラップしたコンポーネントを作成する
  // userオブジェクトがなければ、元のRouteに
  // 存在している場合は /にリダイレクトさせる
  
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        return !user ? <Component {...routeProps} /> : 
        <Redirect to="/" />;
      }}
    />
  );

};
