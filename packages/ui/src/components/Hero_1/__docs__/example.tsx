import { FC } from "react";
import { Type as Hero1Type } from "../schema";
import Hero1 from "../component";

const Example: FC<Hero1Type> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <Hero1 data={data} />
    </div>
  );
};

export default Example;
