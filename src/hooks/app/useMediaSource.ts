import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CONFIG } from "../../config";
import { AnimeCompleteInformation } from "../../types/api/AnimeCompleteInformation";
import { plainToInstance } from "class-transformer";
import { AnimeEpisodeInfo } from "../../types/api/AnimeEpisodeInfo";

async function getMediaUrl(id: string, signal?: AbortSignal) {
  const animeInfoRequest = await axios.get<AnimeCompleteInformation>(CONFIG.gogo_anime.info(id), {
    signal
  });

  const animeInfoInstance = plainToInstance(AnimeCompleteInformation, animeInfoRequest.data);
  const latest = animeInfoInstance.latestEpisode;

  const episodeInfoRequest = await axios.get<AnimeEpisodeInfo>(CONFIG.gogo_anime.episode(latest.id));
  const animeEpisodeInstance = plainToInstance(AnimeEpisodeInfo, episodeInfoRequest.data);

  return animeEpisodeInstance;
}

export const useMediaSource = () => {
  const [src, setSrc] = useState<string | undefined>(undefined);
  const {mediaId} = useParams();

  useEffect(() => {
    const abort = new AbortController();
    
    if (mediaId) {
      getMediaUrl(mediaId).then((episode) => setSrc(episode.highestQuality?.url))
    }

    return () => {
      abort.abort();
    }
  }, [mediaId]);

  return { src };
}