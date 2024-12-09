import { FC } from "react";
import { Type as CardGridSideTitleType } from "../schema";
import CardGridSideTitle from "../component";

const Example: FC<CardGridSideTitleType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <CardGridSideTitle data={data} />
    </div>
  );
};

export default Example;
