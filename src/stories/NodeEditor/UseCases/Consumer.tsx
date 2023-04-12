import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect, useRef } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./generated/glsl/vertex.vert?raw";
import fragment from "./generated/glsl/fragment.frag?raw";
import json from "./generated/nodeMaterial.json";
import { nodeEditorCode } from "./generated/code.generated";
import { IUseCases } from "./UseCases";
import "@babylonjs/core/Shaders/ShadersInclude/helperFunctions";

export const Consumer = () => {
  const {
    context: { scene, camera, float },
  } = useContext<IUseCases>();
  const generateNodeMaterialRef = useRef<BABYLON.NodeMaterial>();
  const shaderMaterialRef = useRef<BABYLON.ShaderMaterial>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
      // Shader
      const box = BABYLON.CreateBox("box", {
        width: 10,
        height: 10,
        depth: 10,
      });
      box.position = new BABYLON.Vector3(-6, 0, 0);

      // JSON
      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
          width: 10,
          height: 10,
          subdivisions: 100,
        },
        scene
      );

      // Code
      const sphere = BABYLON.CreateSphere("sphere", {
        diameter: 10,
      });
      sphere.position = new BABYLON.Vector3(11, 0, 0);

      const shaderMaterial = new BABYLON.ShaderMaterial(
        "shader",
        scene,
        {
          vertexSource: vertex,
          fragmentSource: fragment,
        },
        {
          attributes: ["position", "normal", "uv"],
          uniforms: [
            "world",
            "worldView",
            "worldViewProjection",
            "view",
            "projection",
          ],
        }
      );
      shaderMaterialRef.current = shaderMaterial;
      shaderMaterial.setFloat("u_Float", float);

      box.material = shaderMaterial;

      const parseNodeMaterial = BABYLON.NodeMaterial.Parse(json, scene);
      parseNodeMaterial.build();

      ground.material = parseNodeMaterial;
      ground.material.backFaceCulling = false;

      const generateNodeMaterial = nodeEditorCode(scene);
      generateNodeMaterialRef.current = generateNodeMaterial;

      sphere.material = generateNodeMaterial;
      sphere.material.backFaceCulling = false;
    }
  }, [scene]);

  useEffect(() => {
    if (generateNodeMaterialRef.current) {
      const generateNodeMaterial = generateNodeMaterialRef.current;

      console.log("generateNodeMaterial", generateNodeMaterial);

      const getInputBlocks = generateNodeMaterial.getInputBlocks();

      const Float = getInputBlocks.find(({ name }) => name === "Float");

      if (Float) {
        Float.value = float;
      }
    }

    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.setFloat("u_Float", float);
    }
  }, [float]);

  return <Canvas />;
};
