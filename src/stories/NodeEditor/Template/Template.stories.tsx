import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Template } from "./Template";

export const TemplateStory: StoryFn<typeof Template> = (props) => {
  return <Template {...props} />;
};

export default {
  title: "NodeEditor/TemplateStory",
  component: Template,
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
} as Meta<typeof Template>;
