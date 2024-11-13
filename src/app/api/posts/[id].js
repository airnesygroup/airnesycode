// /src/app/api/posts/[id]/route.js

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  try {
    const postId = params.id;

    // Verify the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found!" }, { status: 404 });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json({ message: "Post deleted successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
};
