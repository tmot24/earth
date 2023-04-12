import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Texture } from "./Texture";

export const TextureStory: StoryFn<typeof Texture> = (props) => {
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
} as Meta<typeof Texture>;
