import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import { useMediaEpisode } from "../../hooks/api/useMediaEpisode";
import { createMediaController, getPlayerState, setControllerState } from "../../state/player";
import { updateMediaPlaying } from "../../hooks/app/useMediaPlaying";

type Props = {
  episodeId: string;
}

const StyledVideo = styled('video').withConfig({})`
  height: 100%;
  width: 100%;
`;

const hls = new Hls();
export const MediaPlayer = ({episodeId}: Props) => {
  const [stream, setStream] = useState<undefined | string>(undefined)
  const episodeInfo = useMediaEpisode(episodeId);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const current = videoRef.current;
    // Init Hls
    if (Hls.isSupported() && current) {
      const state = getPlayerState();
      updateMediaPlaying({
        ...state,
        mediaPlaying: {
          ...state.mediaPlaying,
          ref: current
        }
      })
      hls.attachMedia(current);
    }
  }, []);

  useEffect(() => {
    if (episodeInfo.data && episodeInfo.data.highestQuality && videoRef.current) {
      setStream(episodeInfo.data.highestQuality.url);
    }
  }, [episodeInfo]);

  useEffect(() => {
    if (!videoRef.current) return;
    const mediaController = createMediaController(videoRef.current);
    setControllerState(mediaController);
    if (stream) {
      hls.loadSource(stream);
      // videoRef.current.play();
    }
  }, [stream, videoRef]);

  return (
    <StyledVideo ref={videoRef}/>
  )
}