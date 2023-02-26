import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Seismic } from "./Seismic";

export const SeismicStory: ComponentStory<typeof Seismic> = (props) => {
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
} as ComponentMeta<typeof Seismic>;
