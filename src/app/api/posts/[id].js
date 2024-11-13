import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  const { id } = context.params; // Access params from the context object
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    // Find the post to check if it belongs to the authenticated user
    const existingPost = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    if (existingPost.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "You are not authorized to delete this post!" }),
        { status: 403 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: parseInt(id) },
    });

    return new NextResponse(JSON.stringify({ message: "Post deleted!" }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
