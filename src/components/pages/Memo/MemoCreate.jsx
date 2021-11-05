// import "firebase";
import firebase from "firebase/compat/app";
// import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "firebase";
import { useState, useEffect } from "react";
import { NavLink,useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export const MemoCreate = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("title"),
    //   password: data.get("date"),
    // });
    handleCreate(data);
  };

  const histrory = useNavigate();

  async function handleCreate(data){
    const docId = db.collection("tasks").doc().id;
    // let timestamp = db.FieldValue.serverTimestamp();
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();

    console.log(timestamp);

    db.collection("tasks")
      .doc(docId)
      .set({
        docId: docId,
        title: data.get("title"),
        date: data.get("date"),
        memo: data.get("memo"),
        createdAt: timestamp,
        updatedAt: timestamp,
      });
    alert("追加しました");

    histrory("/memo");
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
                id="date"
                type="date"
                // label="日付"
                name="date"
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


// export const MemoCreate = () => {
//   const [memos, setMemo] = useState([]);

//   function getTasks() {
//     db.collection("tasks")
//       // .orderBy('created_at','desc')
//       .get()
//       .then((query) => {
//         var buff = [];
//         query.forEach((doc) => {
//           var data = doc.data();
//           buff.push({ key: doc.id, name: data.name, age: data.age });
//         });
//         // console.log(buff);
//         setMemo(buff);
//       })
//       .catch((error) => {
//         console.log(`データの取得に失敗しました (${error})`);
//       });
//   }

//   useEffect(() => {
//     getTasks();
//   }, []);

//   return (
//     <div style={{ margin: "2em" }}>
//       <h1>新規作成</h1>

//       <form>
//         <input type="text" name="" />
//         <input type="text" name="" />
//         <input type="text" name="" />
//       </form>
//     </div>
//   );
// };
