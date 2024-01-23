import { useEffect, useState } from "react"
import { PlayerState, getPlayerState } from "../../state/player";
import { listenEvent, sendEvent, unlistenEvent } from "../../utils/event";

type MediaPlayingEvent = {
  isPlaying: boolean;
  isPaused: boolean;
  isLoading: boolean;
  isSeeking: boolean;
  isDragSeeking: boolean;
  hasPlayedOnce: boolean;
  isFirstLoading: boolean;
  volume: number;
  playbackSpeed: number;
  isFullscreen: boolean;
  ref: HTMLVideoElement | null;
};

function getMediaPlayingFromState(
  state: PlayerState
): MediaPlayingEvent {
  return {
    hasPlayedOnce: state.mediaPlaying.hasPlayedOnce,
    isLoading: state.mediaPlaying.isLoading,
    isPaused: state.mediaPlaying.isPaused,
    isPlaying: state.mediaPlaying.isPlaying,
    isSeeking: state.mediaPlaying.isSeeking,
    isDragSeeking: state.mediaPlaying.isDragSeeking,
    isFirstLoading: state.mediaPlaying.isFirstLoading,
    volume: state.mediaPlaying.volume,
    playbackSpeed: state.mediaPlaying.playbackSpeed,
    ref: state.mediaPlaying.ref,
    isFullscreen: state.mediaPlaying.isFullscreen,
  };
}


export function updateMediaPlaying(
  state: PlayerState
) {
  sendEvent<MediaPlayingEvent>(
    "mediaplaying",
    getMediaPlayingFromState(state)
  );
}

export const useMediaPlaying = () => {
  const state = getPlayerState();
  const [data, setData] = useState<MediaPlayingEvent>(
    getMediaPlayingFromState(state)
  );

  useEffect(() => {
    function update(payload: CustomEvent<MediaPlayingEvent>) {
      setData(payload.detail);
    }
    listenEvent("mediaplaying", update);
    return () => {
      unlistenEvent("mediaplaying", update);
    };
  }, []);

  return data;
}