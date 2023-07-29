import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  /** Used in Fish Jump game 
   * native setInterval() as react custom hook repeated calling the function
  */
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const intervalId = setInterval(tick, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
}

export default useInterval;
