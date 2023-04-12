import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { ProceduralByCode } from "./ProceduralByCode";

export const ProceduralByCodeStory: StoryFn<typeof ProceduralByCode> = (
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
} as Meta<typeof ProceduralByCode>;
