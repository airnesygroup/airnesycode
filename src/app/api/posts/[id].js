// src/app/api/posts/[id].js

import { NextResponse } from 'next/server';
import prisma from '@/utils/connect'; // Assuming you're using Prisma for DB operations
import { getAuthSession } from '@/utils/auth'; // Assuming you have authentication utilities

export async function DELETE(req, { params }) {
  const session = await getAuthSession();  // Check user session (if needed)

  if (!session) {
    return NextResponse.json(
      { message: 'Not authenticated' },
      { status: 401 }
    );
  }

  const { id } = params;  // Get the post ID from URL parameter

  try {
    // Check if the post exists before attempting to delete
    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Post not found' },
        { status: 404 }
      );
    }

    // Proceed to delete the post
    await prisma.post.delete({
      where: { id: id },
    });

    return NextResponse.json(
      { message: `Post with ID ${id} has been deleted` },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Error deleting the post' },
      { status: 500 }
    );
  }
}
