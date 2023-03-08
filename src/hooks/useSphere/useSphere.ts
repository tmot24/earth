import { useEffect, useRef } from "react";
import { useContext } from "../../context";
import { CreateSphere } from "./CreateSphere";
import * as BABYLON from "@babylonjs/core";

/** Создание сферы */
export const useSphere = () => {
  const { context } = useContext();
  const { scene, camera } = context;
  const meshes = useRef<BABYLON.Mesh[]>([]);

  useEffect(() => {
    if (scene && camera) {
      const sphere = new CreateSphere({ scene, camera });

      sphere.createRawSphere();
      sphere.sphereMesh && meshes.current.push(sphere.sphereMesh);
    }
    return () => {
      meshes.current.forEach((obj) => obj.dispose(false, true));
    };
  }, [scene, camera]);
};
