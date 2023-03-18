import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./glsl/vertex.vert?raw";
import fragment from "./glsl/fragment.frag?raw";
import { IVertexOffset } from "./VertexOffset";

export const Consumer = () => {
  const {
    context: { scene, camera },
  } = useContext<IVertexOffset>();

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
      shaderMaterial.sideOrientation = BABYLON.Mesh.DOUBLESIDE;

      shaderMaterial.setFloat("PI", Math.PI);

      let time = 0;

      scene.registerBeforeRender(() => {
        shaderMaterial.setFloat("time", time);
        time += 0.002;
      });

      const ground = BABYLON.CreateGround("ground", {
        subdivisions: 100,
        height: 10,
        width: 10,
      });

      ground.material = shaderMaterial;

      camera?.setTarget(ground);
    }
  }, [scene]);

  useEffect(() => {}, []);

  return <Canvas />;
};
