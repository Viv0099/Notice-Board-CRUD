import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const noticesPerPage = 6;

  // Search + Category + Priority Filter
  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || notice.category === category;

    const matchesPriority =
      priority === "All" || notice.priority === priority;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPriority
    );
  });

  // Pagination
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice =
    indexOfLastNotice - noticesPerPage;

  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  const totalPages =
    Math.ceil(filteredNotices.length / noticesPerPage) || 1;

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

    const res = await fetch(`/api/notices/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Notice deleted successfully!");
      fetchNotices();
    } else {
      toast.error("Failed to delete notice.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-8">

        {/* Header */}
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

        {/* Search + Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">

          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg p-3"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg p-3"
          >
            <option value="All">All Categories</option>
            <option value="General">General</option>
            <option value="Exam">Exam</option>
            <option value="Event">Event</option>
            <option value="Holiday">Holiday</option>
          </select>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg p-3"
          >
            <option value="All">All Priorities</option>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>

        </div>
                {/* No Notices */}
        {filteredNotices.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No notices found.
          </p>
        ) : (
          <>
            {/* Notice Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentNotices.map((notice) => (
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}