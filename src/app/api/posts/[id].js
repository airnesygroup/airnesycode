export const DELETE = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    const postId = req.url.split("/").pop(); // Get post ID from the URL

    // Check if the post exists
    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found!" }, { status: 404 })
      );
    }

    // Only allow the post owner to delete
    if (existingPost.userEmail !== session.user.email) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized!" }, { status: 403 })
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    return new NextResponse(JSON.stringify({ message: "Post deleted successfully" }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
