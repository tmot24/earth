import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { OutOfBounds } from "./OutOfBounds";

export const OutOfBoundsStory: StoryFn<typeof OutOfBounds> = (props) => {
  return <OutOfBounds {...props} />;
};

export default {
  title: "NodeEditor/OutOfBoundsStory",
  component: OutOfBounds,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof OutOfBounds>;
