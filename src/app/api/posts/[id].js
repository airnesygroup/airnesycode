import prisma from "@/utils/connect"; // Update with your actual Prisma client import

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    // Delete the post from the database using Prisma
    const deletedPost = await prisma.post.delete({
      where: { id },
    });

    return new Response(
      JSON.stringify({ message: "Post deleted successfully!", deletedPost }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete post" }),
      { status: 500 }
    );
  }
}
