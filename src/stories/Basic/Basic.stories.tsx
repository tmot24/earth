import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Basic } from "./Basic";

export const BasicStory: ComponentStory<typeof Basic> = (props) => {
  return <Basic {...props} />;
};

export default {
  title: "Basic/Basic",
  component: Basic,
  args: {
    isDebug: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Basic>;
