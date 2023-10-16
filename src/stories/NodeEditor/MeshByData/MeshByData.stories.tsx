import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { MeshByData } from "./MeshByData";

export const MeshByDataStory: StoryFn<typeof MeshByData> = (props) => {
  return <MeshByData {...props} />;
};

export default {
  title: "NodeEditor/MeshByDataStory",
  component: MeshByData,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof MeshByData>;
