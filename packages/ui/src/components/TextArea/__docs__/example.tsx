import React, { FC } from "react";
import { TEXTAREA_TYPE } from '../types';

const Example: FC<TEXTAREA_TYPE> = ({
  disabled = false,
  onClick = () => {},
  primary = true,
  size = "small",
  text = "TextArea",
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
      <TextArea
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
