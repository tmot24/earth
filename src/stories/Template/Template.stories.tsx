import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Template } from "./Template";

export const TemplateStory: ComponentStory<typeof Template> = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Template />
    </div>
  );
};

export default {
  title: "Template/Template",
  component: Template,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Template>;
