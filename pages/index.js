import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [notices, setNotices] = useState([]);

  const fetchNotices = async () => {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <h1>Notice Board</h1>

      {/* Add this button here */}
      <Link href="/add">
        <button style={{ marginBottom: "20px" }}>
          Add Notice
        </button>
      </Link>

      {notices.length === 0 ? (
        <p>No notices found</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
            }}
          >
            <h3>{notice.title}</h3>
            <p>{notice.body}</p>
            <p>Category: {notice.category}</p>

            <Link href={`/edit/${notice.id}`}>
            <button>Edit</button>
            </Link>
          </div>
        ))
      )}

    </div>
  );
}