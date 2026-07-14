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

  const deleteNotice = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmDelete) return;

    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    fetchNotices();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Notice Board</h1>

      <Link href="/add">
        <button>Add Notice</button>
      </Link>

      <br />
      <br />

      {notices.length === 0 ? (
        <p>No notices found.</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice.id}
            style={{
              border: "1px solid #ccc",
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

            {notice.image && (
              <img
                src={notice.image}
                alt={notice.title}
                width="250"
              />
            )}

            <br />
            <br />

            <Link href={`/edit/${notice.id}`}>
              <button>Edit</button>
            </Link>

            <button
              onClick={() => deleteNotice(notice.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}