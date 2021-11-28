import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { auth } from "../../firebase";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import Alert from "@mui/material/Alert";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 12,
          padding: 2,
          marginBottom: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          ユーザ登録
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="email"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            type="email"
            value={email}
            autoFocus
            margin="normal"
            onChange={(event) => handleChangeEmail(event)}
          />

          <TextField
            name="title"
            required
            fullWidth
            type="password"
            id="password"
            label="パスワード"
            value={password}
            margin="normal"
            onChange={(event) => handleChangePassword(event)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登録
          </Button>
        </Box>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          <Link to={"/login"}>ログインはこちら</Link>
        </p>
      </Box>
    </Container>
  );
};
