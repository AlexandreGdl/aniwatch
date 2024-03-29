const base = import.meta.env.VITE_ANIME_API_URL+'anime/gogoanime/';
export const enum GOGO_SERVER_ENUM {
  GOGOCDN = "gogocdn",
  STREAMSB = "streamsb",
  VIDSTREAMING = "vidstreaming",
}
export const GOGO_ANIME_CONFIG = {
  base,
  recent: base+'recent-episodes',
  top_airing: base+'top-airing',
  info: (id: string) => base+`info/${id}`,
  episode: (episodeId: string, serverName = GOGO_SERVER_ENUM.GOGOCDN): string => base+`watch/${episodeId}?server=${serverName}`,
  servers: (episodeId: string) => base+`servers/${episodeId}`,
  search: (query: string, number?: number) => base+`${query}${number?`?page=${number}`:''}`,
}