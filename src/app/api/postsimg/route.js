import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    // Fetch all posts at once, ordered by creation date
    const allPosts = await prisma.post.findMany({
      where: {
        ...(cat && { catSlug: cat }),
      },
      include: {
        user: true, // Include user details
      },
      orderBy: {
        createdAt: 'desc', // Order by newest posts first
      },
    });

    // Group posts into 24-hour batches
    let currentBatch = [];
    let batchedPosts = [];
    let currentTime = new Date(allPosts[0]?.createdAt || new Date());
    let previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // Set the previous time to 24 hours earlier

    for (const post of allPosts) {
      const postDate = new Date(post.createdAt);

      // If the post is within the current 24-hour batch, add it to the current batch
      if (postDate >= previousTime && postDate < currentTime) {
        currentBatch.push(post);
      } else {
        // If moving to a new batch, randomize the current batch and push to batchedPosts
        if (currentBatch.length > 0) {
          const randomizedBatch = currentBatch.sort(() => Math.random() - 0.5);
          batchedPosts = [...batchedPosts, ...randomizedBatch];
        }

        // Reset the batch and set the new time frame
        currentBatch = [post];
        currentTime = previousTime;
        previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
      }
    }

    // Don't forget to add the last batch after the loop
    if (currentBatch.length > 0) {
      const randomizedBatch = currentBatch.sort(() => Math.random() - 0.5);
      batchedPosts = [...batchedPosts, ...randomizedBatch];
    }

    // Return the final list of posts
    const totalCount = allPosts.length;

    return new NextResponse(JSON.stringify({ posts: batchedPosts, count: totalCount }), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
