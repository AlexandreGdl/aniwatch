import { useEffect, useState } from "react"

let timeout: undefined | number = undefined;
export const useIsMouseStatic = () => {
  const [isMouseStatic, setIsMouseStatic] = useState(false);

  useEffect(() => {
    document.addEventListener('mousemove', () => {
      setIsMouseStatic(false);
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsMouseStatic(true);
        
      }, (1500));
    });

    return () => {
      document.removeEventListener('mousemove', () => false);
    }
  }, []);

  return {isMouseStatic};
}