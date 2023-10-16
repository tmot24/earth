import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { TwoDimensional } from "./TwoDimensional";

export const TwoDimensionalStory: StoryFn<typeof TwoDimensional> = (props) => {
  return <TwoDimensional {...props} />;
};

export default {
  title: "2D/TwoDimensionalStory",
  component: TwoDimensional,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof TwoDimensional>;
