import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import vertex from "./glsl/vertex.vert?raw";
import fragment from "./glsl/fragment.frag?raw";
import { ITexture } from "./Texture";
import grass from "../../../images/grass.jpeg";
import sand from "../../../images/sand.jpeg";
import ussr from "../../../images/ussr.jpeg";

export const Consumer = () => {
  const {
    context: { scene, camera },
  } = useContext<ITexture>();

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
          samplers: ["textureGrass", "textureSand", "textureUssr"],
          defines: ["MyDefine"],
          needAlphaBlending: true,
          needAlphaTesting: true,
        }
      );

      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        {
          width: 10,
          height: 10,
          subdivisions: 100,
        },
        scene
      );

      const textureGrass = new BABYLON.Texture(grass, scene);
      shaderMaterial.setTexture("textureGrass", textureGrass);
      const textureSand = new BABYLON.Texture(sand, scene);
      shaderMaterial.setTexture("textureSand", textureSand);
      const textureUssr = new BABYLON.Texture(ussr, scene);
      shaderMaterial.setTexture("textureUssr", textureUssr);

      ground.material = shaderMaterial;
      camera?.setTarget(ground);
    }
  }, [scene]);

  return <Canvas />;
};
