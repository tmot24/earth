import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Wave } from "./Wave";

export const WaveStory: StoryFn<typeof Wave> = (props) => {
  return <Wave {...props} />;
};

export default {
  title: "NodeEditor/WaveStory",
  component: Wave,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Wave>;
