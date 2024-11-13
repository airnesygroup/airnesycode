// pages/api/posts/[id].js
import { connectToDatabase } from '../../lib/mongodb'; // You should define this helper to connect to MongoDB

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query; // Get the post ID from the URL

  const { db } = await connectToDatabase();

  switch (method) {
    case 'DELETE':
      try {
        // Perform the deletion operation based on the ID
        const result = await db.collection('posts').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 1) {
          return res.status(200).json({ message: 'Post deleted successfully' });
        } else {
          return res.status(404).json({ message: 'Post not found' });
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        return res.status(500).json({ message: 'Failed to delete post' });
      }

    default:
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
