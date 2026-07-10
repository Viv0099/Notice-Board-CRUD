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
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h2>{notice.title}</h2>

            <p>{notice.body}</p>

            <p>
              <strong>Category:</strong> {notice.category}
            </p>

            <p>
              <strong>Priority:</strong> {notice.priority}
            </p>

            <p>
              <strong>Publish Date:</strong>{" "}
              {new Date(notice.publishDate).toLocaleDateString()}
            </p>

            {notice.image && (
              <img
                src={notice.image}
                alt={notice.title}
                width="250"
                style={{ marginBottom: "10px" }}
              />
            )}

            <br />

            <Link href={`/edit/${notice.id}`}>
              <button>Edit</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}