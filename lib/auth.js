import jwt from "jsonwebtoken";

export function verifyToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("Invalid token");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
}