import React, { FC } from "react";
import { HeadingType } from "../schema";
import Heading from "../Heading";

const Example: FC<HeadingType> = ({ variant = "h1", children }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Heading variant={variant}>{children}</Heading>
    </div>
  );
};

export default Example;
