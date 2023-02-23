import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Template } from "./Template";

export const TemplateStory: ComponentStory<typeof Template> = () => {
  return <Template />;
};

export default {
  title: "Template/Template",
  component: Template,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Template>;
