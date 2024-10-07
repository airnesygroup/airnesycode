import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    // Fetch all posts ordered by creation date
    const allPosts = await prisma.post.findMany({
      where: {
        ...(cat && { catSlug: cat }),
      },
      include: {
        user: true, // Include user details
      },
      orderBy: {
        createdAt: "desc", // Order by newest posts first
      },
    });

    // Return if no posts found
    if (allPosts.length === 0) {
      return new NextResponse(
        JSON.stringify({ posts: [], count: 0 }),
        { status: 200 }
      );
    }

    // Helper function to shuffle an array
    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    // Group posts into 24-hour batches
    let allBatches = [];
    let currentBatch = [];
    let currentTime = new Date(allPosts[0].createdAt);
    let previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours earlier

    for (const post of allPosts) {
      const postDate = new Date(post.createdAt);

      // Check if the post is within the current 24-hour batch
      if (postDate >= previousTime && postDate < currentTime) {
        currentBatch.push(post);
      } else {
        // Shuffle and push the batch to allBatches
        if (currentBatch.length > 0) {
          allBatches.push(shuffleArray(currentBatch)); // Shuffle the batch
        }

        // Reset batch and update time window
        currentBatch = [post];
        currentTime = previousTime;
        previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
      }
    }

    // Add and shuffle the last batch after the loop
    if (currentBatch.length > 0) {
      allBatches.push(shuffleArray(currentBatch));
    }

    // Flatten the shuffled batches into one array
    const shuffledPosts = allBatches.flat();

    // Return the final list of shuffled posts
    const totalCount = allPosts.length;
    return new NextResponse(
      JSON.stringify({ posts: shuffledPosts, count: totalCount }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
