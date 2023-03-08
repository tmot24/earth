import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect, useRef } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./glsl/vertex.vert?raw";
import fragment from "./glsl/fragment.frag?raw";
import { IWave } from "./Wave";

export const Consumer = () => {
  const {
    context: { scene, camera },
  } = useContext<IWave>();
  const meshes = useRef<BABYLON.Mesh[]>([]);

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
            "time",
          ],
          samplers: ["textureSampler"],
          defines: ["MyDefine"],
          needAlphaBlending: true,
          needAlphaTesting: true,
        }
      );

      shaderMaterial.setFloat("PI", Math.PI);

      let time = 0;

      scene.registerBeforeRender(() => {
        shaderMaterial.setFloat("time", time);
        time += 0.002;
      });

      const cylinder = BABYLON.MeshBuilder.CreateCylinder(
        "cylinder",
        {
          height: 0.4,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
        },
        scene
      );
      meshes.current.push(cylinder);

      // https://doc.babylonjs.com/features/featuresDeepDive/materials/using/blendModes
      shaderMaterial.alphaMode = BABYLON.Engine.ALPHA_ONEONE;
      cylinder.material = shaderMaterial;
      cylinder.hasVertexAlpha = true;

      const sphere = BABYLON.CreateSphere(
        "sphere",
        {
          diameter: 0.6,
        },
        scene
      );
      meshes.current.push(sphere);

      sphere.position.set(0, 0, 0);

      const color = new BABYLON.StandardMaterial("color", scene);

      color.emissiveColor = BABYLON.Color3.Random();

      sphere.material = color;

      camera?.setTarget(cylinder);
    }

    return () => {
      meshes.current.forEach((obj) => obj.dispose(false, true));
    };
  });

  return <Canvas />;
};
