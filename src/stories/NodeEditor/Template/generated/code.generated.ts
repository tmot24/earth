import * as BABYLON from "@babylonjs/core";

export const nodeEditorCode = (scene: BABYLON.Scene) => {
  const nodeMaterial = new BABYLON.NodeMaterial("node", scene);

  // InputBlock
  const position = new BABYLON.InputBlock("position");
  position.visibleInInspector = false;
  position.visibleOnFrame = false;
  position.target = 1;
  position.setAsAttribute("position");

  // TransformBlock
  const WorldPos = new BABYLON.TransformBlock("WorldPos");
  WorldPos.visibleInInspector = false;
  WorldPos.visibleOnFrame = false;
  WorldPos.target = 1;
  WorldPos.complementZ = 0;
  WorldPos.complementW = 1;

  // InputBlock
  const World = new BABYLON.InputBlock("World");
  World.visibleInInspector = false;
  World.visibleOnFrame = false;
  World.target = 1;
  World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

  // TransformBlock
  const WorldPosViewProjectionTransform = new BABYLON.TransformBlock(
    "WorldPos * ViewProjectionTransform"
  );
  WorldPosViewProjectionTransform.visibleInInspector = false;
  WorldPosViewProjectionTransform.visibleOnFrame = false;
  WorldPosViewProjectionTransform.target = 1;
  WorldPosViewProjectionTransform.complementZ = 0;
  WorldPosViewProjectionTransform.complementW = 1;

  // InputBlock
  const ViewProjection = new BABYLON.InputBlock("ViewProjection");
  ViewProjection.visibleInInspector = false;
  ViewProjection.visibleOnFrame = false;
  ViewProjection.target = 1;
  ViewProjection.setAsSystemValue(
    BABYLON.NodeMaterialSystemValues.ViewProjection
  );

  // VertexOutputBlock
  const VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
  VertexOutput.visibleInInspector = false;
  VertexOutput.visibleOnFrame = false;
  VertexOutput.target = 1;

  // InputBlock
  const color = new BABYLON.InputBlock("color");
  color.visibleInInspector = false;
  color.visibleOnFrame = false;
  color.target = 1;
  color.value = new BABYLON.Color4(0.8, 0.8, 0.8, 1);
  color.isConstant = false;

  // FragmentOutputBlock
  const FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
  FragmentOutput.visibleInInspector = false;
  FragmentOutput.visibleOnFrame = false;
  FragmentOutput.target = 2;
  FragmentOutput.convertToGammaSpace = false;
  FragmentOutput.convertToLinearSpace = false;
  FragmentOutput.useLogarithmicDepth = false;

  // Connections
  position.output.connectTo(WorldPos.vector);
  World.output.connectTo(WorldPos.transform);
  WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
  ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
  WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
  color.output.connectTo(FragmentOutput.rgba);

  // Output nodes
  nodeMaterial.addOutputNode(VertexOutput);
  nodeMaterial.addOutputNode(FragmentOutput);
  nodeMaterial.build();

  return nodeMaterial;
};
