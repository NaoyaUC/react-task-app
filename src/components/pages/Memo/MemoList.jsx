import "firebase";
import { db } from "firebase";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { MemoDelete } from "./MemoDelete";

export const MemoList = () => {
  const [memos, setMemo] = useState([]);

  const [id, setId] = useState();
  const [open, setOpen] = useState(false);

  const openModal = (delete_id) =>{
    console.log(delete_id);
    setId(delete_id);
    setOpen(true);    
  }

  function getTasks() {
    db.collection("tasks")
      .orderBy("date", "desc")
      .get()
      .then((query) => {
        var buff = [];
        query.forEach((doc) => {
          var data = doc.data();
          buff.push({
            id: doc.id,
            date: data.date,
            title: data.title,
            memo: data.memo,
          });
        });
        // console.log(buff);
        setMemo(buff);
      })
      .catch((error) => {
        console.log(`データの取得に失敗しました (${error})`);
      });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ margin: "2em" }}>
      <Typography
        sx={{ textAlign: "center", m: 1 }}
        component="h1"
        variant="h5"
      >
        メモ一覧
      </Typography>

      <NavLink to="/memo/create">新規作成</NavLink>

      <MemoDelete delete_id={id} open={open} setOpen={setOpen}/>

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
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.memo}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, mb: 2, mr: 1 }}
                      color="warning"
                      component={NavLink}
                      to={`/memo/edit/${item.id}`}
                    >
                      編集
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ mt: 2, mb: 2 }}
                      color="error"
                      onClick={()=> openModal(item.id)}
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
    </div>
  );
};
