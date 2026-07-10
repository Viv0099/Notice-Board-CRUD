import { useState } from "react";
import { useRouter } from "next/router";

export default function AddNotice() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/notices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Notice Added Successfully");
      router.push("/");
    } else {
      alert("Failed to add notice");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h1>Add Notice</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        >
          <option>General</option>
          <option>Exam</option>
          <option>Event</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
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
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={form.image}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button type="submit">
          Save Notice
        </button>

      </form>
    </div>
  );
}