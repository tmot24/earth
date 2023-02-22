import { useEffect, useRef } from "react";

import { BasicBabylon } from "../BasicBabylon";
import { CreateMeshes } from "./CreateMeshes";

export const Basic = () => {
  const babylonCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = babylonCanvas.current;

    if (canvas) {
      const { scene, camera } = new BasicBabylon(canvas);

      const meshes = new CreateMeshes({ scene, camera });

      meshes.createRawSphere();

      // fetch("http://127.0.0.1:8000/babylon")
      //   .then((response) => response.json())
      //   .then((response) => {
      //     console.log("response", response);
      //     meshes.createSeismic(response);
      //   })
      //   .catch((error) => console.error("error", error));
    }
  }, []);

  return (
    <canvas style={{ width: "100%", height: "100%" }} ref={babylonCanvas} />
  );
};
