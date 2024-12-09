import { FC } from "react";
import { Type as BlogGridType } from "../schema";
import BlogGrid from "../component";

const Example: FC<BlogGridType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <BlogGrid data={data} />
    </div>
  );
};

export default Example;
