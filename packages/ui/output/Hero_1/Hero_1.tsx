import { cn } from "@/lib/utils";

interface Hero_1Props {
    data: {
        tagline: string;
        heading: string;
        description: string;
        image: {
            src: string;
            alt: string;
            width: number;
            height: number;
        };
    };
    textAlignHoz?: ("left" | "center" | "right") | undefined;
    textAlignVer?: ("top" | "center" | "bottom") | undefined;
    variant?: ("primary" | "secondary" | "tertiary") | undefined;
}

export default function Hero1({
  data,
  textAlignHoz = "center",
  textAlignVer,
}: Hero_1Props) {
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <div className="absolute top-0 left-0 z-0 h-screen w-full">
        <div className="absolute top-0 left-0 z-0 h-screen w-full bg-gradient-to-b from-black/50 to-black" />
        <picture className="">
          <source srcSet={data.image.src} />
          <img
            src={data.image.src}
            alt={data.image.alt}
            width={data.image.width}
            height={data.image.height}
            className="object-cover object-center h-screen w-full"
          />
        </picture>
      </div>
      <div
        className={cn(
          "z-10 text-white gap-4 max-w-[768px] mx-auto",
          `text-${textAlignHoz}`,
          textAlignVer,
        )}
      >
        <span className="text-base font-semibold">{data.tagline}</span>
        <div className="flex flex-col items-center justify-center gap-6">
          <h1 className="text-6xl font-bold">{data.heading}</h1>
          <p className="text-lg">{data.description}</p>
        </div>
      </div>
    </section>
  );
}

