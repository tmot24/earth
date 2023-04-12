import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { HealthBar } from "./HealthBar";

export const HealthBarStory: StoryFn<typeof HealthBar> = (props) => {
  return <HealthBar {...props} />;
};

export default {
  title: "Shader/HealthBarStory/InnerAlphaColor",
  component: HealthBar,
  args: {
    isDebug: false,
    isAxes: false,
    health: 1.0,
  },
  argTypes: {
    health: {
      control: { type: "range", min: 0, max: 1, step: 0.01 },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof HealthBar>;
