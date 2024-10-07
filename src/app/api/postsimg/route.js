import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");
  const POST_PER_PAGE = 1000;

  try {
    let allPosts = [];
    let twentyFourHoursAgo = new Date();
    let postsFound = true;

    // Loop to fetch posts in 24-hour chunks until no more posts are found
    while (postsFound) {
      const endTime = twentyFourHoursAgo;
      twentyFourHoursAgo = new Date(twentyFourHoursAgo.getTime() - 24 * 60 * 60 * 1000); // Move 24 hours earlier

      // Fetch posts for the current 24-hour chunk
      const postsChunk = await prisma.post.findMany({
        take: POST_PER_PAGE,
        where: {
          ...(cat && { catSlug: cat }),
          createdAt: {
            gte: twentyFourHoursAgo, // From this 24-hour period
            lt: endTime,             // To the end of this 24-hour period
          },
        },
        include: {
          user: true, // Include user details
        },
      });

      if (postsChunk.length > 0) {
        // Randomize the posts within the chunk
        const randomizedChunk = postsChunk.sort(() => Math.random() - 0.5);

        // Add this chunk to the final list of posts
        allPosts = [...allPosts, ...randomizedChunk];
      } else {
        // No more posts found in this chunk, stop the loop
        postsFound = false;
      }
    }

    // If there are older posts beyond what has been fetched, fetch them
    const olderPosts = await prisma.post.findMany({
      take: POST_PER_PAGE,
      where: {
        ...(cat && { catSlug: cat }),
        createdAt: {
          lt: twentyFourHoursAgo, // Posts older than the last fetched 24-hour chunk
        },
      },
      include: {
        user: true, // Include user details
      },
    });

    // Randomize and append older posts if any
    const randomizedOlderPosts = olderPosts.sort(() => Math.random() - 0.5);
    allPosts = [...allPosts, ...randomizedOlderPosts];

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
