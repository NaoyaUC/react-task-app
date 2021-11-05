import "firebase";
// import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "firebase";
import { useState, useEffect } from "react";

export const MemoList = () => {
  const [memos, setMemo] = useState([]);

  function getTasks() {
    db.collection("tasks")
      // .orderBy('created_at','desc')
      .get()
      .then((query) => {
        var buff = [];
        query.forEach((doc) => {
          var data = doc.data();
          buff.push({ key: doc.id, name: data.name, age: data.age });
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
      <h1>メモ一覧</h1>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>age</th>
          </tr>
        </thead>
        {memos.map((item, index) => {
          return (
            <tr key={item.key}>
              <td>
                {item.key}
              </td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <button>edit</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
