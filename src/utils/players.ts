import { PlayersProps } from "@/types";
import {
  getProviders,
  ProviderInput,
  toPlayer,
} from "@/utils/providerRegistry";

const createPlayers = (
  mediaType: "movie" | "tv",
  input: ProviderInput,
): PlayersProps[] =>
  getProviders(mediaType).map((provider) => toPlayer(provider, input));

export const getMoviePlayers = (
  id: string | number,
  startAt?: number,
): PlayersProps[] => createPlayers("movie", { id, startAt });

export const getTvShowPlayers = (
  id: string | number,
  season: number,
  episode: number,
  startAt?: number,
): PlayersProps[] =>
  createPlayers("tv", { id, season, episode, startAt });
