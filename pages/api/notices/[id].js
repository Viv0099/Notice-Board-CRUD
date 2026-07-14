import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  const noticeId = Number(id);

  if (isNaN(noticeId)) {
    return res.status(400).json({
      message: "Invalid notice ID",
    });
  }

  // GET single notice
  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: {
          id: noticeId,
        },
      });
      console.log("NOTICE FOUND:", notice);
      if (!notice) {
        return res.status(404).json({
          message: "Notice not found",
        });
      }

      return res.status(200).json(notice);

    } catch (error) {
      console.error("GET ERROR:", error);

      return res.status(500).json({
        message: error.message,
      });
    }
  }


  // UPDATE notice
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
          id: noticeId,
        },
        data: {
          title,
          body,
          category,
          priority,
          publishDate: publishDate
            ? new Date(publishDate)
            : undefined,
          image,
        },
      });
      console.log("NOTICE UPDATED:", notice);

      return res.status(200).json(notice);

    } catch (error) {
      console.error("PUT ERROR:", error);

      return res.status(500).json({
        message: error.message,
      });
    }
  }


  // DELETE notice
  if (req.method === "DELETE") {
    try {
      const notice = await prisma.notice.delete({
        where: {
          id: noticeId,
        },
      });


      return res.status(200).json({
        message: "Notice deleted successfully",
        notice,
      });

    } catch (error) {
      console.error("DELETE ERROR:", error);

      return res.status(500).json({
        message: error.message,
      });
    }
  }


  return res.status(405).json({
    message: "Method Not Allowed",
  });
}