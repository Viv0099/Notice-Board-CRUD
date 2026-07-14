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
    if (!confirm("Delete this notice?")) return;

    await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    fetchNotices();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600">
            Notice Board
          </h1>

          <Link href="/add">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
              + Add Notice
            </button>
          </Link>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {notices.map((notice) => (

            <div
              key={notice.id}
              className="bg-white rounded-xl shadow-lg p-5"
            >

              {notice.image && (
                <img
                  src={notice.image}
                  alt={notice.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}

              <h2 className="text-2xl font-semibold mb-2">
                {notice.title}
              </h2>

              <p className="text-gray-600 mb-4">
                {notice.body}
              </p>

              <div className="flex justify-between mb-4">

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {notice.category}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    notice.priority === "Urgent"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {notice.priority}
                </span>

              </div>

              <div className="flex justify-between">

                <Link href={`/edit/${notice.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => deleteNotice(notice.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}