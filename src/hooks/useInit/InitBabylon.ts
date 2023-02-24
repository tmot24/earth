import * as BABYLON from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export class InitBabylon {
  private readonly engine: BABYLON.Engine;
  readonly scene: BABYLON.Scene;
  readonly camera: BABYLON.ArcRotateCamera;

  constructor(canvas: HTMLCanvasElement) {
    this.engine = new BABYLON.Engine(canvas);
    this.scene = new BABYLON.Scene(this.engine);

    this.scene.clearColor = new BABYLON.Color4(0, 0.2, 0.4);

    const camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 3,
      Math.PI / 3,
      40,
      BABYLON.Vector3.Zero(),
      this.scene
    );

    camera.attachControl();
    /** Увеличение по курсору */
    camera.zoomToMouseLocation = true;
    /** Скорость прокрутки */
    camera.wheelPrecision = 50;
    /** Обрезание фигур при приближении */
    camera.minZ = 0;
    /** Минимальное приближение */
    camera.lowerRadiusLimit = 1;
    /** Максимальное отдаление */
    camera.upperRadiusLimit = 40;
    /** Отключение перемещение объектов по ПКМ (при setTarget ПКМ отключён)*/
    // camera.panningSensibility = 0;
    /** Возможность установить target */
    camera.useFramingBehavior = true;
    // /** Убрать восстановление камеры по оси Y */
    // camera.framingBehavior ? (camera.framingBehavior.elevationReturnTime = -1) : undefined;

    this.camera = camera;

    new BABYLON.AxesViewer();

    // const light = new BABYLON.HemisphericLight('HemiLight', new BABYLON.Vector3(0, 0, -1), this.scene);

    this.engine.runRenderLoop(() => {
      this.engine.resize();
      this.scene.render();
    });
  }
}
