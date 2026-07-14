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

    fetch(`/api/notices/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title,
          body: data.body,
          category: data.category,
          priority: data.priority,
          publishDate: data.publishDate.slice(0, 10),
          image: data.image || "",
        });
      });
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
    <div style={{ padding: "20px" }}>
      <h1>Edit Notice</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="body"
          placeholder="Body"
          value={form.body}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="General">General</option>
          <option value="Exam">Exam</option>
          <option value="Event">Event</option>
        </select>

        <br />
        <br />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="Normal">Normal</option>
          <option value="Urgent">Urgent</option>
        </select>

        <br />
        <br />

        <input
          type="date"
          name="publishDate"
          value={form.publishDate}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Update Notice</button>
      </form>
    </div>
  );
}