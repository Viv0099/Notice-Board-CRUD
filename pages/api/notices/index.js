import { prisma } from "../../../lib/prisma";
import { verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {


  // GET all notices
  if (req.method === "GET") {
    try {

      const notices = await prisma.notice.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });


      return res.status(200).json(notices);


    } catch (error) {

      console.error("GET ERROR:", error);

      return res.status(500).json({
        message: error.message,
      });

    }
  }



  // CREATE notice
  if (req.method === "POST") {
    try {
      verifyToken(req);

      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;



      const notice = await prisma.notice.create({

        data: {

          title,
          body,
          category,
          priority,

          publishDate: publishDate
            ? new Date(publishDate)
            : new Date(),

          image,

        },

      });



      return res.status(201).json(notice);



    } catch (error) {

      console.error("POST ERROR:", error);
      if (
         error.message === "No token provided" || 
         error.message === "Invalid token" || 
         error.name === "JsonWebTokenError"
        ) {
        return res.status(401).json({
          message: "Unauthorized",
        });
       }

      return res.status(500).json({
        message: error.message,
      });

    }
  }



  return res.status(405).json({
    message: "Method Not Allowed",
  });

}
