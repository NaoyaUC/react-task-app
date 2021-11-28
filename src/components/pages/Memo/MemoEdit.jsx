import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { db } from "firebase";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { CreatedAt } from "components/parts/CreatedAt";

export const MemoEdit = (props) => {
  //propsでdataの受取
  const { data, open, setOpen } = props;

  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [editId, setId] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState({});
  const [load, setLoad] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate();
  };

  // const edit_id = data.id;
  useEffect(() => {
    const getTask = () => {
      setTitle(data.title);
      setId(data.id);
      setMemo(data.memo);
      setDate({
        created: data.created,
        updated: data.updated,
      });
      setLoad(true);
    };

    if (data) {
      getTask();
    }
  }, [data]);

  async function handleUpdate() {
    let timestamp = firebase.firestore.FieldValue.serverTimestamp();

    //エラー処理
    if (title === "") {
      alert("未入力です");
      return;
    }

    await db.collection("tasks").doc(editId).update({
      title: title,
      memo: memo,
      updatedAt: timestamp,
    });
    alert("変更しました");

    //画面を閉じる?再読み込み
    window.location.reload();
  }

  if (!load) {
    return "";
  } else {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <small>
              作成日:
              <CreatedAt day={date.created} />
              &nbsp; 更新日:
              <CreatedAt day={date.updated} />
            </small>

            <TextField
              name="title"
              required
              fullWidth
              id="title"
              autoFocus
              value={title}
              style={{ marginBottom:"2" }}
              onChange={(event) => setTitle(event.target.value)}
            />
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
            <Box
              sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}
            >
              <Button sx={{ mt: 1, mb: 1 }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="warning"
              >
                更新
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  }
};

const style = {
  position: "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 4,
  p: 2,
};
