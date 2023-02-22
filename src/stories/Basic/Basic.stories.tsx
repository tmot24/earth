import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Basic } from "./Basic";

export const Template: ComponentStory<typeof Basic> = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Basic />
    </div>
  );
};

export default {
  title: "Basic/Basic",
  component: Basic,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Basic>;
