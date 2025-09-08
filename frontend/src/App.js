import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState([]); // お気に入りリストの状態

  //
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data") // FlaskのAPIエンドポイントに変更
      .then((res) => res.json()) // JSONレスポンスを解析
      .then((json) => setData(json)); // データを状態に保存
  }, []);

  // お気に入り機能を追加する場合
  const addFavorite = (item) => {
    if (!favorites.includes(item)) {
      setFavorites([...favorites, item])
    }
  }

  // データがまだロードされていない場合の処理
  if (!data) return <p>読み込み中…</p>

  return (
    <div className="flex p-4">
      {/* メニュー一覧 */}
      <div className="w-2/3">
        <h1 className="text-2xl font-bold mb-4">{data.type} - {data.temprature}</h1>
        <div className="grid grid-cols-2 gap-4">
          {data.menu_items.map((item, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <p>{item}</p>
              <button onClick={() => addFavorite(item)}
                className="mt-2 bg-green-500 text-white px-3 py-1 rounded">お気に入り追加</button>
            </div>
          ))}
        </div>
      </div>
      {/* お気に入り一覧 */}
      <div className="w-1/3 pl-4">
        <h2 className="text-xl font-semibold mb-2">お気に入り</h2>
        <ul>
          {favorites.map((fav, idx) => (
            <li key={idx} className="border-b p-2">{fav}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
