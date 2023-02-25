import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../hooks/useInit/useInit";
import { useSphere } from "../../hooks/useSphere/useSphere";
import { useAxes } from "../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../context";
import * as BABYLON from "@babylonjs/core";
import { IClipPlanes } from "./ClipPlanes";
import { Mesh } from "@babylonjs/core";

export const ClipPlanesImp = () => {
  const {
    context: { scene, clipHorizontal, clipVertical },
  } = useContext<IClipPlanes>();

  useInit();
  useAxes();
  useDebugLayer();
  useSphere();

  useEffect(() => {
    if (scene) {
      const sphere = scene?.getMeshByName("sphere") as Mesh;

      sphere?.onBeforeRenderObservable.add(() => {
        scene.clipPlane = new BABYLON.Plane(0, 1, 0, clipHorizontal);
        scene.clipPlane2 = new BABYLON.Plane(1, 0, 0, clipVertical);
      });
      /** Позволяет обрезать только сферу */
      sphere?.onAfterRenderObservable.add(() => {
        scene.clipPlane = null;
        scene.clipPlane2 = null;
      });
    }
  });

  return <Canvas />;
};
