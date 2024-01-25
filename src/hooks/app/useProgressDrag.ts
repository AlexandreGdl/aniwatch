import { RefObject, useEffect, useState } from "react";

export type MouseActivity = React.MouseEvent<HTMLElement> | MouseEvent;

type ActivityEvent = MouseActivity | React.TouchEvent<HTMLElement> | TouchEvent;

type ProgressDragProps = {
  ref: RefObject<HTMLElement>;
  commit: (val: number, play?: boolean) => void;
}

function isClickEvent(
  evt: ActivityEvent
): evt is React.MouseEvent<HTMLElement> | MouseEvent {
  return (
    evt.type === "mousedown" ||
    evt.type === "mouseup" ||
    evt.type === "mousemove"
  );
}

const getEventX = (evt: ActivityEvent) => {
  return isClickEvent(evt) ? evt.pageX : evt.changedTouches[0].pageX;
};

export const useProgressDrag = ({ref, commit}: ProgressDragProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  function handleDraggingStart() {
    setIsDragging(true);
  }

  useEffect(() => {
    function handleMouseMove(e: ActivityEvent) {
      if (!isDragging || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const pos = (getEventX(e) - rect.left) / ref.current.offsetWidth;
      setProgress(pos * 100);
      commit(pos);
    }

    function handleMouseUp(e: ActivityEvent) {
      if (!isDragging) return;
      setIsDragging(false);

      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const pos = (getEventX(e) - rect.left) / ref.current.offsetWidth;
      setProgress(pos * 100);
      commit(pos, true);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseUp);
    }
  }, [isDragging, ref, commit]);
  // On touchStart -> add event mouse move on whole document,
  // Track the x value and return it
  // On mousedown -> remove thoses handler,

  

  return {
    progress,
    isDragging,
    onStart: handleDraggingStart
  };
}