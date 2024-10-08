import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const limit = parseInt(searchParams.get("limit")) || 75; // Default to 10
  const offset = parseInt(searchParams.get("offset")) || 0; // Default to 0

  try {
    // Fetch all posts ordered by creation date with pagination
    const allPosts = await prisma.post.findMany({
      where: {
        ...(cat && { catSlug: cat }),
      },
      include: {
        user: true, // Include user details if necessary
      },
      orderBy: {
        createdAt: "desc", // Order by newest posts first
      },
      take: limit,  // Limit the number of posts returned
      skip: offset, // Skip a number of posts for pagination
    });

    // Return if no posts found
    if (allPosts.length === 0) {
      return new NextResponse(
        JSON.stringify({ posts: [], count: 0 }),
        { status: 200 }
      );
    }

    // Group posts into 24-hour batches
    const allBatches = [];
    let currentBatch = [];
    let currentTime = new Date(allPosts[0].createdAt);
    let previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours earlier

    console.log("Total Posts:", allPosts.length); // Log total posts fetched

    // Iterate over posts and group them into batches
    for (const post of allPosts) {
      const postDate = new Date(post.createdAt);

      // Check if the post is within the current 24-hour batch
      if (postDate < currentTime && postDate >= previousTime) {
        currentBatch.push(post);
      } else {
        // Add the current batch to allBatches
        if (currentBatch.length > 0) {
          allBatches.push(shuffleArray(currentBatch));
        }

        // Reset batch and update time window
        currentBatch = [post];
        currentTime = postDate; // Set current time to the new post's date
        previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // Update previous time
      }
    }

    // Add the last batch
    if (currentBatch.length > 0) {
      allBatches.push(shuffleArray(currentBatch));
    }

    // Flatten the shuffled batches into one array
    const shuffledPosts = allBatches.flat();

    // Log the final shuffled posts to verify randomization
    console.log("Final Shuffled Posts:", shuffledPosts.map(p => p.id));

    // Return the final list of shuffled posts
    const totalCount = await prisma.post.count({ where: { ...(cat && { catSlug: cat }) } }); // Count total posts matching the filter
    return new NextResponse(
      JSON.stringify({ posts: shuffledPosts, count: totalCount }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: err.message || "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Helper function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
