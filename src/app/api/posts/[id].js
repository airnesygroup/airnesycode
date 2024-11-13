import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId

const client = new MongoClient(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;  // Get the post ID from the URL

    try {
      await client.connect();
      const db = client.db();
      const postsCollection = db.collection('posts');
      
      // Delete the post from the database using ObjectId
      const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete the post' });
    } finally {
      await client.close();
    }
  } else {
    // Method Not Allowed for non-DELETE requests
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

