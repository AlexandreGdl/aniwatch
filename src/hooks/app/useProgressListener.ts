import { useEffect } from "react";
import { getPlayerState } from "../../state/player"
import { updateProgress } from "./useMediaProgress";
import { updateMediaPlaying, useMediaPlaying } from "./useMediaPlaying";

export const ProgressListener = () => {
  const mediaPlaying = useMediaPlaying();

  useEffect(() => {
    const ref = mediaPlaying.ref;
    if (ref) {
      ref.addEventListener('loadeddata', () => {
        const state = getPlayerState();
        state.progress.duration = ref.duration;
        state.mediaPlaying.isLoading = false;
        updateProgress(state);
        updateMediaPlaying(state);
      });
      ref.addEventListener('timeupdate', () => {
        const state = getPlayerState();
        state.progress.time = ref.currentTime;
        updateProgress(state);
      });
    }

    return () => {
      if (ref) {
        ref.removeEventListener('loadeddata', () => false);
      }
    }
  }, [mediaPlaying]);

  return null;
}