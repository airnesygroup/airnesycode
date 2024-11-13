// backend code (e.g., in your API route file)

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({
        message: "Not Authenticated!",
        error: "User is not authenticated",
      }),
      { status: 401 }
    );
  }

  const { id } = params;

  try {
    // Fetch the post to ensure it exists
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({
          message: "Post not found!",
          error: "Post does not exist in the database",
        }),
        { status: 404 }
      );
    }

    // Check if the logged-in user is the owner of the post
    if (post.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({
          message: "You are not authorized to delete this post!",
          error: "User does not own the post",
        }),
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }, { status: 200 })
    );
  } catch (err) {
    console.log(err);  // Log the full error for debugging
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
        error: err.message || "An unexpected error occurred",
      }),
      { status: 500 }
    );
  }
};
