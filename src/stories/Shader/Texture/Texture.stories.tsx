import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Texture } from "./Texture";

export const TextureStory: ComponentStory<typeof Texture> = (props) => {
  return <Texture {...props} />;
};

export default {
  title: "Shader/TextureStory",
  component: Texture,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Texture>;
