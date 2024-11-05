import React, { FC } from "react";
import { Hero1Type } from "../schema";
import Hero1 from "../component";

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
      <Hero1 data={data} />
    </div>
  );
};

export default Example;
