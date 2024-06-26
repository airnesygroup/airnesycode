import React from "react";

import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/ListingCard";
import Heading from "@/components/Heading";
import Navbar from "@/components/navbar";
import { getCurrentUser } from "@/services/user";
import { getFavoriteListings } from "@/services/favorite";

const FavoritesPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favorites = await getFavoriteListings();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <section className="main-container3">
<Navbar />

      <Heading title="Favorites" subtitle="List of properties you favorited!" />
      <div className=" mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 md:gap-8 gap-4 rounded-xl  ">
        {favorites.map((listing) => {
          return <ListingCard key={listing.id} data={listing} hasFavorited 
          roomCount={listing.roomCount} />;
        })}
      </div>
    </section>
  );
};

export default FavoritesPage;
