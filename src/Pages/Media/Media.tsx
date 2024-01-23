import { useEffect, useState } from "react";
import { Layout } from "../../components"
import { MediaPlayer } from "./MediaPlayer";
import { useParams } from "react-router-dom";
import { useMediaInfo } from "../../hooks/api/useMediaInfo";
import SpinLoader from "../../components/common/spinner";
import { EpisodeInfo } from "../../types/api/AnimeCompleteInformation";
import styled from "styled-components";
import { MediaController } from "./MediaController";
import { ProgressListener } from "../../hooks/app/useProgressListener";

const Container = styled.div`
  height: 100vh; // fullscreen
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;


export const Media = () => {
  const [currentEpisode, setCurrentEpisode] = useState<undefined | EpisodeInfo>(undefined);
  const {mediaId} = useParams<keyof {mediaId: string}>() as {mediaId: string};
  if (!mediaId) throw new Error('Error, MediaId couldn\'t be found in params');
  const mediaInfo = useMediaInfo(mediaId);

  useEffect(() => {
    if (mediaInfo.data) {
      setCurrentEpisode(mediaInfo.data.latestEpisode);
    }
  }, [mediaInfo]);

  return (
    <Layout background="#000" fullScreen>
      <Container>
        <ProgressListener />
        {mediaInfo.isLoading && <SpinLoader />}
        <MediaController />
        {currentEpisode && <MediaPlayer episodeId={currentEpisode.id} />}
      </Container>
    </Layout>
  )
}