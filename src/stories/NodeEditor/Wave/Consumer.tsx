import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import { IWave } from "./Wave";
import json from "./generated/nodeMaterial.json";

export const Consumer = () => {
  const {
    context: { scene },
  } = useContext<IWave>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
          width: 10,
          height: 10,
          subdivisions: 100,
        },
        scene
      );

      const parseNodeMaterial = BABYLON.NodeMaterial.Parse(json, scene);
      parseNodeMaterial.build();

      ground.material = parseNodeMaterial;
      ground.material.backFaceCulling = false;
    }
  }, [scene]);

  return <Canvas />;
};
