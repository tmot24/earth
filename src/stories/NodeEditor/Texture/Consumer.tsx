import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import { ITexture } from "./Texture";
import json from "./generated/nodeMaterial.json";

export const Consumer = () => {
  const {
    context: { scene },
  } = useContext<ITexture>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
      const ground = BABYLON.MeshBuilder.CreateBox(
        "ground",
        {
          width: 10,
          height: 10,
          depth: 10,
        },
        scene
      );

      const parseNodeMaterial = BABYLON.NodeMaterial.Parse(json, scene);
      parseNodeMaterial.backFaceCulling = true;
      parseNodeMaterial.build();

      ground.material = parseNodeMaterial;
    }
  }, [scene]);

  return <Canvas />;
};
