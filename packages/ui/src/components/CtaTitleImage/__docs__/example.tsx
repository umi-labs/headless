import { FC } from "react";
import { Type as CTATitleImageType } from "../schema";
import CTATitleImage from "../component";

const Example: FC<CTATitleImageType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <CTATitleImage data={data} />
    </div>
  );
};

export default Example;
