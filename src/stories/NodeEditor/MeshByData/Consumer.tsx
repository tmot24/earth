import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import { IMeshByData } from "./MeshByData";

export const Consumer = () => {
  const {
    context: { scene },
  } = useContext<IMeshByData>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
      // const customMesh = new BABYLON.Mesh("custom", scene);
      //
      // const position = [
      //   [0, 1, 0],
      //   [1, 1, 0],
      //   [0, 0, 0],
      //   [1, 0, 0],
      // ].flatMap((value) => value);
      //
      // const indices = [0, 1, 2, 3, 2, 4];
      //
      // const vertexData = new BABYLON.VertexData();
      //
      // vertexData.positions = position;
      // vertexData.indices = indices;
      //
      // vertexData.applyToMesh(customMesh);
      //
      // const mat = new BABYLON.StandardMaterial("mat", scene);
      // mat.emissiveColor = BABYLON.Color3.Red();
      // mat.wireframe = true;
      // customMesh.material = mat;

      const customMesh = new BABYLON.Mesh("custom", scene);

      //Set arrays for positions and indices
      // const positions = [
      //   -5, 2, -3, -7, -2, -3, -3, -2, -3, 5, 2, 3, 7, -2, 3, 3, -2, 3,
      // ];

      const positions = [
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
        [1, 0, 0],
      ].flatMap((value) => value);

      const indices = [0, 1, 2, 1, 3, 2];

      //Create a vertexData object
      const vertexData = new BABYLON.VertexData();

      //Assign positions and indices to vertexData
      vertexData.positions = positions;
      vertexData.indices = indices;

      //Apply vertexData to custom mesh
      vertexData.applyToMesh(customMesh);

      /******Display custom mesh in wireframe view to show its creation****************/
      const mat = new BABYLON.StandardMaterial("mat", scene);
      mat.wireframe = true;
      mat.backFaceCulling = false;
      mat.emissiveColor = BABYLON.Color3.Red();
      customMesh.material = mat;
    }
  }, [scene]);

  return <Canvas />;
};
