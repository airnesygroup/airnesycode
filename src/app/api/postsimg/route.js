import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Function to get random shuffled array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 1000; // Limit of posts fetched per 24-hour set
  const MAX_SETS = 700; // Number of 24-hour sets to fetch (e.g., 7 sets for 7 days)
  let allPosts = []; // To store all the posts from multiple 24-hour sets

  try {
    let bunchIndex = 0; // Start with the most recent 24-hour set
    let postsExist = true; // Flag to continue fetching while there are posts

    while (postsExist && bunchIndex < MAX_SETS) { // Stop when reaching the maximum sets
      // Calculate the time range for the current 24-hour period
      const now = new Date();
      const endTime = new Date(now.getTime() - bunchIndex * 24 * 60 * 60 * 1000);
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      console.log(`Fetching posts from ${startTime.toISOString()} to ${endTime.toISOString()}`);

      // Fetch posts for this 24-hour period
      const posts = await prisma.post.findMany({
        take: POST_PER_PAGE,
        where: {
          ...(cat && { catSlug: cat }),
          createdAt: {
            gte: startTime,
            lt: endTime, // Ensure posts are from this exact 24-hour period
          },
        },
        include: {
          user: true, // Include user details
        },
        orderBy: {
          createdAt: "desc", // Fetch posts ordered by latest first
        },
      });

      // If no posts were found, stop fetching
      if (posts.length === 0) {
        postsExist = false;
      } else {
        // Shuffle the posts within this 24-hour period and append to allPosts
        allPosts = allPosts.concat(shuffleArray(posts));
        bunchIndex++; // Move to the previous 24-hour set
      }
    }

    // Return the combined shuffled posts from all sets
    return new NextResponse(JSON.stringify({ posts: allPosts, count: allPosts.length }), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
