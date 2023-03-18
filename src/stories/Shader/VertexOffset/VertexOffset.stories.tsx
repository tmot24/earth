import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { VertexOffset } from "./VertexOffset";

export const VertexOffsetStory: ComponentStory<typeof VertexOffset> = (
  props
) => {
  return <VertexOffset {...props} />;
};

export default {
  title: "Shader/VertexOffsetStory",
  component: VertexOffset,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof VertexOffset>;
