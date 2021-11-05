import { auth } from "firebase";
import { useState } from "react";
import { Link,useHistory } from "react-router-dom";

export const Login = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const LoginSubmit = async(event) => {
    event.preventDefault();

    const {email, password} = event.target.elements;

    try{
      //ログイン
      await auth.signInWithEmailAndPassword(email.value, password.value);
      //Homeにリダイレクト
      history.push("/");
    }catch(error){
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div style={{ margin: "2em" }}>
      <h1>ログイン</h1>
      <form onSubmit={LoginSubmit}>
        <div>
          <label>メールアドレス</label>
          <input name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label>パスワード</label>
          <input name="password" type="password" placeholder="password" />
        </div>
        <div>
          <button>ログイン</button>
        </div>
        {error && <p style={{ color:"red" }}>{error}</p>}
        <div>
          ユーザ登録は<Link to={"/signup"}>こちら</Link>から
        </div>
      </form>
    </div>
  );
};
