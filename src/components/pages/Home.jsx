import { auth } from "firebase";
import { useNavigate } from "react-router";

export const Home = () => {
  //custom hooks
  const history = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    history('/login');
  }

  return (
    <div style={{ margin: "2em" }}>
      <h1>Home</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
