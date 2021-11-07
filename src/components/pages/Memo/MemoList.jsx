import "firebase";
import { db } from "firebase";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "components/Auth/AuthContext";

import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { MemoDelete } from "./MemoDelete";
import { CreatedAt } from "components/parts/CreatedAt";
import CircularProgress from "@mui/material/CircularProgress";
import { MemoEdit2 } from "./MemoEdit2";

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
        <MemoEdit2 data={editData} open={editOpen} setOpen={setEditOpen} />

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>作成日</TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>詳細</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {memos.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <CreatedAt day={item.created} />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.memo}</TableCell>
                    <TableCell>
                      {/* <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        color="warning"
                        component={NavLink}
                        to={`/memo/edit/${item.id}`}
                      >
                        編集
                      </Button> */}

                      <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2, mr: 1 }}
                        color="warning"
                        onClick={() => openEditModal(item)}
                      >
                        編集
                      </Button>

                      <Button
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        color="error"
                        onClick={() => openModal(item)}
                      >
                        削除
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>



      </Container>
    );
  }
};
