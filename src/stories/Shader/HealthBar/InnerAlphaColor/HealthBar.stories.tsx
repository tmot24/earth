import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HealthBar } from "./HealthBar";

export const HealthBarStory: ComponentStory<typeof HealthBar> = (props) => {
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
} as ComponentMeta<typeof HealthBar>;
