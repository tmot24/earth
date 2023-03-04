import { Canvas } from "../../components/Canvas/Canvas";
import { useDebugLayer } from "../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../hooks/useInit/useInit";
import { useAxes } from "../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./glsl/vertex.glsl?raw";
import fragment from "./glsl/fragment.frag?raw";
import earth from "./glsl/earth.svg";
import amiga from "./glsl/amiga.jpg";

console.log("vertex", vertex);
console.log("typeof vertex", typeof vertex);
console.log("fragment", fragment);
console.log("typeof fragment", typeof fragment);

export const TemplateImp = () => {
  const {
    context: { scene, camera },
  } = useContext();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    console.log("vertex", vertex);
    console.log("fragment", fragment);
    if (scene) {
      // console.log("vertex", vertex);
      // console.log("fragment", fragment);

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

      const mainTexture = new BABYLON.Texture(amiga, scene);

      shaderMaterial.setTexture("textureSampler", mainTexture);

      shaderMaterial.backFaceCulling = false;

      const box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
      box.material = shaderMaterial;
    }
  });

  return <Canvas />;
};
