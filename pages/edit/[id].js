import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: "",
    image: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchNotice = async () => {
      const res = await fetch(`/api/notices/${id}`);
      const data = await res.json();

      setForm({
        title: data.title,
        body: data.body,
        category: data.category,
        priority: data.priority,
        publishDate: data.publishDate.slice(0, 10),
        image: data.image || "",
      });
    };

    fetchNotice();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    alert("Notice updated successfully!");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Edit Notice
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Body</label>
            <textarea
              name="body"
              rows="4"
              value={form.body}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">Category</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="General">General</option>
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Priority</label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

          </div>

          <div>
            <label className="block mb-2 font-medium">Publish Date</label>

            <input
              type="date"
              name="publishDate"
              value={form.publishDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Image URL</label>

            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Update Notice
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}