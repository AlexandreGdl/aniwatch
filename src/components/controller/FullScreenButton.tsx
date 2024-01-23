import { useContext, useMemo } from "react";
import { useMediaPlaying } from "../../hooks/app/useMediaPlaying";
import { useControls } from "../../state/player";
import styled, { ThemeContext } from "styled-components";
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/20/solid";

const StyledExtendIcon = styled(ArrowsPointingOutIcon)`
  cursor: pointer;
  &:hover {
    color: #eb6f6f;
    transform: scale(1.2);
  }
  transition: all .3s;
`;
const StyledRetractIcon = styled(ArrowsPointingInIcon)`
  cursor: pointer;
  &:hover {
    color: #eb6f6f;
    transform: scale(1.2);
  }
  transition: all .3s;
`;


export const FullScreenButton = () => {
  const theme = useContext(ThemeContext);
  const controls = useControls();
  const mediaPlaying = useMediaPlaying();

  const Button = useMemo(() => mediaPlaying.isFullscreen ? StyledRetractIcon : StyledExtendIcon, [mediaPlaying.isFullscreen]);

  function handleFullScreenAction() {
    if (mediaPlaying.isFullscreen) controls.exitFullScreen();
    else controls.enterFullScreen();
  }

  return (
    <Button width={theme?.iconSize} height={theme?.iconSize} color="white" onClick={handleFullScreenAction} />
  )
}