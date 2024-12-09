import { FC } from "react";
import { Type } from "../schema";
import Icon from "../component";

const Example: FC<Type> = ({ type, weight }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <Icon type={type} weight={weight} className="size-12" />
    </div>
  );
};

export default Example;
