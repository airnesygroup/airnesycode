import { getAuthSession } from "@/utils/auth"; // Assuming getAuthSession handles authentication
import prisma from "@/utils/connect"; // Assuming prisma client is connected here
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const { id } = params; // Get post ID from the route params

  console.log('Delete request received for post ID:', id);

  // Step 1: Check authentication
  const session = await getAuthSession(); // Get the authenticated session
  if (!session) {
    console.log('User not authenticated');
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }
  console.log('Authenticated user:', session.user.email);

  try {
    // Step 2: Find the post
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) }, // Find post by ID
    });

    if (!existingPost) {
      console.log('Post not found for ID:', id);
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }
    console.log('Found post:', existingPost);

    // Step 3: Check if the post belongs to the authenticated user
    if (existingPost.userEmail !== session.user.email) {
      console.log('User is not authorized to delete post:', existingPost.userEmail);
      return new NextResponse(
        JSON.stringify({ message: "You are not authorized to delete this post!" }),
        { status: 403 }
      );
    }
    console.log('User is authorized to delete this post');

    // Step 4: Delete the post if everything is valid
    await prisma.post.delete({
      where: { id: parseInt(id) }, // Delete the post by ID
    });

    console.log('Post deleted successfully');
    return new NextResponse(JSON.stringify({ message: "Post deleted!" }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error occurred during deletion:', err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
