import { FC } from "react";
import { Type as CardGridSideTitleSimpleType } from "../schema";
import CardGridSideTitleSimple from "../component";

const Example: FC<CardGridSideTitleSimpleType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <CardGridSideTitleSimple data={data} />
    </div>
  );
};

export default Example;
