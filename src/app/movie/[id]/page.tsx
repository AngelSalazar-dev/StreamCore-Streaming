"use client";

import { Suspense } from "react";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/api/tmdb-client";
import { Cast } from "tmdb-ts/dist/types/credits";
import { notFound, usePathname } from "next/navigation";
import { Image } from "tmdb-ts";
import dynamic from "next/dynamic";
import { NextPage } from "next";
const PhotosSection = dynamic(() => import("@/components/ui/other/PhotosSection"));
const BackdropSection = dynamic(() => import("@/components/sections/Movie/Detail/Backdrop"));
const OverviewSection = dynamic(() => import("@/components/sections/Movie/Detail/Overview"));
const CastsSection = dynamic(() => import("@/components/sections/Movie/Detail/Casts"));
const RelatedSection = dynamic(() => import("@/components/sections/Movie/Detail/Related"));

const MovieDetailPage: NextPage = () => {
  const pathname = usePathname(); // subscribed to the router — window.location is not reactive
  // The static export only prerenders id=1, so params always say 1 — the real id is in the URL.
  const id = Number(pathname.split("/")[2]);
  // During client nav the URL can lag one render behind (id = NaN); queries wait for validId.
  const validId = Number.isFinite(id);

  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      tmdb.movies.details(id, [
        "images",
        "videos",
        "credits",
        "recommendations",
        "similar",
      ]),
    queryKey: ["movie-detail", id],
    enabled: validId,
  });

  if (!validId || isPending) {
    return <Spinner size="lg" className="absolute-center" variant="simple" />;
  }

  if (error) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Suspense fallback={<Spinner size="lg" className="absolute-center" variant="simple" />}>
        <div className="flex flex-col gap-10">
          <BackdropSection movie={movie} />
          <OverviewSection movie={movie} />
          <CastsSection casts={movie.credits.cast as Cast[]} />
          <PhotosSection images={movie.images.backdrops as Image[]} />
          <RelatedSection movie={movie} />
        </div>
      </Suspense>
    </div>
  );
};

export default MovieDetailPage;
