import { useState, useEffect, RefObject } from 'react';

const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current || !('ResizeObserver' in window)) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return width;
};

export default useResizeObserver;
