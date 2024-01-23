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

type OverlayProps = {
  hidden: boolean;
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
  padding: 15px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box;    /* Firefox, other Gecko */
  box-sizing: border-box;
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
const OverlayItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px; 
  gap: 15px;
`;
const StyledGoBack = styled(ChevronLeftIcon)`
  cursor: pointer;
  &:hover {
    color: #eb6f6f;
    transform: scale(1.2);
  }

  transition: all .3s;
`

export const MediaController = () => {
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
        <StyledGoBack onClick={goBack} width={theme?.iconSize} height={theme?.iconSize} color="white"/>
      </OverlayItem>
      <OverlayItem>
        <PlayPauseButton />
        <MediaProgress />
        <FullScreenButton />
      </OverlayItem>
    </Overlay>
  )
}