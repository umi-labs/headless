import React, { FC } from "react";
import Input from "../Input";
import { INPUT_TYPE } from "../types";

const Example: FC<INPUT_TYPE> = ({
  id,
  name,
  ...props
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Input
        id={id}
        name={name}
        {...props}
      />
    </div>
  );
};

export default Example;
