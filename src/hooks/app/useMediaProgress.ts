import { useEffect, useState } from "react";
import { PlayerState, getPlayerState } from "../../state/player";
import { listenEvent, sendEvent, unlistenEvent } from "../../utils/event";

export type VideoProgressEvent = {
  time: number;
  duration: number;
  buffered: number;
  draggingTime: number;
};

function getProgressFromState(state: PlayerState): VideoProgressEvent {
  return {
    time: state.progress.time,
    duration: state.progress.duration,
    buffered: state.progress.buffered,
    draggingTime: state.progress.draggingTime,
  };
}

export function updateProgress(state: PlayerState) {
  sendEvent<VideoProgressEvent>(
    "progress",
    getProgressFromState(state)
  );
}


export const useMediaProgress = () => {
  const state = getPlayerState();
  const [data, setData] = useState(
    getProgressFromState(state),
  );

  
  useEffect(() => {
    function update(payload: CustomEvent<VideoProgressEvent>) {
      setData(payload.detail);
    }
    listenEvent("progress", update);
    return () => {
      unlistenEvent("progress", update);
    };
  }, []);

  return data;
}
