import React,{ FC } from "react";
import { Type as SlidingContentType } from "../schema";
import SlidingContent from "../component";

const Example: FC<SlidingContentType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <SlidingContent data={data} />
    </div>
  );
};

  export default Example;
