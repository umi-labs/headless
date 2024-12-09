import { FC } from "react";
import { Type as AlternatingContentType } from "../schema";
import AlternatingContent from "../component";

const Example: FC<AlternatingContentType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <AlternatingContent data={data} />
    </div>
  );
};

export default Example;
