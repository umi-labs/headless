import "../../../global.css";
import { FC } from "react";
import { Type as SliderType } from "../schema";
import {
  Slider,
  SliderContent,
  SliderItem,
  SliderNext,
  SliderPrevious,
} from "../component";

const Example: FC<SliderType> = ({ data }) => {
  const style = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  };

  return (
    <div style={style}>
      <Slider className="w-full max-w-xl">
        <SliderContent>
          {data.slides.map((slide, index) => (
            <SliderItem key={index}>
              <div className="p-1">
                <div>
                  <div className="flex items-center justify-center p-6">
                    <span className="text-4xl font-semibold">
                      {slide.title}
                    </span>
                  </div>
                </div>
              </div>
            </SliderItem>
          ))}
        </SliderContent>
        <SliderPrevious />
        <SliderNext />
      </Slider>
    </div>
  );
};

export default Example;
