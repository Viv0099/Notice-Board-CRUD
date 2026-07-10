import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const { title, content, category } = req.body;

      const notice = await prisma.notice.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          content,
          category,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Unable to update notice" });
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}