import { useCallback, useContext, useMemo } from "react";
import { useMediaPlaying } from "../../hooks/app/useMediaPlaying";
import { useControls } from "../../state/player";
import { PauseIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/outline";
import styled, { ThemeContext } from "styled-components";

const StyledPlayButton = styled(PlayIcon)`
  cursor: pointer;
  &:hover {
    color: ${({theme}) => theme.color.primary};
    transform: scale(1.2);
  }
  transition: all .3s;
`;
const StyledPauseButton = styled(PauseIcon)`
  cursor: pointer;
  &:hover {
    color: ${({theme}) => theme.color.primary};
    transform: scale(1.2);
  }
  transition: all .3s;
`;

export const PlayPauseButton = () => {
  const theme = useContext(ThemeContext);
  const controls = useControls();
  const mediaPlaying = useMediaPlaying();

  const handlePlayPause = useCallback(() => {
    if (mediaPlaying.isPlaying) controls.pause();
    else controls.play();
  }, [mediaPlaying, controls]);

  const Button = useMemo(() => mediaPlaying.isPlaying ? StyledPauseButton : StyledPlayButton, [mediaPlaying.isPlaying]);

  return (
    <Button width={theme?.iconSize} height={theme?.iconSize} color="white" onClick={handlePlayPause} />
  )
}