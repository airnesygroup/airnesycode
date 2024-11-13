// In your API route
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  try {
    const body = await req.json();
    const postId = body.id;

    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return new NextResponse(JSON.stringify({ message: "Post deleted!" }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
