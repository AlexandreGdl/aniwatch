import styled from "styled-components"
import { useMemo, useRef } from "react";
import moment from "moment";
import { updateProgress, useMediaProgress } from "../../hooks/app/useMediaProgress";
import { makePercentage, makePercentageString } from "../../utils";
import { getPlayerState, useControls } from "../../state/player";
import { useProgressDrag } from "../../hooks/app/useProgressDrag";

const Container = styled('div')`
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const DefaultProgress = styled('div')`
  flex-grow: 1;
  height: 8px;
  background-color: #333333;
  border-radius: 8px;
  cursor: grab;
`;
const ActiveProgress = styled('div')`
  background-color: ${({theme}) => theme.color.primary}; 
  height: 100%;
  border-radius: 50px;
  cursor: grab;
  width: 0%;
`;
const TimeText = styled('p')`
  width: 45px;
  text-align: center;
`;

export const MediaProgress = () => {
  const mediaProgress = useMediaProgress();
  const progressRef = useRef<HTMLDivElement>(null);
  const controls = useControls();

  const commit = (value: number, play?: boolean) => {
    const state = getPlayerState();
    const newTime = state.progress.duration * value;
    state.progress.time = newTime;
    controls.setTime(newTime);
    updateProgress(state);

    if (play) {
      controls.play();
    }
  }

  const {onStart, progress, isDragging} = useProgressDrag({ref: progressRef, commit});
  const prettyTime = useMemo(() => moment.utc(1000 * mediaProgress.time).format('mm[:]ss'), [mediaProgress.time]);
  const prettyDuration = useMemo(() => moment.utc(1000 * mediaProgress.duration).format('mm[:]ss'), [mediaProgress.duration]);

  const timeAsPercentage = makePercentageString(
    makePercentage((mediaProgress.time / mediaProgress.duration) * 100)
  );
  const draggingAsPercentage = makePercentageString(
    makePercentage(progress)
  );

  function handleDragStart() {
    controls.pause();
    onStart();
  }

  return (
    <Container>
      <TimeText>{prettyTime}</TimeText>
      <DefaultProgress ref={progressRef} onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
        <ActiveProgress style={{width: isDragging ? draggingAsPercentage : timeAsPercentage}} />
      </DefaultProgress>
      <TimeText>{prettyDuration}</TimeText>
    </Container>
  )
}