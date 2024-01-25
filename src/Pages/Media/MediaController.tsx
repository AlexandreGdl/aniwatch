import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import styled, { ThemeContext } from "styled-components"
import { useIsMouseStatic } from "../../hooks/app/useIsMouseStatic";
import { goBack } from "../../utils";
import { PlayPauseButton } from "../../components/controller/PlayPauseButton";
import { MouseEvent, useContext } from "react";
import { MediaProgress } from "../../components/controller/MediaProgress";
import { useControls } from "../../state/player";
import { useMediaPlaying } from "../../hooks/app/useMediaPlaying";
import { FullScreenButton } from "../../components/controller/FullScreenButton";
import { QualityController } from "../../components/controller/QualityController";
import { EpisodesController } from "../../components/controller/EpisodesController";

type OverlayProps = {
  hidden: boolean;
}

type OverlayItemProps = {
  reverse?: boolean;
}

type MediaControllerProps = {
  title?: string;
}

const Overlay = styled('div').withConfig({
  shouldForwardProp: (prop) => !['hidden'].includes(prop),
})<OverlayProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  color: white;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,0.1);

  ${({hidden}) => hidden && `
    opacity: 0;
    cursor: none;
    body {
      cursor: none;
    }
  `}

  transition: all .2s;
`;
const OverlayItem = styled('div').withConfig({
  shouldForwardProp: (prop) => !['reverse'].includes(prop),
})<OverlayItemProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  ${({reverse}) => reverse ? 'padding-top: 40px' : 'padding-bottom'}: 40px;
  gap: 15px;
  background-image: linear-gradient(to ${({reverse}) => reverse ? 'top' : 'bottom'}, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0));

`;
const StyledGoBack = styled(ChevronLeftIcon)`
  cursor: pointer;
  &:hover {
    color: ${({theme}) => theme.color.primary};
    transform: scale(1.2);
  }

  transition: all .3s;
`;

const Row = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MediaController = ({title}: MediaControllerProps) => {
  const controls = useControls();
  const mediaPlaying = useMediaPlaying();
  const theme = useContext(ThemeContext);
  const {isMouseStatic} = useIsMouseStatic();

  function handleInterfaceClicked(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    const element = (e.target as HTMLElement);
    if (element.id && element.id === "control-interface") {
      if (mediaPlaying.isPlaying) controls.pause();
      else controls.play();
    } else return;
  }

  return (
    <Overlay hidden={isMouseStatic} id="control-interface" onClick={handleInterfaceClicked}>
      <OverlayItem>
        <Row>
          <StyledGoBack onClick={goBack} width={theme?.iconSize} height={theme?.iconSize} color="white"/>
          <p>{title}</p>
        </Row>
      </OverlayItem>
      <OverlayItem reverse>
        <PlayPauseButton />
        <MediaProgress />
        <EpisodesController />
        <QualityController />
        <FullScreenButton />
      </OverlayItem>
    </Overlay>
  )
}