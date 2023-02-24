import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Template } from "./Template";

export const TemplateStory: ComponentStory<typeof Template> = (props) => {
  return <Template {...props} />;
};

export default {
  title: "Template/Template",
  component: Template,
  args: {
    isDebug: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Template>;
