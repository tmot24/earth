import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { UseCases } from "./UseCases";

export const UseCasesStory: StoryFn<typeof UseCases> = (props) => {
  return <UseCases {...props} />;
};

export default {
  title: "NodeEditor/UseCasesStory",
  component: UseCases,
  args: {
    isDebug: false,
    isAxes: false,
    float: 1,
  },
  argTypes: {
    float: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof UseCases>;
