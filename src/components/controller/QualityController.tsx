import { useState } from "react";
import styled from "styled-components";
import { updateMediaPlaying, useMediaPlaying } from "../../hooks/app/useMediaPlaying";
import { AnimeEpisodeSource } from "../../types/api/AnimeEpisodeInfo";
import { getPlayerState, hls, useControls } from "../../state/player";

type QualityItemProps = {
  noBorder?: boolean;
}
type QualityChoiceContainer = {
  active?: boolean;
}

const Container = styled.div`
  position: relative;
`;
const QualityItem = styled('div').withConfig({
  shouldForwardProp: (prop) => !['noBorder'].includes(prop)
})<QualityItemProps>`
  ${({noBorder}) => !noBorder && `
    border-style: solid;
    border-color: white;
    border-width: 2px;
  `}
  padding: 6px;
  border-radius: 8px;
  &:hover {
    border-color: ${({theme}) => theme.color.primary};
    transform: scale(1.1);
    cursor: pointer;
  }

  transition: all .2s;
`;
const QualityText = styled.p`
  font-weight: bold;
  font-size: 14px;
`;
const QualityChoiceContainer = styled('div').withConfig({
  shouldForwardProp: (props) => !['active'].includes(props),
})<QualityChoiceContainer>`
  width: 100%;
  border-radius: 12px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  border: solid rgba(255,255,255, 0.5) 2px;
  padding: 10px;
  align-items: center;
  transform: translateX(-50%);
  opacity: 0;
  z-index: -2;

  ${({active}) => active && `
    transform: translate(-50%, -20%);
    opacity: 1;
    z-index: 2;
  `}

  transition: all .2s;
`;

export const QualityController = () => {
  const [isActive, setIsActive] = useState(false);
  const controls = useControls();
  const mediaPlaying = useMediaPlaying();

  function handleClick() {
    setIsActive(active => !active);
  }

  function handleQualityClicked(quality: AnimeEpisodeSource) {
    const state = getPlayerState();
    hls.loadSource(quality.url);
    state.mediaPlaying.activeQuality = quality.quality;
    updateMediaPlaying(state);
    controls.setTime(state.progress.time);
    controls.play();
  }

  return (
    <Container onClick={handleClick}>
      <QualityItem>
        <QualityText>{mediaPlaying.activeQuality}</QualityText>
      </QualityItem>
      <QualityChoiceContainer active={isActive}>
        {mediaPlaying.qualities.map((quality) => (
          <QualityItem onClick={() => handleQualityClicked(quality)} noBorder key={quality.quality}>
            <QualityText>{quality.quality}</QualityText>
          </QualityItem>
        ))}
      </QualityChoiceContainer>
    </Container>
  )
}