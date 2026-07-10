import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
        title: data.title || "",
        body: data.body || "",
        category: data.category || "General",
        priority: data.priority || "Normal",
        publishDate: data.publishDate
          ? data.publishDate.split("T")[0]
          : "",
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

    const res = await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Notice Updated Successfully");
      router.push("/");
    } else {
      alert("Failed to update notice");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "30px auto",
        padding: "20px",
      }}
    >
      <h1>Edit Notice</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option>General</option>
          <option>Exam</option>
          <option>Event</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <option>Normal</option>
          <option>Urgent</option>
        </select>

        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <button type="submit">
          Update Notice
        </button>

      </form>
    </div>
  );
}