import { Canvas } from "../../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../../hooks/useInit/useInit";
import { useAxes } from "../../../../hooks/useAxes/useAxes";
import { useEffect, useRef } from "react";
import { useContext } from "../../../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./glsl/vertex.vert?raw";
import fragment from "./glsl/fragment.frag?raw";
import { IHealthBar } from "./HealthBar";

export const Consumer = () => {
  const {
    context: { scene, camera, health },
  } = useContext<IHealthBar>();
  const shaderMaterialRef = useRef<BABYLON.ShaderMaterial>();

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
            "time",
            "direction",
          ],
          samplers: ["textureSampler"],
          defines: ["MyDefine"],
          needAlphaBlending: true,
          needAlphaTesting: true,
        }
      );

      shaderMaterialRef.current = shaderMaterial;

      // Сделать прозрачным чёрный цвет + возможность указать alpha
      shaderMaterial.alphaMode = BABYLON.Engine.ALPHA_ADD;

      shaderMaterial.setFloat("health", health);

      const ground = BABYLON.MeshBuilder.CreatePlane(
        "ground",
        {
          width: 10,
          height: 1,
        },
        scene
      );

      ground.material = shaderMaterial;
      camera?.setTarget(ground);
    }
  }, [scene]);

  useEffect(() => {
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.setFloat("health", health);
    }
  }, [health]);

  return <Canvas />;
};
