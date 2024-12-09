import { FC } from "react";
import { Type as HeroImageOverlapType } from "../schema";
import HeroImageOverlap from "../component";

const Example: FC<HeroImageOverlapType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <HeroImageOverlap data={data} />
    </div>
  );
};

export default Example;
