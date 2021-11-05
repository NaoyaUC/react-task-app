import { auth } from "firebase";
import { useHistory} from "react-router";

export const Home = () => {
  //custom hooks
  const history = useHistory();

  const handleLogout = () => {
    auth.signOut();
    history.push('/login')
  }

  return (
    <div style={{ margin: "2em" }}>
      <h1>Home</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};
