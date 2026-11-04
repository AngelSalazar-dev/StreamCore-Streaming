import { ContentType, PlayersProps, ProviderLanguage, ProviderPlaybackMode } from "@/types";

type SecureUrl = `https://${string}`;

export type ProviderInput = {
  id: string | number;
  season?: number;
  episode?: number;
  startAt?: number;
};

type ProviderOptions = {
  id: string;
  title: string;
  language: ProviderLanguage;
  playbackMode: ProviderPlaybackMode;
  priority: number;
  recommended?: boolean;
  fast?: boolean;
  ads?: boolean;
  resumable?: boolean;
};

export type ProviderDefinition = ProviderOptions & {
  mediaTypes: ContentType[];
  buildUrl: (input: ProviderInput) => SecureUrl;
};

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

export const providerRegistry: ProviderDefinition[] = [
  define(
    original({
      id: "vidlink-movie",
      title: "VidLink",
      priority: 10,
      fast: true,
      ads: true,
      resumable: true,
    }),
    ["movie"],
    ({ id, startAt }) =>
      `https://vidlink.pro/movie/${id}?player=jw&primaryColor=006fee&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
  ),
  define(
    original({
      id: "vidlink-tv",
      title: "VidLink",
      priority: 10,
      fast: true,
      ads: true,
      resumable: true,
    }),
    ["tv"],
    ({ id, season, episode, startAt }) =>
      `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=f5a524&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
  ),
  define(
    original({
      id: "vidlink-compact-movie",
      title: "VidLink 2",
      priority: 20,
      fast: true,
      ads: true,
      resumable: true,
    }),
    ["movie"],
    ({ id, startAt }) =>
      `https://vidlink.pro/movie/${id}?primaryColor=006fee&autoplay=false&startAt=${startAt}`,
  ),
  define(
    original({
      id: "vidlink-compact-tv",
      title: "VidLink 2",
      priority: 20,
      fast: true,
      ads: true,
      resumable: true,
    }),
    ["tv"],
    ({ id, season, episode, startAt }) =>
      `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=f5a524&autoplay=false&startAt=${startAt}`,
  ),
  define(
    original({
      id: "vidking",
      title: "VidKing",
      priority: 30,
      fast: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://www.vidking.net/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}?color=${input.season === undefined ? "006fee" : "f5a524"}&autoplay=false`,
  ),
  define(
    original({ id: "embed-su", title: "<Embed>", priority: 40, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://embed.su/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}`,
  ),
  define(
    original({
      id: "multiembed",
      title: "SuperEmbed",
      priority: 50,
      fast: true,
      ads: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://multiembed.mov/directstream.php?video_id=${input.id}&tmdb=1${input.season === undefined ? "" : `&s=${input.season}&e=${input.episode}`}`,
  ),
  define(
    original({ id: "filmku", title: "FilmKu", priority: 60, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://filmku.stream/embed/${input.season === undefined ? movie(input) : `series?tmdb=${input.id}&sea=${input.season}&epi=${input.episode}`}`,
  ),
  define(
    original({ id: "nontongo", title: "NontonGo", priority: 70, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://www.nontongo.win/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}`,
  ),
  define(
    original({
      id: "autoembed",
      title: "AutoEmbed 1",
      priority: 80,
      fast: true,
      ads: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://autoembed.co/${input.season === undefined ? `movie/tmdb/${input.id}` : `tv/tmdb/${input.id}-${input.season}-${input.episode}`}`,
  ),
  define(
    original({ id: "autoembed-cc", title: "AutoEmbed 2", priority: 90, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://player.autoembed.me/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}`,
  ),
  define(
    original({ id: "2embed", title: "2Embed", priority: 100, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://www.2embed.cc/${input.season === undefined ? `embed/${movie(input)}` : `embedtv/${input.id}&s=${input.season}&e=${input.episode}`}`,
  ),
  define(
    original({ id: "vidsrc-xyz", title: "VidSrc 1", priority: 110, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://vidsrc.xyz/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}`,
  ),
  define(
    original({ id: "vidsrc-to", title: "VidSrc 2", priority: 120, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://vidsrc.to/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}`,
  ),
  define(
    original({ id: "vidsrc-icu", title: "VidSrc 3", priority: 130, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://vidsrc.icu/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}`,
  ),
  define(
    original({ id: "vidsrc-v2", title: "VidSrc 4", priority: 140, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://vidsrc.cc/v2/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}?autoPlay=false`,
  ),
  define(
    original({
      id: "vidsrc-v3",
      title: "VidSrc 5",
      priority: 150,
      fast: true,
      ads: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://vidsrc.cc/v3/embed/${input.season === undefined ? "movie" : "tv"}/${input.season === undefined ? movie(input) : tv(input)}?autoPlay=false`,
  ),
  define(
    original({ id: "moviesapi", title: "MoviesAPI", priority: 160, ads: true }),
    ["movie", "tv"],
    (input) =>
      `https://moviesapi.club/${input.season === undefined ? `movie/${movie(input)}` : `tv/${input.id}-${input.season}-${input.episode}`}`,
  ),
  define(
    latino({
      id: "pelisplus",
      title: "PelisPlus",
      priority: 200,
      ads: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://pelisplus.cloud/embed/${input.season === undefined ? `movie/${movie(input)}` : `series?tmdb=${input.id}&sea=${input.season}&epi=${input.episode}`}`,
  ),
  define(
    latino({
      id: "cuevana3",
      title: "Cuevana3",
      priority: 210,
      ads: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://cuevana3.co/embed/${input.season === undefined ? `movie/${movie(input)}` : `series?tmdb=${input.id}&sea=${input.season}&epi=${input.episode}`}`,
  ),
  define(
    latino({
      id: "seriespe",
      title: "SeriesPE",
      priority: 220,
      ads: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://seriespe.lat/embed/${input.season === undefined ? `movie/${movie(input)}` : `series?tmdb=${input.id}&sea=${input.season}&epi=${input.episode}`}`,
  ),
  define(
    latino({
      id: "cinecalidad",
      title: "Cinecalidad",
      priority: 230,
      ads: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://cinecalidad.mx/embed/movie/${movie(input)}`,
  ),
  define(
    latino({
      id: "repelis",
      title: "Repelis",
      priority: 240,
      ads: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://repelisplus.to/embed/movie/${movie(input)}`,
  ),
  define(
    latino({
      id: "seriesyonkis",
      title: "SeriesYonkis",
      priority: 250,
      ads: true,
      resumable: true,
    }),
    ["movie", "tv"],
    (input) =>
      `https://seriesyonkis.nu/embed/movie/${movie(input)}`,
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
  title: provider.title,
  source: provider.buildUrl(input),
  providerId: provider.id,
  language: provider.language,
  idioma: provider.language,
  playbackMode: provider.playbackMode,
  recommended: provider.recommended,
  fast: provider.fast,
  ads: provider.ads,
  resumable: provider.resumable,
});
