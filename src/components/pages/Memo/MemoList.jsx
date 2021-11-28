import "firebase";
import { db } from "firebase";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "components/Auth/AuthContext";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { MemoEdit } from "./MemoEdit";

export const MemoList = () => {
  const { user } = useAuthContext();
  const uid = user.uid;
  const [load, setLoad] = useState(true);
  const [memos, setMemo] = useState([]);

  //edit
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState();

  const openEditModal = (data) => {
    setEditData(data);
    setEditOpen(true);
  };

  useEffect(() => {
    const getTasks = () => {
      db.collection("tasks")
        .where("docId", "==", uid)
        .orderBy("createdAt", "desc")
        .limit(8)
        .get()
        .then((query) => {
          var buff = [];
          query.forEach((doc) => {
            var data = doc.data();
            buff.push({
              id: doc.id,
              created: data.createdAt,
              updated: data.updatedAt,
              title: data.title,
              memo: data.memo,
            });
          });
          // console.log(buff);
          setMemo(buff);
          setLoad(false);
        })
        .catch((error) => {
          console.log(`データの取得に失敗しました (${error})`);
        });
    };
    getTasks();
  }, [uid]);

  if (load) {
    return (
      <Container component="main">
        <CircularProgress />
      </Container>
    );
  } else {
    return (
      <Container component="main">
        <Typography
          sx={{ textAlign: "center", m: 1 }}
          component="h1"
          variant="h5"
        >
          メモ一覧
        </Typography>
        <Button variant="contained" sx={{ my: 1, mr: 1 }} color="secondary">
          <NavLink to="/memo/create" style={{ color:"#fff",textDecoration:"none" }}>新規作成</NavLink>
        </Button>

        <MemoEdit data={editData} open={editOpen} setOpen={setEditOpen} />

        <Grid container>
          {memos.map((item, index) => {
            return (
              <Grid item key={index} sx={{ p: "8px" }}>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    backgroundColor: "#fafafa",
                    borderRadius: 4,
                    padding: 1,
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => openEditModal(item)}
                >
                  <Typography variant="overline">{item.title}</Typography>
                  <div style={{}}>{item.memo}</div>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
};
