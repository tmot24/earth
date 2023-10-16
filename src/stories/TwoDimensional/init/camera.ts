import * as BABYLON from "@babylonjs/core";
import {
  ArcRotateCamera,
  ArcRotateCameraMouseWheelInput,
  EventConstants,
  EventState,
  ICameraInput,
  IWheelEvent,
  Matrix,
  Nullable,
  Observer,
  Plane,
  PointerEventTypes,
  PointerInfo,
  Scalar,
  serialize,
  TmpVectors,
  Vector3,
} from "@babylonjs/core";

/**
 * Firefox uses a different scheme to report scroll distances to other
 * browsers. Rather than use complicated methods to calculate the exact
 * multiple we need to apply, let's just cheat and use a constant.
 * https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/deltaMode
 * https://stackoverflow.com/questions/20110224/what-is-the-height-of-a-line-in-a-wheel-event-deltamode-dom-delta-line
 */
const FF_MULTIPLIER = 40;

export class CustomWheel implements ICameraInput<ArcRotateCamera> {
  private _wheel: Nullable<(p: PointerInfo, s: EventState) => void> = null;
  private _inertialPanning: Vector3 = Vector3.Zero();
  private _observer: Nullable<Observer<PointerInfo>> = null;

  public camera: BABYLON.ArcRotateCamera;
  /**
   * Получает или задает логическое значение, определяющее,
   * приближается ли колесико мыши к местоположению указателя мыши или нет. Значение по умолчанию — ложь.
   * */
  @serialize()
  public zoomToMouseLocation = false;
  /**
   * WheelDeltaPercentage будет использоваться вместо wheelPrecision, если значение отличается от 0.
   * Он определяет процент текущего значения camera.radius для использования в качестве дельты при использовании колеса.
   */
  @serialize()
  public wheelDeltaPercentage = 0;
  /**
   * Gets or Set the mouse wheel precision or how fast is the camera zooming.
   */
  @serialize()
  public wheelPrecision = 3.0;

  private _hitPlane: Nullable<Plane> = null;

  /**
   * Если установлено, эта функция будет использоваться для установки дельты радиуса, которая будет добавлена к текущему радиусу камеры.
   */
  public customComputeDeltaFromMouseWheel: Nullable<
    (wheelDelta: number, input: CustomWheel, event: IWheelEvent) => number
  > = null;

  constructor(camera: BABYLON.ArcRotateCamera) {
    this.camera = camera;
  }

  attachControl(noPreventDefault?: boolean): void {
    console.log("CustomWheel attachControl");

    this._wheel = (pointerInfo) => {
      // проверка работоспособности — это должно быть событие PointerWheel.
      if (pointerInfo.type !== PointerEventTypes.POINTERWHEEL) {
        console.log("wheel1");
        return;
      }
      console.log("wheel");
      const event = <IWheelEvent>pointerInfo.event;
      let delta = 0;

      // Если для этого установлено значение DOM_DELTA_LINE, отрегулируйте соответствующим образом
      const platformScale =
        event.deltaMode === EventConstants.DOM_DELTA_LINE ? FF_MULTIPLIER : 1;

      const wheelDelta = -(event.deltaY * platformScale);

      if (this.customComputeDeltaFromMouseWheel) {
        delta = this.customComputeDeltaFromMouseWheel(wheelDelta, this, event);
      } else {
        if (this.wheelDeltaPercentage) {
          delta = this._computeDeltaFromMouseWheelLegacyEvent(
            wheelDelta,
            this.camera.radius
          );

          // При увеличении оцените целевой радиус и используйте его для вычисления дельты для инерции
          // это предотвратит увеличение масштаба нескольких событий прокрутки из-за добавления слишком большой инерции
          if (delta > 0) {
            let estimatedTargetRadius = this.camera.radius;
            let targetInertia = this.camera.inertialRadiusOffset + delta;
            for (let i = 0; i < 20 && Math.abs(targetInertia) > 0.001; i++) {
              estimatedTargetRadius -= targetInertia;
              targetInertia *= this.camera.inertia;
            }

            estimatedTargetRadius = Scalar.Clamp(
              estimatedTargetRadius,
              0,
              Number.MAX_VALUE
            );
            delta = this._computeDeltaFromMouseWheelLegacyEvent(
              wheelDelta,
              estimatedTargetRadius
            );
          }
        } else {
          delta = wheelDelta / (this.wheelPrecision * 40);
        }
      }

      if (delta) {
        if (this.zoomToMouseLocation && this._hitPlane) {
          this._zoomToMouse(delta);
        } else {
          this.camera.inertialRadiusOffset += delta;
        }
      }
    };

    this._observer = this.camera
      .getScene()
      ._inputManager._addCameraPointerObserver(
        this._wheel,
        PointerEventTypes.POINTERWHEEL
      );

    if (this.zoomToMouseLocation) {
      this._inertialPanning.setAll(0);
    }
  }

  detachControl(): void {}

  getClassName(): string {
    return "CustomWheel";
  }

  getSimpleName(): string {
    return "CustomWheel";
  }

  protected _computeDeltaFromMouseWheelLegacyEvent(
    mouseWheelDelta: number,
    radius: number
  ) {
    let delta = 0;
    const wheelDelta =
      mouseWheelDelta * 0.01 * this.wheelDeltaPercentage * radius;
    if (mouseWheelDelta > 0) {
      delta = wheelDelta / (1.0 + this.wheelDeltaPercentage);
    } else {
      delta = wheelDelta * (1.0 + this.wheelDeltaPercentage);
    }
    return delta;
  }

  private _zoomToMouse(delta: number) {
    const camera = this.camera;
    const inertiaComp = 1 - camera.inertia;
    if (camera.lowerRadiusLimit) {
      const lowerLimit = camera.lowerRadiusLimit ?? 0;
      if (
        camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp <
        lowerLimit
      ) {
        delta =
          (camera.radius - lowerLimit) * inertiaComp -
          camera.inertialRadiusOffset;
      }
    }
    if (camera.upperRadiusLimit) {
      const upperLimit = camera.upperRadiusLimit ?? 0;
      if (
        camera.radius - (camera.inertialRadiusOffset + delta) / inertiaComp >
        upperLimit
      ) {
        delta =
          (camera.radius - upperLimit) * inertiaComp -
          camera.inertialRadiusOffset;
      }
    }

    const zoomDistance = delta / inertiaComp;
    const ratio = zoomDistance / camera.radius;
    const vec = this._getPosition();

    // Теперь этот вектор говорит нам, насколько нам также нужно панорамировать камеру
    // таким образом, целевое положение мыши становится центром масштабирования.

    const directionToZoomLocation = TmpVectors.Vector3[6];
    vec.subtractToRef(camera.target, directionToZoomLocation);
    directionToZoomLocation.scaleInPlace(ratio);
    directionToZoomLocation.scaleInPlace(inertiaComp);
    this._inertialPanning.addInPlace(directionToZoomLocation);

    camera.inertialRadiusOffset += delta;
  }

  // Получить позицию
  private _getPosition(): Vector3 {
    const camera = this.camera;
    const scene = camera.getScene();

    // Так как _hitPlane всегда обновляется, чтобы быть ортогональным вектору положения камеры
    // нам не нужно беспокоиться об уходе этого луча в бесконечность. Этот луч создает
    // вектор, определяющий, к чему мы хотим приблизиться.
    const ray = scene.createPickingRay(
      scene.pointerX,
      scene.pointerY,
      Matrix.Identity(),
      camera,
      false
    );
    let distance = 0;
    if (this._hitPlane) {
      distance = ray.intersectsPlane(this._hitPlane) ?? 0;
    }

    // not using this ray again, so modifying its vectors here is fine
    return ray.origin.addInPlace(ray.direction.scaleInPlace(distance));
  }
}
