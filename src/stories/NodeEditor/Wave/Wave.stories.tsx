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
    value: 1,
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 10, step: 1 },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Wave>;
