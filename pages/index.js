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

  const handleDelete = async (id) => {
    if (!confirm("Delete this notice?")) return;

    const res = await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      fetchNotices();
    } else {
      alert("Delete failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        📢 Notice Board
      </h1>

      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <Link href="/add">
          <button
            style={{
              padding: "10px 20px",
              cursor: "pointer",
            }}
          >
            + Add Notice
          </button>
        </Link>
      </div>

      {notices.length === 0 ? (
        <p style={{ textAlign: "center" }}>No notices found.</p>
      ) : (
        notices.map((notice) => (
          <div
            key={notice.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
                style={{
                  width: "220px",
                  borderRadius: "8px",
                  marginTop: "10px",
                  marginBottom: "15px",
                }}
              />
            )}

            <div>
              <Link href={`/edit/${notice.id}`}>
                <button style={{ marginRight: "10px" }}>
                  Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(notice.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}