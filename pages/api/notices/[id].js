import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  // GET
  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: { id: Number(id) },
      });

      if (!notice) {
        return res.status(404).json({ message: "Notice not found" });
      }

      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({ message: "Failed to fetch notice" });
    }
  }

  // PUT
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
        where: { id: Number(id) },
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
      return res.status(500).json({ message: "Failed to update notice" });
    }
  }

  // DELETE
  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(200).json({
        message: "Notice deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Failed to delete notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method Not Allowed",
  });
}