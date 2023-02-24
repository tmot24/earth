import { useEffect } from "react";
import { useContext } from "../../context";
import { CreateSphere } from "./CreateSphere";

/** Создание сферы */
export const useSphere = () => {
  const { context } = useContext();
  const { scene, camera } = context;

  useEffect(() => {
    if (scene && camera) {
      const meshes = new CreateSphere({ scene, camera });

      meshes.createRawSphere();
    }
  }, [scene, camera]);
};
