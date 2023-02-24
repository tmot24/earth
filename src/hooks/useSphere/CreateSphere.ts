import * as BABYLON from "@babylonjs/core";

export class CreateSphere {
  private readonly scene: BABYLON.Scene;
  private readonly camera: BABYLON.ArcRotateCamera;
  public sphereMesh: BABYLON.Mesh | undefined;

  constructor({
    scene,
    camera,
  }: {
    scene: BABYLON.Scene;
    camera: BABYLON.ArcRotateCamera;
  }) {
    this.scene = scene;
    this.camera = camera;
  }

  createRawSphere = () => {
    this.sphereMesh = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      {
        diameter: 3,
      },
      this.scene
    );

    this.sphereMesh.position.set(0, 0, 0);
    this.camera.setTarget(this.sphereMesh);
    this.sphereMesh.rotate(new BABYLON.Vector3(0, 1, 0), 1);

    const pixels = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0]);

    const texture = new BABYLON.RawTexture(
      pixels,
      2,
      2,
      BABYLON.Constants.TEXTUREFORMAT_RGB,
      this.scene,
      false,
      true,
      BABYLON.Constants.TEXTURE_NEAREST_SAMPLINGMODE,
      BABYLON.Constants.TEXTURETYPE_UNSIGNED_INT,
      BABYLON.Constants.TEXTURE_CREATIONFLAG_STORAGE,
      true
    );

    const material = new BABYLON.StandardMaterial("planeMaterial", this.scene);
    material.backFaceCulling = true;

    material.emissiveTexture = texture;

    this.sphereMesh.material = material;
  };
}
