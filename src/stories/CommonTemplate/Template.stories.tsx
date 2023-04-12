import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Template } from "./Template";

export const TemplateStory: StoryFn<typeof Template> = (props) => {
  return <Template {...props} />;
};

export default {
  title: "TemplateStory",
  component: Template,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Template>;
