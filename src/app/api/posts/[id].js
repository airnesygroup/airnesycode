import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  const { id } = params; // Get the post ID from the URL parameters

  try {
    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }),
        { status: 404 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });

    return new NextResponse(
      JSON.stringify({ message: `Post ID ${id} has been deleted.` }),
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
