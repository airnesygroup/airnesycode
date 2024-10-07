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

    // Group posts into 24-hour batches
    let currentBatch = [];
    let allBatches = [];
    let currentTime = new Date(allPosts[0].createdAt);
    let previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours earlier

    for (const post of allPosts) {
      const postDate = new Date(post.createdAt);

      // Check if the post is within the current 24-hour batch
      if (postDate >= previousTime && postDate < currentTime) {
        currentBatch.push(post);
      } else {
        // Add the current batch to allBatches and reset the time window
        if (currentBatch.length > 0) {
          allBatches.push([...currentBatch]); // Push the completed batch
        }

        // Reset the batch and update time window
        currentBatch = [post];
        currentTime = previousTime;
        previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
      }
    }

    // Add the last batch after the loop
    if (currentBatch.length > 0) {
      allBatches.push(currentBatch);
    }

    // Randomize each batch and then merge them
    let randomizedPosts = [];
    for (let batch of allBatches) {
      batch.sort(() => Math.random() - 0.5); // Shuffle the batch
      randomizedPosts = [...randomizedPosts, ...batch]; // Append the shuffled batch to the final array
    }

    // Return the final list of posts
    const totalCount = allPosts.length;
    return new NextResponse(
      JSON.stringify({ posts: randomizedPosts, count: totalCount }),
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
