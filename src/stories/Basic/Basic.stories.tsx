import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Basic } from "./Basic";

export const Template: ComponentStory<typeof Basic> = () => {
  return <Basic />;
};

export default {
  title: "Basic/Basic",
  component: Basic,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Basic>;
