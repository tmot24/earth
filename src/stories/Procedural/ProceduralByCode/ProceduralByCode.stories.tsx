import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProceduralByCode } from "./ProceduralByCode";

export const ProceduralByCodeStory: ComponentStory<typeof ProceduralByCode> = (
  props
) => {
  return <ProceduralByCode {...props} />;
};

export default {
  title: "Procedural/ProceduralByCodeStory",
  component: ProceduralByCode,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ProceduralByCode>;
