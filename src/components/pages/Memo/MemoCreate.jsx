// import "firebase";
import firebase from "firebase/compat/app";
import { db } from "firebase";
import { NavLink, } from "react-router-dom";
import { useAuthContext } from "components/Auth/AuthContext";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const MemoCreate = () => {
  const { user } = useAuthContext();

  const uid = user.uid;

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleCreate(data);
  };

  async function handleCreate(data) {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();
    console.log(timestamp);

    db.collection("tasks")
      .add({
        docId: uid,
        title: data.get("title"),
        memo: data.get("memo"),
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    alert("追加しました");

    window.location = "/memo";
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          新規作成
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="タイトル"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="memo"
                label="詳細"
                name="memo"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            追加
          </Button>
        </Box>
      </Box>
      <NavLink to="/memo/">一覧に戻る</NavLink>
    </Container>
  );
}