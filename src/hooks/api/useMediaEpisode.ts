import axios from "axios";
import { AnimeEpisodeInfo } from "../../types/api/AnimeEpisodeInfo";
import { CONFIG } from "../../config";
import { plainToInstance } from "class-transformer";
import { useQuery } from "react-query";

const getEpisodeData = async (id: string) => {
  const episodeInfoRequest = await axios.get<AnimeEpisodeInfo>(CONFIG.gogo_anime.episode(id));
  const animeEpisodeInstance = plainToInstance(AnimeEpisodeInfo, episodeInfoRequest.data);

  return animeEpisodeInstance;
}

export const useMediaEpisode = (id: string) => {
  return useQuery<AnimeEpisodeInfo>(['episode', id], () => getEpisodeData(id));
}