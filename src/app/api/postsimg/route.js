import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Function to get random shuffled array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  let allPosts = []; // To store all the posts from multiple 24-hour sets

  try {
    let bunchIndex = 0; // Start with the most recent 24-hour set
    let postsExist = true; // Flag to continue fetching while there are posts

    // Loop to fetch posts until no more posts are found
    while (postsExist) {
      // Calculate the time range for the current 24-hour period
      const now = new Date();
      const endTime = new Date(now.getTime() - bunchIndex * 24 * 60 * 60 * 1000);
      const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      console.log(`Fetching posts from ${startTime.toISOString()} to ${endTime.toISOString()}`);

      // Fetch posts for this 24-hour period
      const posts = await prisma.post.findMany({
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

      // If posts were found, append them to allPosts
      if (posts.length > 0) {
        allPosts = allPosts.concat(posts);
        bunchIndex++; // Move to the previous 24-hour set
      } else {
        // No more posts found, stop fetching
        postsExist = false;
      }
    }

    // Shuffle all posts before returning
    allPosts = shuffleArray(allPosts);

    // Return the combined posts from all sets
    return new NextResponse(JSON.stringify({ posts: allPosts, count: allPosts.length }), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
