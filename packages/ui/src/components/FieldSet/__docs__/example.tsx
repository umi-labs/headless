import React, { FC } from "react";
import { FIELDSET_TYPE } from "../types";

const Example: FC<FIELDSET_TYPE> = ({
  disabled = false,
  onClick = () => {},
  primary = true,
  size = "small",
  text = "FIELDSET",
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
      <FIELDSET
        size={size}
        text={text}
        disabled={disabled}
        onClick={onClick}
        primary={primary}
      />
    </div>
  );
};

export default Example;
