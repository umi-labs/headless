import { FC } from "react";
import { Type } from "../schema";
import Button from "../component";

const Example: FC<Type> = ({ type = "default" }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Button title="" variant={type}>
        Click Me
      </Button>
    </div>
  );
};

export default Example;
