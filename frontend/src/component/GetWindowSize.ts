import { useEffect, useState } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    let rafId: number | null = null;

    const onResize = (): void => {
      // 如果这一帧已经排队了，就不再重复排
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        rafId = null;
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return size;
}
