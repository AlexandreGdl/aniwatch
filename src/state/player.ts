import { updateMediaPlaying } from "../hooks/app/useMediaPlaying";

export type MediaControllerState = {
  play: () => void,
  pause: () => void,
  isPlaying: () => boolean,
  setVolume: (volume: number) => void,
  setTime: (volume: number) => void,
  getRef: () => HTMLVideoElement | undefined
}

export type PlayerState = {
  controller: null | MediaControllerState,
  mediaPlaying: {
    isPlaying: boolean;
    isPaused: boolean;
    isSeeking: boolean;
    isDragSeeking: boolean;
    isLoading: boolean;
    isFirstLoading: boolean;
    hasPlayedOnce: boolean;
    volume: number;
    playbackSpeed: number;
    ref: HTMLVideoElement | null;
  };
  
  // state related to video progress
  progress: {
    time: number;
    duration: number;
    buffered: number;
    draggingTime: number;
  }
}

const playerState: PlayerState = {
  controller: null,
  mediaPlaying: {
    isPlaying: false,
    isPaused: true,
    isLoading: true,
    isSeeking: false,
    isDragSeeking: false,
    isFirstLoading: true,
    hasPlayedOnce: false,
    volume: 0,
    playbackSpeed: 1,
    ref: null,
  },
  progress: {
    time: 0,
    duration: 0,
    draggingTime: 0,
    buffered: 0,
  }
}

export function getPlayerState() {
  return playerState;
}

export function setControllerState(
  controller: MediaControllerState
) {
  const state = getPlayerState();
  state.controller = controller;
}

export function createMediaController(ref: HTMLVideoElement): MediaControllerState {
  return {
    play: ref.play.bind(ref),
    pause: ref.pause.bind(ref),
    isPlaying: () => !ref.paused,
    setVolume: (volume: number) => ref.volume = volume,
    setTime: (time: number) => ref.currentTime = time,
    getRef: () => ref
  }
}

export function useControls(): MediaControllerState {
  const state = getPlayerState();

  return {
    play() {
      updateMediaPlaying({
        ...state,
        mediaPlaying: {
          ...state.mediaPlaying,
          isPaused: false,
          isPlaying: true,
        }
      });
      state.controller?.play();
    },
    setVolume(volume) {
      state.controller?.setVolume(volume);
    },
    setTime(time: number) {
      state.controller?.setTime(time);
    },
    pause() {
      updateMediaPlaying({
        ...state,
        mediaPlaying: {
          ...state.mediaPlaying,
          isPaused: true,
          isPlaying: false,
        }
      });
      state.controller?.pause();
    },
    isPlaying: () => {
      if (!state.controller) return false;
      return state.controller.isPlaying();
    },
    getRef() {
      return state.controller?.getRef();
    },
  }
}