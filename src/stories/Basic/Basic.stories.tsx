import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Basic } from "./Basic";

export const Template: ComponentStory<typeof Basic> = (args) => {
  return <Basic />;
};

export default {
  title: "Basic/Basic",
  component: Basic,
} as ComponentMeta<typeof Basic>;
