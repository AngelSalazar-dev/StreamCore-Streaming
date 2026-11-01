"use client";

import { tmdb } from "@/api/tmdb-client";
import { getMovieLastPosition } from "@/actions/histories";
import MoviePlayer from "@/components/sections/Movie/Player/Player";
import { isEmpty } from "@/utils/helpers";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { notFound, usePathname } from "next/navigation";

const MoviePlayerPage: NextPage = () => {
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
    queryFn: () => tmdb.movies.details(id),
    queryKey: ["movie-player-detail", id],
    enabled: validId,
  });

  const { data: startAt, isPending: isPendingStartAt } = useQuery({
    queryFn: () => getMovieLastPosition(id),
    queryKey: ["movie-player-start-at", id],
    enabled: validId,
    staleTime: 0,
  });

  if (!validId || isPending || isPendingStartAt) {
    return <Spinner size="lg" className="absolute-center" variant="simple" />;
  }

  if (error || isEmpty(movie)) return notFound();

  return <MoviePlayer movie={movie} startAt={startAt} />;
};

export default MoviePlayerPage;
