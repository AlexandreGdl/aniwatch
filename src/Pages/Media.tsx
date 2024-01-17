import styled from "styled-components"
import { Layout } from "../components"
import { useMediaSource } from "../hooks/app/useMediaSource";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

const StyledVideo = styled('video').withConfig({})`
  width: 100%;
  height: 100%;
`;

export const Media = () => {
  const {src} = useMediaSource();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (Hls.isSupported()) {}
  }, [src]);

  return (
    <Layout>
      <StyledVideo controls src={src} ref={videoRef} />
    </Layout>
  )
}