import React from "react";


// import { useAuthContext } from "./components/Auth/AuthContext";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../Auth/AuthContext";

const style = {
  background: "#ffb969",
  padding: "10px",
};

const navA = {
  padding: "10px",
  textDecoration: "none",
  color: "#fff",
};

export const Header = () => {
  const { user } = useAuthContext();

  return (
    <header style={style}>
      <nav>
        <NavLink to="/" style={navA}>
          HOME
        </NavLink>
        {!user ? (
          <>
            <NavLink to="/signup" style={navA}>
              会員登録
            </NavLink>
            <NavLink to="/login" style={navA}>
              log in
            </NavLink>
          </>
        ) : (
          ""
        )}

        <NavLink to="/memo" style={navA}>
          メモ一覧
        </NavLink>
      </nav>
    </header>
  );
};
