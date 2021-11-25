import "firebase";
import { db } from "firebase";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "components/Auth/AuthContext";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import { MemoDelete } from "./MemoDelete";
import { MemoEdit } from "./MemoEdit";
import { CreatedAt } from "components/parts/CreatedAt";
import CircularProgress from "@mui/material/CircularProgress";

import { styled } from "@mui/material/styles";



const PaperX = styled(Paper)({
  padding: 1,
  width:"100%",
  backgroundColor: "#f2fcd1"
});

export const MemoList = () => {
  const { user } = useAuthContext();
  const uid = user.uid;
  const [load, setLoad] = useState(true);
  const [memos, setMemo] = useState([]);

  //delete
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);

  //edit
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState();

  const openModal = (delete_id) => {
    setId(delete_id);
    setOpen(true);
  };

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
        <NavLink to="/memo/create">新規作成</NavLink>

        <MemoDelete delete_id={id} open={open} setOpen={setOpen} />
        <MemoEdit data={editData} open={editOpen} setOpen={setEditOpen} />

        <Grid container >
          {memos.map((item, index) => {
            return (
              <Grid item sm={12} md={2} lg={2} key={index} sx={{ p: 1 }}>
                <PaperX elevation={0}>
                  <div>
                    {item.title}
                    <CreatedAt day={item.created} />
                  </div>
                  <div>{item.memo}</div>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ my: 1, mr: 1 }}
                      color="warning"
                      onClick={() => openEditModal(item)}
                    >
                      編集
                    </Button>

                    <Button
                      variant="contained"
                      sx={{ my: 1 }}
                      color="error"
                      onClick={() => openModal(item)}
                    >
                      削除
                    </Button>
                  </div>
                </PaperX>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    );
  }
};

