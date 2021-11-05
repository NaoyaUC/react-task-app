import "firebase";
// import { collection, getDocs } from "firebase/firestore/lite";
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

export const MemoList = () => {
  const [memos, setMemo] = useState([]);

  function getTasks() {
    db.collection("tasks")
      .orderBy("date", "desc")
      .get()
      .then((query) => {
        var buff = [];
        query.forEach((doc) => {
          var data = doc.data();
          buff.push({
            key: doc.id,
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

      <Typography component="h1" variant="h5">
        メモ一覧
      </Typography>

      <NavLink to="/memo/create">新規作成</NavLink>

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
                <TableRow key={item.key}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.memo}</TableCell>
                  <TableCell>
                    <button>edit</button>
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
