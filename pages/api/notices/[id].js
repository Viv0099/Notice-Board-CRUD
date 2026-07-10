import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
      }

      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notice" });
    }
  }

  if (req.method === "PUT") {
    try {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;

      const notice = await prisma.notice.update({
        where: {
          id: Number(id),
        },
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
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