import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../hooks/useInit/useInit";
import { useEffect } from "react";
import { useContext } from "../../context";
import { ISeismic } from "./Seismic";
import { CreateMeshes } from "./CreateMeshes";
import { response } from "./response";

export const SeismicImp = () => {
  const { context } = useContext<ISeismic>();
  const { scene, camera } = context;

  useInit();
  useDebugLayer();

  useEffect(() => {
    if (scene && camera) {
      const meshes = new CreateMeshes({ scene, camera });

      meshes.createSeismic(response);

      // fetch("http://127.0.0.1:8000/babylon")
      //   .then((response) => response.json())
      //   .then((response) => {
      //     console.log("response", response);
      //     meshes.createSeismic(response);
      //   })
      //   .catch((error) => console.error("error", error));
    }
  }, [scene, camera]);

  return <Canvas />;
};
