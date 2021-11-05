import { db } from "firebase";
import { doc, deleteDoc } from "firebase/firestore";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

export const MemoDelete = (props) => {
  const { delete_id, open, setOpen } = props;
  const handleClose = () => setOpen(false);

  async function handleDelete() {
    await deleteDoc(doc(db, "tasks", delete_id));
    alert("削除しました");
    console.log(delete_id);

    //画面を閉じる?再読み込み
    handleClose();
    window.location.reload();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          削除確認
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          データを削除すると復旧することはできません。<br/>
          削除してよろしいでしょうか？
        </Typography>
        <Box sx={{ mt:3,display: "flex", justifyContent: "space-around" }}>
          <Button sx={{ mt: 2, mb: 2 }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            color="error"
          >
            削除する
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 8,
  borderRadius: 8,
  p: 2,
};
