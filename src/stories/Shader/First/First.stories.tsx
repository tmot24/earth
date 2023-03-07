import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { First } from "./First";

export const FirstStory: ComponentStory<typeof First> = (props) => {
  return <First {...props} />;
};

export default {
  title: "Shader/FirstStory",
  component: First,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof First>;
