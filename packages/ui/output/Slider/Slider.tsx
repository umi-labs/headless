"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";
import Button from "../Button/component.tsx";

type SliderApi = UseEmblaCarouselType[1];
type UseSliderParameters = Parameters<typeof useEmblaCarousel>;
type SliderOptions = UseSliderParameters[0];
type SliderPlugin = UseSliderParameters[1];

type SliderProps = {
  opts?: SliderOptions;
  plugins?: SliderPlugin;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: SliderApi) => void;
};

type SliderContextProps = {
  sliderRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  activeIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
} & SliderProps;

const SliderContext = React.createContext<SliderContextProps | null>(null);

function useSlider() {
  const context = React.useContext(SliderContext);

  if (!context) {
    throw new Error("useSlider must be used within a <Slider />");
  }

  return context;
}

const Slider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & SliderProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [sliderRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [totalSlides, setTotalSlides] = React.useState(0);

    const onSelect = React.useCallback((api: SliderApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
      setActiveIndex(api.selectedScrollSnap());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const goToSlide = React.useCallback(
      (index: number) => {
        api?.scrollTo(index);
      },
      [api],
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    React.useEffect(() => {
      if (!api) return;

      setTotalSlides(api.slideNodes().length);

      if (!api || !setApi) return;

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <SliderContext.Provider
        value={{
          sliderRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          activeIndex,
          totalSlides,
          goToSlide,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative w-[calc(100%-6rem)]", className)}
          role="region"
          aria-roledescription="slider"
          {...props}
        >
          {children}
        </div>
      </SliderContext.Provider>
    );
  },
);


const SliderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { sliderRef, orientation } = useSlider();

  return (
    <div ref={sliderRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});


const SliderItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useSlider();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      {...props}
    />
  );
});


const SliderPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useSlider();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});


const SliderNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useSlider();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});


const SliderIndicators = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { activeIndex, totalSlides, goToSlide } = useSlider();

  return (
    <div
      className={cn(
        "absolute inset-x-0 -bottom-10 flex items-center justify-center space-x-2",
        props.className,
      )}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={cn(
            "h-2 w-2 rounded-full",
            activeIndex === index ? "bg-gray-800" : "bg-gray-400",
          )}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};


export {
  type SliderApi,
  Slider,
  SliderContent,
  SliderItem,
  SliderPrevious,
  SliderNext,
  SliderIndicators,
};
