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

  createMeshes = () => {
    const ground: BABYLON.GroundMesh = BABYLON.MeshBuilder.CreateGround(
      "ground",
      {
        width: 10,
        height: 10,
      },
      this.scene
    );

    this.camera.setTarget(ground);

    const groundMaterial = new BABYLON.StandardMaterial(
      "groundMaterial",
      this.scene
    );

    groundMaterial.emissiveColor = new BABYLON.Color3(0.23, 0.63, 0.18);

    ground.material = groundMaterial;

    const ball = BABYLON.MeshBuilder.CreateSphere(
      "ball",
      {
        diameter: 1,
      },
      this.scene
    );

    ball.position.y = 1;

    const ballMaterial = new BABYLON.StandardMaterial(
      "ballMaterial",
      this.scene
    );

    ballMaterial.emissiveColor = new BABYLON.Color3(1, 0.81, 0.28);

    ball.material = ballMaterial;
  };

  createRawSphere = () => {
    const sphere = BABYLON.MeshBuilder.CreateSphere(
      "sphere",
      {
        diameter: 3,
      },
      this.scene
    );

    sphere.position.set(0, 0, 0);
    this.camera.setTarget(sphere);
    sphere.rotate(new BABYLON.Vector3(0, 1, 0), 1);

    // const plane = BABYLON.MeshBuilder.CreatePlane(
    //   'plane',
    //   {
    //     width: 18,
    //     height: 8,
    //     sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    //   },
    //   this.scene,
    // );

    // this.camera.setTarget(sphere);

    // const pixels = new Uint8Array([255, 0, 0, 0, 255, 0, 0, 0, 255, 0, 0, 0]);
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

    texture.name = "FragmentTexture";

    const material = new BABYLON.StandardMaterial("material", this.scene);

    material.emissiveTexture = texture;

    sphere.material = material;
    // plane.material = material;
  };

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

    const material = new BABYLON.StandardMaterial("planeMaterial", this.scene);

    material.emissiveTexture = texture;

    plane.material = material;
  };
}
