import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import { db } from "firebase";
import { doc, getDoc } from "firebase/firestore";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const MemoEdit = () => {

  const { id } = useParams();
  const [load, setLoad] = useState(true);

  const [ title,setTitle] = useState('');
  const [date,setDate] = useState('');
  const [memo,setMemo] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate();
  };

  const histrory = useNavigate();

  async function getTask() {
    const docRef = doc(db, "tasks", id);
    const docSnap = await getDoc(docRef);

    if ( docSnap.exists()) {
      console.log(docSnap.data());
      const data = docSnap.data();

      setTitle(data.title);
      setMemo(data.memo);
      setDate(data.date);

      setLoad(false);
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getTask();
  }, []);

  async function handleUpdate() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();

    db.collection("tasks")
      .doc(id)
      .set({
        title: title,
        date: date,
        memo: memo,
        updatedAt: timestamp,
      });
    alert("変更しました");

    histrory("/memo");
  }

  if (load) {
    return <p></p>
  } else {
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
            編集
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="タイトル"
                  autoFocus
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="date"
                  type="date"
                  name="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="memo"
                  name="memo"
                  multiline
                  rows={4}
                  value={memo}
                  onChange={(event) => setMemo(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              更新
            </Button>
          </Box>
        </Box>
        <NavLink to="/memo/">一覧に戻る</NavLink>
      </Container>
    );
  }
};

