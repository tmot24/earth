import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Seismic } from "./Seismic";

export const SeismicStory: StoryFn<typeof Seismic> = (props) => {
  return <Seismic {...props} />;
};

export default {
  title: "SeismicStory",
  component: Seismic,
  args: {
    isDebug: false,
  },
  parameters: {
    layout: "fullscreen",
  },
} as Meta<typeof Seismic>;
