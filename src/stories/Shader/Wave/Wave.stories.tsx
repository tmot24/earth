import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Wave } from "./Wave";

export const WaveStory: ComponentStory<typeof Wave> = (props) => {
  return <Wave {...props} />;
};

export default {
  title: "Shader/WaveStory",
  component: Wave,
  args: {
    isDebug: false,
    isAxes: false,
  },
  argTypes: {},
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Wave>;
