import {
  ContentType,
  PlayersProps,
  ProviderLanguage,
  ProviderPlaybackMode,
} from "@/types";

type SecureUrl = `https://${string}`;

export type ProviderInput = {
  id: string | number;
  season?: number;
  episode?: number;
  startAt?: number;
};

export type ProviderDefinition = {
  id: string;
  title: string;
  language: ProviderLanguage;
  mediaTypes: ContentType[];
  playbackMode: ProviderPlaybackMode;
  priority: number;
  recommended?: boolean;
  fast?: boolean;
  ads?: boolean;
  resumable?: boolean;
  buildUrl: (input: ProviderInput) => SecureUrl;
};

type ProviderOptions = Omit<ProviderDefinition, "buildUrl" | "mediaTypes">;

const define = (
  options: ProviderOptions,
  mediaTypes: ContentType[],
  buildUrl: ProviderDefinition["buildUrl"],
): ProviderDefinition => ({ ...options, mediaTypes, buildUrl });

const original = (
  options: Omit<ProviderOptions, "language" | "playbackMode">,
): ProviderOptions => ({
  ...options,
  language: "original",
  playbackMode: "iframe",
});

const latino = (
  options: Omit<ProviderOptions, "language" | "playbackMode">,
): ProviderOptions => ({
  ...options,
  language: "es_latino",
  playbackMode: "iframe",
});

const movie = (input: ProviderInput): string => String(input.id);

const tv = (input: ProviderInput): string =>
  `${input.id}/${input.season}/${input.episode}`;

const movieAndTv = (
  options: Omit<ProviderOptions, "language" | "playbackMode">,
  movieUrl: (input: ProviderInput) => SecureUrl,
  tvUrl: (input: ProviderInput) => SecureUrl,
): ProviderDefinition[] => [
  define(original({ ...options, id: `${options.id}-movie` }), ["movie"], movieUrl),
  define(original({ ...options, id: `${options.id}-tv` }), ["tv"], tvUrl),
];

const latinoMovieAndTv = (
  options: Omit<ProviderOptions, "language" | "playbackMode">,
  movieUrl: (input: ProviderInput) => SecureUrl,
  tvUrl: (input: ProviderInput) => SecureUrl,
): ProviderDefinition[] => [
  define(latino({ ...options, id: `${options.id}-movie` }), ["movie"], movieUrl),
  define(latino({ ...options, id: `${options.id}-tv` }), ["tv"], tvUrl),
];

export const providerRegistry: ProviderDefinition[] = [
  ...movieAndTv(
    {
      id: "vidlink",
      title: "VidLink",
      priority: 10,
      recommended: true,
      fast: true,
      ads: true,
      resumable: true,
    },
    ({ id, startAt }) =>
      `https://vidlink.pro/movie/${id}?player=jw&primaryColor=006fee&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
    ({ id, season, episode, startAt }) =>
      `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=f5a524&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
  ),
  ...movieAndTv(
    {
      id: "vidlink-2",
      title: "VidLink 2",
      priority: 20,
      recommended: true,
      fast: true,
      ads: true,
      resumable: true,
    },
    ({ id, startAt }) =>
      `https://vidlink.pro/movie/${id}?primaryColor=006fee&autoplay=false&startAt=${startAt}`,
    ({ id, season, episode, startAt }) =>
      `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=f5a524&autoplay=false&startAt=${startAt}`,
  ),
  ...movieAndTv(
    {
      id: "vidking",
      title: "VidKing",
      priority: 30,
      recommended: true,
      fast: true,
      resumable: true,
    },
    ({ id }) =>
      `https://www.vidking.net/embed/movie/${id}?color=006fee&autoplay=false`,
    ({ id, season, episode }) =>
      `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=f5a524&autoplay=false`,
  ),
  ...movieAndTv(
    { id: "embed-su", title: "<Embed>", priority: 40, ads: true },
    ({ id }) => `https://embed.su/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://embed.su/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    {
      id: "superembed",
      title: "SuperEmbed",
      priority: 50,
      fast: true,
      ads: true,
    },
    ({ id }) =>
      `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
    ({ id, season, episode }) =>
      `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
  ),
  ...movieAndTv(
    { id: "filmku", title: "FilmKu", priority: 60, ads: true },
    ({ id }) => `https://filmku.stream/embed/${id}`,
    ({ id, season, episode }) =>
      `https://filmku.stream/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
  ),
  ...movieAndTv(
    { id: "nontongo", title: "NontonGo", priority: 70, ads: true },
    ({ id }) => `https://www.nontongo.win/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://www.NontonGo.win/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    {
      id: "autoembed",
      title: "AutoEmbed 1",
      priority: 80,
      fast: true,
      ads: true,
    },
    ({ id }) => `https://autoembed.co/movie/tmdb/${id}`,
    ({ id, season, episode }) =>
      `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
  ),
  ...movieAndTv(
    { id: "autoembed-cc", title: "AutoEmbed 2", priority: 81, ads: true },
    ({ id }) => `https://player.autoembed.cc/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    {
      id: "autoembed-live",
      title: "AutoEmbed 2 (actualizado)",
      priority: 82,
      ads: true,
    },
    ({ id }) => `https://player.autoembed.me/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://player.autoembed.me/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    { id: "2embed", title: "2Embed", priority: 90, ads: true },
    ({ id }) => `https://www.2embed.cc/embed/${id}`,
    ({ id, season, episode }) =>
      `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
  ),
  ...movieAndTv(
    { id: "vidsrc-xyz", title: "VidSrc 1", priority: 100, ads: true },
    ({ id }) => `https://vidsrc.xyz/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    { id: "vidsrc-to", title: "VidSrc 2", priority: 101, ads: true },
    ({ id }) => `https://vidsrc.to/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    { id: "vidsrc-icu", title: "VidSrc 3", priority: 102, ads: true },
    ({ id }) => `https://vidsrc.icu/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`,
  ),
  ...movieAndTv(
    { id: "vidsrc-cc-v2", title: "VidSrc 4", priority: 103, ads: true },
    ({ id }) => `https://vidsrc.cc/v2/embed/movie/${id}?autoPlay=false`,
    ({ id, season, episode }) =>
      `https://vidsrc.cc/v2/embed/tv/${id}/${season}/${episode}?autoPlay=false`,
  ),
  ...movieAndTv(
    {
      id: "vidsrc-cc-v3",
      title: "VidSrc 5",
      priority: 104,
      recommended: true,
      fast: true,
      ads: true,
    },
    ({ id }) => `https://vidsrc.cc/v3/embed/movie/${id}?autoPlay=false`,
    ({ id, season, episode }) =>
      `https://vidsrc.cc/v3/embed/tv/${id}/${season}/${episode}?autoPlay=false`,
  ),
  ...movieAndTv(
    { id: "moviesapi", title: "MoviesAPI", priority: 110, ads: true },
    ({ id }) => `https://moviesapi.club/movie/${id}`,
    ({ id, season, episode }) =>
      `https://moviesapi.club/tv/${id}-${season}-${episode}`,
  ),
  ...latinoMovieAndTv(
    {
      id: "pelisplus",
      title: "PelisPlus",
      priority: 200,
      ads: true,
      resumable: true,
    },
    ({ id }) => `https://pelisplus.cloud/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://pelisplus.cloud/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
  ),
  ...latinoMovieAndTv(
    {
      id: "cuevana3",
      title: "Cuevana3",
      priority: 201,
      ads: true,
      resumable: true,
    },
    ({ id }) => `https://cuevana3.co/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://cuevana3.co/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
  ),
  ...latinoMovieAndTv(
    {
      id: "seriespe",
      title: "SeriesPE",
      priority: 202,
      ads: true,
      resumable: true,
    },
    ({ id }) => `https://seriespe.lat/embed/movie/${id}`,
    ({ id, season, episode }) =>
      `https://seriespe.lat/embed/series?tmdb=${id}&sea=${season}&epi=${episode}`,
  ),
  ...latinoMovieAndTv(
    {
      id: "cinecalidad",
      title: "Cinecalidad",
      priority: 210,
      ads: true,
      resumable: true,
    },
    ({ id }) => `https://cinecalidad.mx/embed/movie/${id}`,
    ({ id }) => `https://cinecalidad.mx/embed/movie/${id}`,
  ),
  ...latinoMovieAndTv(
    {
      id: "repelis",
      title: "Repelis",
      priority: 211,
      ads: true,
      resumable: true,
    },
    ({ id }) => `https://repelisplus.to/embed/movie/${id}`,
    ({ id }) => `https://repelisplus.to/embed/movie/${id}`,
  ),
  ...latinoMovieAndTv(
    {
      id: "seriesyonkis",
      title: "SeriesYonkis",
      priority: 212,
      ads: true,
      resumable: true,
    },
    ({ id }) => `https://seriesyonkis.nu/embed/movie/${id}`,
    ({ id }) => `https://seriesyonkis.nu/embed/movie/${id}`,
  ),
];

export const getProviders = (mediaType: ContentType): ProviderDefinition[] =>
  providerRegistry
    .filter((provider) => provider.mediaTypes.includes(mediaType))
    .sort((a, b) => a.priority - b.priority);

export const toPlayer = (
  provider: ProviderDefinition,
  input: ProviderInput,
): PlayersProps => ({
  providerId: provider.id,
  title: provider.title,
  source: provider.buildUrl(input),
  language: provider.language,
  idioma: provider.language,
  playbackMode: provider.playbackMode,
  recommended: provider.recommended,
  fast: provider.fast,
  ads: provider.ads,
  resumable: provider.resumable,
});
