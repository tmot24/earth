import * as BABYLON from "@babylonjs/core";

type TSeismic = {
  file: string;
  data: number[];
  maxValue: number;
  minValue: number;
  traces: number;
  samples: number;
};

export class CreateMeshes {
  private readonly scene: BABYLON.Scene;
  private readonly camera: BABYLON.ArcRotateCamera;

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

  createSeismic = (props: TSeismic) => {
    const plane = BABYLON.MeshBuilder.CreatePlane(
      "plane",
      {
        width: 18,
        height: 8,
        sideOrientation: BABYLON.Mesh.DOUBLESIDE,
      },
      this.scene
    );

    this.camera.useFramingBehavior = false;

    // this.camera.setTarget(plane);

    const pixels = new Uint8Array(props.data);

    const texture = new BABYLON.RawTexture(
      pixels,
      props.traces,
      props.samples,
      BABYLON.Constants.TEXTUREFORMAT_LUMINANCE,
      this.scene,
      false,
      true,
      BABYLON.Constants.TEXTURE_NEAREST_SAMPLINGMODE,
      BABYLON.Constants.TEXTURETYPE_UNSIGNED_INT,
      BABYLON.Constants.TEXTURE_CREATIONFLAG_STORAGE,
      true
    );

    const material = new BABYLON.StandardMaterial("raw", this.scene);

    material.emissiveTexture = texture;

    plane.material = material;
  };
}
