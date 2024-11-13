import { prisma } from "../../../lib/prisma"; // Adjust the path to your Prisma client

export async function DELETE(req, { params }) {
  const { id } = params;  // Extract the ID from the URL parameters

  try {
    // Ensure the post exists before attempting to delete
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return new Response("Post not found", { status: 404 });
    }

    // Delete the post by ID
    await prisma.post.delete({
      where: { id },
    });

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Error deleting post", { status: 500 });
  }
}
