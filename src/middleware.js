import { NextResponse } from 'next/server';

export async function middleware(req) {
  // Use Vercel's edge geolocation to get the user's location
  const geo = req.geo;

  // You can log or use geo object properties to debug or confirm the values
  console.log(geo); // Will log location details such as city, country, continent, etc.

  // Add location data to the request headers or as a cookie
  const locationData = {
    city: geo.city || 'Unknown',
    country: geo.country || 'Unknown',
    continent: geo.continent || 'Unknown',
  };

  // Attach location information to the request headers
  const response = NextResponse.next();
  response.headers.set('X-Location-Data', JSON.stringify(locationData));

  return response;
}

// Apply middleware to all routes or specific ones (e.g., `/api/posts`)
export const config = {
  matcher: ['/api/posts', '/'],
};
