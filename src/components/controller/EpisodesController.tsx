import { useMediaPlaying } from "../../hooks/app/useMediaPlaying";

export const EpisodesController = () => {
  const mediaPlaying = useMediaPlaying();

  
  if (mediaPlaying.episodes.length === 0) return null;

  return (
    <div>{mediaPlaying.activeEpisodeId}</div>
  );
} 