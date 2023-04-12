import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { UV } from "./UV";

export const UVStory: StoryFn<typeof UV> = (props) => {
  return <UV {...props} />;
};

export default {
  title: "Shader/UVStory",
  component: UV,
  args: {
    startColor: 0,
    endColor: 1,
    isDebug: false,
    isAxes: false,
  },
  argTypes: {
    startColor: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
    endColor: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof UV>;
