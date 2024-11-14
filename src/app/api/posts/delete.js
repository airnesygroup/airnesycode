// pages/api/posts/delete.js
import prisma from "@/utils/connect";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  const { postId } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  if (!session) {
    return res.status(401).json({ message: "You must be logged in to delete a post." });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.userEmail !== session.user.email) {
      return res.status(403).json({ message: "You cannot delete someone else's post." });
    }

    await prisma.post.delete({ where: { id: postId } });

    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};
