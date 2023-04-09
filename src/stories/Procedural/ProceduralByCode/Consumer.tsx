import { Canvas } from "../../../components/Canvas/Canvas";
import { useDebugLayer } from "../../../hooks/useDebugLayer/useDebugLayer";
import { useInit } from "../../../hooks/useInit/useInit";
import { useAxes } from "../../../hooks/useAxes/useAxes";
import { useEffect } from "react";
import { useContext } from "../../../context";
import * as BABYLON from "@babylonjs/core";
import { IProceduralByCode } from "./ProceduralByCode";

export const Consumer = () => {
  const {
    context: { scene, camera },
  } = useContext<IProceduralByCode>();

  useInit();
  useAxes();
  useDebugLayer();

  useEffect(() => {
    if (scene) {
      const ground = BABYLON.MeshBuilder.CreateGround(
        "ground",
        { width: 30, height: 10, subdivisions: 200 },
        scene
      );

      const frequencyMultiplier = 10;
      const signalSize = Math.ceil(Math.random() * frequencyMultiplier);

      const noiseSignal: number[] = [];
      const trigNodes: BABYLON.TrigonometryBlock[] = [];
      const addNodes: any[] = [];

      for (let i = 0; i < signalSize; i++) {
        noiseSignal.push(Number((Math.random() * 10).toFixed(2)));
      }

      // Create all Nodes
      const nodeMaterial = new BABYLON.NodeMaterial("NodeMaterial", scene, {
        emitComments: true,
      });

      const positionInput = new BABYLON.InputBlock("position");
      positionInput.setAsAttribute("position");

      const vectorSplitterNode = new BABYLON.VectorSplitterBlock(
        "vectorSplitter"
      );
      const vectorMergerNode = new BABYLON.VectorMergerBlock("vectorMerger");

      noiseSignal.forEach((value, index) => {
        const trigNode = new BABYLON.TrigonometryBlock("trigBlock" + index);

        if (Math.random() < 0.5) {
          trigNode.operation = BABYLON.TrigonometryBlockOperations.Sin;
        } else {
          trigNode.operation = BABYLON.TrigonometryBlockOperations.Cos;
        }

        const inputFloat = new BABYLON.InputBlock("inputBlock" + index);
        inputFloat.value = noiseSignal[index];

        const multiplyBlock = new BABYLON.MultiplyBlock("multiplyBlock");
        vectorSplitterNode.x.connectTo(multiplyBlock.left);
        inputFloat.output.connectTo(multiplyBlock.right);
        multiplyBlock.output.connectTo(trigNode.input);
        trigNodes.push(trigNode);
      });

      // Логика по схлопыванию в одну ноду
      if (trigNodes.length == 1) {
        addNodes.push(trigNodes[0]);
      } else {
        for (let i = 0; i < trigNodes.length - 1; i++) {
          let addNode = new BABYLON.AddBlock("addNode" + i);
          addNodes.push(addNode);
        }

        if (!(trigNodes.length % 2 == 0)) {
          addNodes.pop();
          addNodes.push(trigNodes[0]);
          trigNodes.shift();
          let addNode = new BABYLON.AddBlock("additionalAddNode");
          addNodes.push(addNode);
        }

        let skipCounter = 0;
        for (let i = 0; i < Math.floor(trigNodes.length / 2); i++) {
          trigNodes[skipCounter].output.connectTo(addNodes[i].left);
          trigNodes[skipCounter + 1].output.connectTo(addNodes[i].right);
          skipCounter += 2;
        }

        while (addNodes.length > 1) {
          for (let i = 0; i < addNodes.length; i++) {
            if (!addNodes[i].inputs[0].connectedPoint) {
              addNodes[0].output.connectTo(addNodes[i].left);
              addNodes[1].output.connectTo(addNodes[i].right);
              addNodes.shift();
              addNodes.shift();
              break;
            }
          }
        }
      }

      addNodes[0].output.connectTo(vectorMergerNode.y);

      const remapNode = new BABYLON.RemapBlock("Remap");
      remapNode.sourceRange = new BABYLON.Vector2(-5, 5);

      const gradientNode = new BABYLON.GradientBlock("Gradient");

      const worldInput = new BABYLON.InputBlock("world");
      worldInput.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

      const worldPos = new BABYLON.TransformBlock("worldPos");

      const viewProjectionInput = new BABYLON.InputBlock("viewProjection");
      viewProjectionInput.setAsSystemValue(
        BABYLON.NodeMaterialSystemValues.ViewProjection
      );

      const worldPosdMultipliedByViewProjection = new BABYLON.TransformBlock(
        "worldPos * viewProjectionTransform"
      );

      const vertexOutput = new BABYLON.VertexOutputBlock("vertexOutput");

      const fragmentOutput = new BABYLON.FragmentOutputBlock("fragmentOutput");

      //Make Node Connections
      positionInput.output.connectTo(vectorSplitterNode.xyzIn);
      vectorSplitterNode.x.connectTo(vectorMergerNode.x);
      vectorSplitterNode.z.connectTo(vectorMergerNode.z);
      vectorMergerNode.xyzOut.connectTo(worldPos.vector);
      worldInput.output.connectTo(worldPos.transform);
      worldPos.connectTo(worldPosdMultipliedByViewProjection);
      viewProjectionInput.connectTo(worldPosdMultipliedByViewProjection);
      worldPosdMultipliedByViewProjection.connectTo(vertexOutput);
      addNodes[0].output.connectTo(remapNode.input);
      remapNode.output.connectTo(gradientNode.gradient);
      gradientNode.output.connectTo(fragmentOutput.rgb);

      // Add to nodes
      nodeMaterial.addOutputNode(vertexOutput);
      nodeMaterial.addOutputNode(fragmentOutput);
      nodeMaterial.build(true);

      ground.material = nodeMaterial;
      ground.material.backFaceCulling = false;
    }
  }, [scene]);

  return <Canvas />;
};
