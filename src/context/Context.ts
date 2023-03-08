import { createContext } from "react";
import * as BABYLON from "@babylonjs/core";

export type TBabylon = {
  canvas: HTMLCanvasElement | null;
  scene?: BABYLON.Scene;
  camera?: BABYLON.ArcRotateCamera;
  engine?: BABYLON.Engine;
};

export type TContext<T extends object> = T & TBabylon;

// @ts-ignore
export const Context = createContext<TContext<T>>({});
