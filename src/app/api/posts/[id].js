import { getAuthSession } from "@/utils/auth"; // Assuming getAuthSession handles authentication
import prisma from "@/utils/connect"; // Assuming prisma client is connected here
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params; // Get post ID from the route params
  const session = await getAuthSession(); // Get the authenticated session

  // Check if the user is authenticated
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    // Find the post to verify if it exists and belongs to the authenticated user
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) }, // Find post by ID
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    // Check if the post belongs to the authenticated user
    if (existingPost.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "You are not authorized to delete this post!" }),
        { status: 403 }
      );
    }

    // Delete the post if authenticated and authorized
    await prisma.post.delete({
      where: { id: parseInt(id) }, // Delete the post by ID
    });

    return new NextResponse(JSON.stringify({ message: "Post deleted!" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error deleting post:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
