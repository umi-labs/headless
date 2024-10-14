import React, { FC } from "react";
import { Hero1Type } from "../schema";
import Hero1 from "../Hero_1";

export const TEST_DATA: Hero1Type["data"] = {
  heading: "Medium length hero heading goes here",
  descritpion:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  tagline: "Tagline",
  image: {
    src: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Random image",
    width: 1000,
    height: 500,
  },
};

const Example: FC<Hero1Type> = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Hero1 data={TEST_DATA} />
    </div>
  );
};

export default Example;
