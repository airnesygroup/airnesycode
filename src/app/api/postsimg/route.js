import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const POST_PER_PAGE = 1000;

  try {
    let allPosts = [];
    let currentTime = new Date();
    let postsFound = true;

    // Loop until all posts are fetched, in 24-hour chunks
    while (postsFound) {
      const endTime = currentTime;
      currentTime = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000); // Move 24 hours earlier

      // Fetch posts for the current 24-hour chunk
      const postsChunk = await prisma.post.findMany({
        take: POST_PER_PAGE,
        where: {
          ...(cat && { catSlug: cat }),
          createdAt: {
            gte: currentTime, // From this 24-hour period
            lt: endTime,      // To the end of this 24-hour period
          },
        },
        include: {
          user: true, // Include user details
        },
      });

      // Check if we found posts in this 24-hour period
      if (postsChunk.length > 0) {
        // Randomize the posts within the chunk
        const randomizedChunk = postsChunk.sort(() => Math.random() - 0.5);

        // Add this chunk to the final list of posts
        allPosts = [...allPosts, ...randomizedChunk];
      } else {
        // No posts found in this chunk, check if we are completely done
        const olderPostsCount = await prisma.post.count({
          where: {
            ...(cat && { catSlug: cat }),
            createdAt: {
              lt: currentTime, // Check if there are any posts older than current 24-hour period
            },
          },
        });

        // If no older posts exist, stop the loop
        if (olderPostsCount === 0) {
          postsFound = false;
        }
      }
    }

    // Return all posts and total count
    const totalCount = await prisma.post.count({
      where: {
        ...(cat && { catSlug: cat }),
      },
    });

    return new NextResponse(JSON.stringify({ posts: allPosts, count: totalCount }), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
