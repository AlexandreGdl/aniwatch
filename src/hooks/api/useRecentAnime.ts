import axios from "axios"
import { useQuery } from "react-query"
import { CONFIG } from "../../config"
import * as transformer from 'class-transformer';
import { RecentAnime } from "../../types/api/RecentAnime";

const getRecentAnime = async () => {
  const {data} = await axios.get(CONFIG.gogo_anime.recent);
  const plainData = transformer.plainToInstance(RecentAnime, data);
  return plainData;
}

export const useRecentAnime = () => {
  return useQuery<RecentAnime>('recent', getRecentAnime);
}