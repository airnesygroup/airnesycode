// app/api/posts/[id]/route.js

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// DELETE endpoint to delete a post
export const DELETE = async (req, { params }) => {
  const postId = params.id;

  try {
    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
