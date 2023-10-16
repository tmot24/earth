import * as BABYLON from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

export const ui = (engine: BABYLON.Engine, scene: BABYLON.Scene) => {
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI(
    "UI",
    true,
    scene
  );

  const textBlock = new GUI.TextBlock(
    "textBlock",
    `FPS: ${engine.getFps().toFixed(0)}`
  );

  textBlock.color = "white";
  textBlock.fontSize = 14;
  textBlock.width = "50px";
  textBlock.height = "14px";
  textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  textBlock.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

  advancedTexture.addControl(textBlock);

  return textBlock;
};
