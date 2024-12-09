import { FC } from "react";
import { Type as HeroWithMediaType } from "../schema";
import HeroWithMedia from "../component";

const Example: FC<HeroWithMediaType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <HeroWithMedia data={data} />
    </div>
  );
};

export default Example;
