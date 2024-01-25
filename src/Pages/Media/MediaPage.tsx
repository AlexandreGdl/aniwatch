import { useEffect, useState } from "react";
import { Layout } from "../../components"
import { MediaPlayer } from "./MediaPlayer";
import { useParams } from "react-router-dom";
import { useMediaInfo } from "../../hooks/api/useMediaInfo";
import SpinLoader from "../../components/common/spinner";
import { EpisodeInfo } from "../../types/api/AnimeCompleteInformation";
import styled from "styled-components";
import { ProgressListener } from "../../hooks/app/useProgressListener";
import { MediaController } from "./MediaController";
import { getPlayerState } from "../../state/player";
import { updateMediaPlaying } from "../../hooks/app/useMediaPlaying";

const Container = styled.div`
  height: 100vh; // fullscreen
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;


export const MediaPage = () => {
  const [currentEpisode, setCurrentEpisode] = useState<undefined | EpisodeInfo>(undefined);
  const {mediaId} = useParams<keyof {mediaId: string}>() as {mediaId: string};
  if (!mediaId) throw new Error('Error, MediaId couldn\'t be found in params');
  const mediaInfo = useMediaInfo(mediaId);

  useEffect(() => {
    if (mediaInfo.data) {
      setCurrentEpisode(mediaInfo.data.latestEpisode);
      const state = getPlayerState();
      state.mediaPlaying.episodes = mediaInfo.data.episodes;
      state.mediaPlaying.activeEpisodeId = mediaInfo.data.latestEpisode.id;
      updateMediaPlaying(state);
    }
  }, [mediaInfo]);

  return (
    <Layout background="#000" fullScreen>
      <Container>
        <ProgressListener />
        {mediaInfo.isLoading && <SpinLoader />}
        <MediaController title={mediaInfo.data?.title} />
        {currentEpisode && <MediaPlayer episodeId={currentEpisode.id} />}
      </Container>
    </Layout>
  )
}