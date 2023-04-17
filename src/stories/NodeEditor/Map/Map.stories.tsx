import React from "react";
import {Meta, StoryFn} from "@storybook/react";
import {Map} from "./Map";

export const MapStory: StoryFn<typeof Map> = (props) => {
  return <Map {...props} />;
};

export default {
  title: "NodeEditor/MapStory",
  component: Map,
  args: {
    isDebug: false,
    isAxes: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Map>;
