import { connectToDatabase } from "../../../lib/mongodb"; // Your MongoDB connection utility
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb"; // Assuming you're using MongoDB's ObjectId

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === "DELETE") {
    try {
      // Connect to the database
      const { db } = await connectToDatabase();

      // Get the session to verify the user
      const session = await getSession({ req });

      // Check if the user is logged in
      if (!session) {
        return res.status(401).json({ message: "You need to be logged in to delete a post" });
      }

      // Fetch the post from the database by id
      const post = await db.collection("posts").findOne({ _id: new ObjectId(id) });

      // Check if the post exists
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the logged-in user is the owner of the post
      if (post.userEmail !== session.user.email) {
        return res.status(403).json({ message: "You are not authorized to delete this post" });
      }

      // Delete the post
      const result = await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(500).json({ message: "Failed to delete post" });
      }

      return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An unexpected error occurred" });
    }
  } else {
    res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}

