import { NavLink } from "react-router-dom";

const style = {
  background: "#a8a8a8",
  padding: "10px",
}

const navA = {
  padding: "10px",
  textDecoration: "none",
  color : "#fff"
};

export const Footer = () => {
  return (
    <footer style={style}>
      <nav>
        {/* <NavLink to="/" style={navA}>
          HOME
        </NavLink> */}
      </nav>

      ©copyright nao_uc
    </footer>
  );
};
