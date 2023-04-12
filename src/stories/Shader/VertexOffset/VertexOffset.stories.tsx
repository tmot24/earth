import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { VertexOffset } from "./VertexOffset";

export const VertexOffsetStory: StoryFn<typeof VertexOffset> = (props) => {
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
} as Meta<typeof VertexOffset>;
