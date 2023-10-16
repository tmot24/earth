import * as BABYLON from "@babylonjs/core";
import {
  ArcRotateCameraMouseWheelInput,
  ArcRotateCameraPointersInput,
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/node-editor";
import { ui } from "./ui";

export class InitBabylon {
  private textBlock: GUI.TextBlock;
  readonly engine: BABYLON.Engine;
  readonly scene: BABYLON.Scene;
  readonly camera: BABYLON.ArcRotateCamera;
  readonly inputManager: BABYLON.ArcRotateCameraInputsManager;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas);
    this.scene = new BABYLON.Scene(this.engine);

    this.scene.clearColor = new BABYLON.Color4(0, 0.2, 0.4);

    this.camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2,
      20,
      BABYLON.Vector3.Zero(),
      this.scene
    );
    // перемещение на ЛКМ
    this.camera.attachControl(false, false, 0);

    const pointersInput = this.camera.inputs.attached
      .pointers as ArcRotateCameraPointersInput;

    // отключение индексов действий камеры на СКМ(1) и ПКМ(2)
    pointersInput.buttons = [0];

    this.inputManager = this.camera.inputs;

    this.inputManager.attached.keyboard.detachControl();

    /** Увеличение по курсору */
    this.camera.zoomToMouseLocation = false;
    /** Обрезание фигур при приближении */
    this.camera.minZ = 0;
    /** Минимальное приближение */
    this.camera.lowerRadiusLimit = 10;

    this.textBlock = ui(this.engine, this.scene);

    this.engine.runRenderLoop(() => {
      this.engine.resize();
      this.scene.render();
      this.textBlock.text = `FPS: ${this.engine.getFps().toFixed(0)}`;

      this.camera.panningSensibility =
        1000 / Math.abs(this.camera.position.z * 0.1);
    });
  }
}
