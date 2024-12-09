import { FC } from "react";
import { Type as TestimonialsCarouselType } from "../schema";
import TestimonialsCarousel from "../component";

const Example: FC<TestimonialsCarouselType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <TestimonialsCarousel data={data} />
    </div>
  );
};

export default Example;
