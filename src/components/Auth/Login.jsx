import { auth } from "firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export const Login = () => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const LoginSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = event.target.elements;

    try {
      //ログイン
      await auth.signInWithEmailAndPassword(email.value, password.value);
      //Homeにリダイレクト
      history("/");
    } catch (error) {
      let msg = "";
      switch (error.code) {
        case "auth/invalid-email":
          msg = "メールアドレスの形式が間違っています";
          break;
        default:
          msg = "ログインできませんでした";
      }
      console.log(error.code);
      setError(msg);
    }
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
          ログイン
        </Typography>
        <Box component="form" noValidate onSubmit={LoginSubmit} sx={{ mt: 2 }}>
          <TextField
            name="email"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            type="email"
            autoFocus
            margin="normal"
          />

          <TextField
            name="title"
            required
            fullWidth
            type="password"
            id="password"
            label="パスワード"
            margin="normal"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            ログイン
          </Button>
          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}

          {error && <Alert severity="error">{error}</Alert>}

          <Box
            sx={{
              marginTop: 2,
            }}
          >
            ユーザ登録は<Link to={"/signup"}>こちら</Link>から
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
