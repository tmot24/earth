import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import "@babylonjs/node-editor";

export class InitBabylon {
  private textBlock: GUI.TextBlock;
  readonly engine: BABYLON.Engine;
  readonly scene: BABYLON.Scene;
  readonly camera: BABYLON.ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas);
    this.scene = new BABYLON.Scene(this.engine);

    this.scene.clearColor = new BABYLON.Color4(0, 0.2, 0.4);

    this.camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 3,
      Math.PI / 3,
      20,
      BABYLON.Vector3.Zero(),
      this.scene
    );

    this.camera.attachControl();
    /** Увеличение по курсору */
    this.camera.zoomToMouseLocation = true;
    /** Скорость прокрутки */
    this.camera.wheelPrecision = 50;
    /** Обрезание фигур при приближении */
    this.camera.minZ = 0;
    /** Минимальное приближение */
    this.camera.lowerRadiusLimit = 1;
    /** Максимальное отдаление */
    this.camera.upperRadiusLimit = 40;
    /** Отключение перемещение объектов по ПКМ (при setTarget ПКМ отключён)*/
    // this.camera.panningSensibility = 0;
    /** Поведение камеры */
    this.camera.useFramingBehavior = true;
    // /** Убрать восстановление камеры по оси Y */
    this.camera.framingBehavior
      ? (this.camera.framingBehavior.elevationReturnTime = -1)
      : undefined;

    // const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 0, -1), this.scene);

    const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
      "UI",
      true,
      this.scene
    );

    this.textBlock = new GUI.TextBlock(
      "textBlock",
      `FPS: ${this.engine.getFps().toFixed(0)}`
    );

    this.textBlock.color = "white";
    this.textBlock.fontSize = 14;
    this.textBlock.width = "50px";
    this.textBlock.height = "14px";
    this.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    this.textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

    advancedTexture.addControl(this.textBlock);

    this.engine.runRenderLoop(() => {
      this.engine.resize();
      this.scene.render();
      this.textBlock.text = `FPS: ${this.engine.getFps().toFixed(0)}`;
    });
  }
}
