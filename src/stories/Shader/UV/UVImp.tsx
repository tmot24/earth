import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./glsl/vertex.vert?raw";
import fragment from "./glsl/fragment.frag?raw";
import { IUV } from "./UV";

export const UVImp = () => {
  const {
    context: { scene, camera, startColor, endColor },
  } = useContext<IUV>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
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
            "direction",
          ],
          samplers: ["textureSampler"],
          defines: ["MyDefine"],
          needAlphaBlending: true,
          needAlphaTesting: true,
        }
      );

      shaderMaterial.setFloat("startColor", startColor);
      shaderMaterial.setFloat("endColor", endColor);

      const box = BABYLON.MeshBuilder.CreatePlane(
        "box",
        {
          size: 2,
        },
        scene
      );
      box.material = shaderMaterial;
      camera?.setTarget(box);
    }
  });

  return <Canvas />;
};