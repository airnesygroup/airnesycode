import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// DELETE API route to delete a post
export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    // Find the post to ensure it exists
    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: id },
    });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to delete post!" }),
      { status: 500 }
    );
  }
};
