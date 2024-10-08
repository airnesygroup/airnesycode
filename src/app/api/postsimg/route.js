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
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    };

    // Group posts into 24-hour batches
    let allBatches = [];
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
        // Log the current batch before shuffling
        console.log("Current Batch Before Shuffle:", currentBatch.map(p => p.id));

        // Shuffle the current batch and add it to allBatches
        if (currentBatch.length > 0) {
          allBatches.push(shuffleArray(currentBatch));
          console.log("Current Batch After Shuffle:", allBatches[allBatches.length - 1].map(p => p.id)); // Log shuffled batch
        }

        // Reset batch and update time window
        currentBatch = [post];
        currentTime = postDate; // Set current time to the new post's date
        previousTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // Update previous time to 24 hours before current
      }
    }

    // Shuffle and add the last batch after the loop
    if (currentBatch.length > 0) {
      console.log("Last Batch Before Shuffle:", currentBatch.map(p => p.id));
      allBatches.push(shuffleArray(currentBatch));
      console.log("Last Batch After Shuffle:", allBatches[allBatches.length - 1].map(p => p.id)); // Log shuffled last batch
    }

    // Flatten the shuffled batches into one array
    const shuffledPosts = allBatches.flat();

    // Log the final shuffled posts to verify randomization
    console.log("Final Shuffled Posts:", shuffledPosts.map(p => p.id));

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

