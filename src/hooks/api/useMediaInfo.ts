import axios from "axios";
import { CONFIG } from "../../config";
import { AnimeCompleteInformation } from "../../types/api/AnimeCompleteInformation";
import { plainToInstance } from "class-transformer";
import { useQuery } from "react-query";

async function getMediaInfo(id: string, signal?: AbortSignal) {
  const animeInfoRequest = await axios.get<AnimeCompleteInformation>(CONFIG.gogo_anime.info(id), {
    signal
  });
  return plainToInstance(AnimeCompleteInformation, animeInfoRequest.data);
}

export const useMediaInfo = (mediaId: string) => {
  return useQuery<AnimeCompleteInformation>(['media-info', mediaId], () => getMediaInfo(mediaId))
}