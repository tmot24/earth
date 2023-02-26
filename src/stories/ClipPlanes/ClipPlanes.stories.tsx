import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ClipPlanes } from "./ClipPlanes";

export const ClipPlanesStory: ComponentStory<typeof ClipPlanes> = (props) => {
  return <ClipPlanes {...props} />;
};

export default {
  title: "ClipPlanesStory",
  component: ClipPlanes,
  args: {
    isDebug: false,
    clipHorizontal: 0,
    clipVertical: 0,
  },
  argTypes: {
    clipHorizontal: {
      control: { type: "range", min: -1.5, max: 1.5, step: 0.1 },
    },
    clipVertical: {
      control: { type: "range", min: -1.5, max: 1.5, step: 0.1 },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ClipPlanes>;
