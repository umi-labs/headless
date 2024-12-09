import { FC } from "react";
import { Type as LogoCloudType } from "../schema";
import LogoCloud from "../component";

const Example: FC<LogoCloudType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <LogoCloud data={data} />
    </div>
  );
};

export default Example;
