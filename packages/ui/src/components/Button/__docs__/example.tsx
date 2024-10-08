import React, { FC } from "react";
import { ButtonType } from "../schema";
import Button from "../Button";

const Example: FC<ButtonType> = ({
  label = "Click Me",
  variant = "primary",
  onClick = () => {},
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
      <Button label={label} variant={variant} onClick={onClick} />
    </div>
  );
};

export default Example;
