import axios from "axios"
import { useQuery } from "react-query"
import { CONFIG } from "../../config"
import * as transformer from 'class-transformer';
import { TopAiringAnime } from "../../types/api/TopAiringAnime";

const getTopAiringAnime = async () => {
  const {data} = await axios.get(CONFIG.gogo_anime.top_airing);
  const plainData = transformer.plainToInstance(TopAiringAnime, data);
  return plainData;
}

export const useTopAiringAnime = () => {
  return useQuery<TopAiringAnime>('top-airing', getTopAiringAnime);
}