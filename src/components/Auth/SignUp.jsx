import { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const [error, setError] = useState("");

  const handleSubmit = async(event) => {
    event.preventDefault();
    // console.log(email, password);
    const { email, password} = event.target.elements;

    try {
      await auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.currentTarget.value);
  };

  return (
    <div>
      <h1>ユーザ登録</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            onChange={(event) => handleChangeEmail(event)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={(event) => handleChangePassword(event)}
          />
        </div>
        <div>
          <button>登録</button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
