import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  if (!data) return <p>読み込み中…</p>

  return (
    <div>
      <h1>{data.type} - {data.temperature}</h1>
      <ul>
        {data.menu_items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
