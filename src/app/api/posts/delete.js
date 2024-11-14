// pages/api/posts/delete.js
import prisma from "@/utils/connect"; // Assuming prisma is set up for DB access
import { getSession } from "next-auth/react"; // To get the session of the currently logged-in user
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const session = await getSession({ req });
  const { postId } = req.query;

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "You must be logged in to delete a post." }),
      { status: 401 }
    );
  }

  try {
    // Find the post to be deleted
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    // If no post is found
    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found." }),
        { status: 404 }
      );
    }

    // Check if the logged-in user is the one who created the post
    if (post.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "You cannot delete someone else's post." }),
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully." }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
               