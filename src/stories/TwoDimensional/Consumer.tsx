import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useAxes } from "../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../context";
import { useInit } from "./init/useInit";
import { ITwoDimensional } from "./TwoDimensional";
import * as BABYLON from "@babylonjs/core";

export const Consumer = () => {
  const {
    context: { scene, camera },
  } = useContext<ITwoDimensional>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    const ground = BABYLON.CreatePlane("ground", {
      height: 10,
      width: 10,
    });

    const shaderMaterial = new BABYLON.StandardMaterial("defaultMaterial");
    shaderMaterial.emissiveColor = BABYLON.Color3.Red();

    ground.material = shaderMaterial;
  }, [scene]);

  useEffect(() => {}, []);

  return <Canvas />;
};
