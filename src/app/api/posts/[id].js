import { MongoClient, ObjectId } from 'mongodb'; // Import ObjectId

const client = new MongoClient(process.env.DATABASE_URL); // Connect to MongoDB using the connection string from environment variables

export default async function handler(req, res) {
  // Check if the request method is DELETE
  if (req.method === 'DELETE') {
    const { id } = req.query;  // Get the post ID from the URL query parameters

    try {
      await client.connect(); // Connect to the MongoDB client
      const db = client.db(); // Get the database
      const postsCollection = db.collection('posts'); // Get the 'posts' collection

      // Attempt to delete the post from the database using the ObjectId
      const result = await postsCollection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        // If one post is deleted, respond with success
        res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        // If no post was found with that ID, respond with 404 error
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      // Catch and log any errors
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Failed to delete the post' });
    } finally {
      // Ensure the database connection is closed after the operation
      await client.close();
    }
  } else {
    // Respond with 405 Method Not Allowed if the request method is not DELETE
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
