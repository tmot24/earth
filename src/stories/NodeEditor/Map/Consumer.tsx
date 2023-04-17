import {Canvas} from "../../../components/Canvas/Canvas";
import {useDebugLayer} from "../../../hooks/useDebugLayer/useDebugLayer";
import {useInit} from "../../../hooks/useInit/useInit";
import {useAxes} from "../../../hooks/useAxes/useAxes";
import {useEffect} from "react";
import {useContext} from "../../../context";
import * as BABYLON from "@babylonjs/core";
import {IMap} from "./Map";
import {data} from "./data";
import {nodeEditorCode} from "./generated/code.generated";

export const Consumer = () => {
  const {
    context: {scene},
  } = useContext<IMap>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
      const plane = BABYLON.MeshBuilder.CreatePlane(
          "plane",
          {
            width: 10,
            height: 10,
          },
          scene
      );

      const uint8Array = data.body.flatMap((value) => scale(value));

      const maskUint8Array = data.body.flatMap((value) => {
        if (value === 12) {
          return 0;
        } else if (value === 1) {
          return 0;
        } else {
          return 255;
        }
      });

      const arrayBuffer = new Uint8Array(uint8Array);
      const maskArrayBuffer = new Uint8Array(maskUint8Array);

      const dataTexture = BABYLON.RawTexture.CreateLuminanceTexture(
          arrayBuffer,
          data.cols,
          data.rows,
          scene,
          false,
          true,
          BABYLON.Texture.LINEAR_LINEAR
      );

      const maskTexture = BABYLON.RawTexture.CreateLuminanceTexture(
          maskArrayBuffer,
          data.cols,
          data.rows,
          scene,
          false,
          true,
          BABYLON.Texture.NEAREST_LINEAR
      );

      const generateNodeMaterial = nodeEditorCode(
          scene,
          dataTexture,
          maskTexture
      );

      plane.material = generateNodeMaterial;
      plane.material.backFaceCulling = false;
    }
  }, [scene]);

  return <Canvas/>;
};

const scale = (old: number) => {
  const old_min = data.min;
  const old_max = data.max;
  const new_min = 0;
  const new_max = 255;

  const old_range = old_max - old_min;
  const new_range = new_max - new_min;
  const converted = ((old - old_min) * new_range) / old_range + new_min;

  return Math.round(converted);
};
