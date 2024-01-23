import styled from "styled-components"
import { updateProgress, useMediaProgress } from "../../hooks/app/useMediaProgress";
import { makePercentage, makePercentageString } from "../../utils";
import { useMemo, useState } from "react";
import moment from "moment";
import { getPlayerState, useControls } from "../../state/player";

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
  background-color: #eb6f6f; 
  height: 100%;
  border-radius: 50px;
  cursor: grab;
  transition: all .5s;
`;
const TimeText = styled('p')`
  width: 45px;
  text-align: center;
`;

export const MediaProgress = () => {
  const [isDragging, setIsDragging] = useState(false);
  const mediaProgress = useMediaProgress();
  const controls = useControls();
  const prettyTime = useMemo(() => moment.utc(1000 * mediaProgress.time).format('mm[:]ss'), [mediaProgress.time]);
  const prettyDuration = useMemo(() => moment.utc(1000 * mediaProgress.duration).format('mm[:]ss'), [mediaProgress.duration]);

  const timeAsPercentage = makePercentageString(
    makePercentage((mediaProgress.time / mediaProgress.duration) * 100)
  );
  const draggingAsPercentage = makePercentageString(
    makePercentage((mediaProgress.draggingTime / mediaProgress.duration) * 100)
  );

  function handleProgressDrag(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const state = getPlayerState();
    controls.pause();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // update dragging time
    const dragginPercentage = makePercentage((x / rect.width) * 100);
    const time = state.progress.duration * (dragginPercentage/100);
    state.progress.draggingTime = time;
    updateProgress(state);
  }

  function handleProgressDrop(e: React.DragEvent<HTMLDivElement>) {
    setIsDragging(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const state = getPlayerState();
    const newTimePercentage = makePercentage((x / rect.width) * 100);
    // I take the react.width, make a percentage
    const newTime = state.progress.duration * (newTimePercentage/100);
    state.progress.time = newTime;
    updateProgress(state);
    controls.setTime(newTime);
    controls.play();
  }

  function handleDragStart() {
    setIsDragging(true);
  }

  return (
    <Container>
      <TimeText>{prettyTime}</TimeText>
      <DefaultProgress draggable onDragEnd={handleProgressDrop} onDrag={handleProgressDrag} onDragStart={handleDragStart}>
        <ActiveProgress style={{width: isDragging ? draggingAsPercentage : timeAsPercentage}} />
      </DefaultProgress>
      <TimeText>{prettyDuration}</TimeText>
    </Container>
  )
}