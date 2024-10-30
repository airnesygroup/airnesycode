import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  // Always set page to 1
  const page = 1;
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 4;

  // Calculate the timestamp for 24 hours ago
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  console.log("24 hours ago:", twentyFourHoursAgo.toISOString());

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1), // This will always be 0 since page is 1
        where: {
          ...(cat && { catSlug: cat }),
          createdAt: {
            gte: twentyFourHoursAgo, // Filter for posts created within the last 24 hours
          },
        },
        include: {
          user: true, // Include user details
        },
        orderBy: {
          views: "desc", // Order by most views first
        },
      }),
      prisma.post.count({
        where: {
          ...(cat && { catSlug: cat }),
          createdAt: {
            gte: twentyFourHoursAgo, // Ensure count only includes posts from the last 24 hours
          },
        },
      }),
    ]);

    console.log("Posts:", posts);
    console.log("Count:", count);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
