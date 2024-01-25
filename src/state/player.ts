/* eslint-disable @typescript-eslint/no-explicit-any */
import Hls from "hls.js";
import { updateMediaPlaying } from "../hooks/app/useMediaPlaying";
import { AnimeEpisodeSource, QualityVideo } from "../types/api/AnimeEpisodeInfo";
import { EpisodeInfo } from "../types/api/AnimeCompleteInformation";

export type MediaControllerState = {
  play: () => void,
  pause: () => void,
  isPlaying: () => boolean,
  setVolume: (volume: number) => void,
  setTime: (volume: number) => void,
  getRef: () => HTMLVideoElement | undefined,
  enterFullScreen: () => void,
  exitFullScreen: () => void,
}

export const hls = new Hls();
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
    isFullscreen: boolean;
    qualities: AnimeEpisodeSource[];
    activeQuality?: QualityVideo;
    episodes: EpisodeInfo[];
    activeEpisodeId?: string,
  };
  // state related to video progress
  progress: {
    time: number;
    duration: number;
    buffered: number;
    draggingTime: number;
  }
}

let playerState: PlayerState = {
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
    isFullscreen: false,
    qualities: [],
    activeQuality: undefined,
    episodes: [],
    activeEpisodeId: undefined,
  },
  progress: {
    time: 0,
    duration: 0,
    draggingTime: 0,
    buffered: 0,
  },
}

export function updatePlayerState(state: PlayerState) {
  playerState = state;
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
  const elem = document.documentElement as any;
  const page = document as any;

  return {
    play: ref.play.bind(ref),
    pause: ref.pause.bind(ref),
    isPlaying: () => !ref.paused,
    setVolume: (volume: number) => ref.volume = volume,
    setTime: (time: number) => ref.currentTime = time,
    getRef: () => ref,
    enterFullScreen: () => {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
      }
    },
    exitFullScreen: () => {
      if (page.exitFullscreen) {
        page.exitFullscreen();
      } else if (page.webkitExitFullscreen) { /* Safari */
        page.webkitExitFullscreen();
      } else if (page.msExitFullscreen) { /* IE11 */
        page.msExitFullscreen();
      }
    },
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
    enterFullScreen() {
      state.controller?.enterFullScreen();
      updateMediaPlaying({
        ...state,
        mediaPlaying: {
          ...state.mediaPlaying,
          isFullscreen: true,
        }
      })
    },
    exitFullScreen() {
      state.controller?.exitFullScreen();
      updateMediaPlaying({
        ...state,
        mediaPlaying: {
          ...state.mediaPlaying,
          isFullscreen: false,
        }
      })
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