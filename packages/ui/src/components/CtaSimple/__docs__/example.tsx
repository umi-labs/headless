import { FC } from "react";
import { Type as CTASimpleType } from "../schema";
import CTASimple from "../component";

const Example: FC<CTASimpleType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <CTASimple data={data} />
    </div>
  );
};

export default Example;
