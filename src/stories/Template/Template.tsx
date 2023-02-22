import { useEffect, useRef } from "react";

import { BasicBabylon } from "../BasicBabylon";

export const Template = () => {
  const babylonCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = babylonCanvas.current;

    if (canvas) {
      const { scene, camera } = new BasicBabylon(canvas);
    }
  }, []);

  return (
    <canvas style={{ width: "100%", height: "100%" }} ref={babylonCanvas} />
  );
};
