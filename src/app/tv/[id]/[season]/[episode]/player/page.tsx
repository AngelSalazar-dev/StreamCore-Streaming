"use client";

import { tmdb } from "@/api/tmdb-client";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { notFound, usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { getTvShowLastPosition } from "@/actions/histories";
const TvShowPlayer = dynamic(() => import("@/components/sections/TV/Player/Player"));

const TvShowPlayerPage: NextPage = () => {
  const pathname = usePathname(); // subscribed to the router — window.location is not reactive
  // The static export only prerenders 1/1/1, so params always say 1 — the real ids are in the URL.
  // pathname = /tv/<id>/<season>/<episode>/player
  const [, , id, season, episode] = pathname.split("/").map(Number);
  // During client nav the URL can lag one render behind (NaN ids); queries wait for validId.
  const validId = Number.isFinite(id) && Number.isFinite(season) && Number.isFinite(episode);

  const {
    data: tv,
    isPending: isPendingTv,
    error: errorTv,
  } = useQuery({
    queryFn: () => tmdb.tvShows.details(id),
    queryKey: ["tv-show-player-details", id],
    enabled: validId,
  });

  const {
    data: seasonDetail,
    isPending: isPendingSeason,
    error: errorSeason,
  } = useQuery({
    queryFn: () => tmdb.tvShows.season(id, season),
    queryKey: ["tv-show-season", id, season],
    enabled: validId,
  });

  const { data: startAt, isPending: isPendingStartAt } = useQuery({
    queryFn: () => getTvShowLastPosition(id, season, episode),
    queryKey: ["tv-show-player-start-at", id, season, episode],
    enabled: validId,
    staleTime: 0,
  });

  if (!validId || isPendingTv || isPendingSeason || isPendingStartAt) {
    return <Spinner size="lg" className="absolute-center" color="warning" variant="simple" />;
  }

  const EPISODE = seasonDetail?.episodes.find(
    (e) => e.episode_number.toString() === episode.toString(),
  );

  if (!EPISODE || errorTv || errorSeason) notFound();

  const isNotReleased = new Date(EPISODE.air_date) > new Date();

  if (isNotReleased) notFound();

  const currentEpisodeIndex = seasonDetail.episodes.findIndex(
    (e) => e.episode_number === EPISODE.episode_number,
  );

  const nextEpisodeNumber =
    currentEpisodeIndex < seasonDetail.episodes.length - 1
      ? new Date(seasonDetail.episodes[currentEpisodeIndex + 1].air_date) > new Date()
        ? null
        : seasonDetail.episodes[currentEpisodeIndex + 1].episode_number
      : null;

  const prevEpisodeNumber =
    currentEpisodeIndex > 0 ? seasonDetail.episodes[currentEpisodeIndex - 1].episode_number : null;

  return (
    <TvShowPlayer
      tv={tv}
      id={id}
      seriesName={tv.name}
      seasonName={seasonDetail.name}
      episode={EPISODE}
      episodes={seasonDetail.episodes}
      nextEpisodeNumber={nextEpisodeNumber}
      prevEpisodeNumber={prevEpisodeNumber}
      startAt={startAt}
    />
  );
};

export default TvShowPlayerPage;
