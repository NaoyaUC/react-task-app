import { useAuthContext } from "components/Auth/AuthContext";
import { auth } from "firebase";
import { useHistory, Redirect} from "react-router";

export const Home = () => {
  //custom hooks
  const history = useHistory();
  const { user } = useAuthContext();
  
  const handleLogout = () => {
    auth.signOut();
    history.push('/login')
  }

  if(!user){
    return <Redirect to="/login"/>;
  }else{
    return (
    <div style={{ margin: "2em" }}>
      <h1>Home</h1>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
  }
  
};
