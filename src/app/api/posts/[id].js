import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Post ID is required" });
  }

  if (req.method === 'GET') {
    try {
      const post = await prisma.post.findUnique({
        where: { id },
        include: { user: true },
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      return res.status(200).json(post);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong!" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
