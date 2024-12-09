import { cn } from "@/lib/utils";

interface CtaTitleImageProps {
    data: {
        subtitle: string;
        title: string;
        content: string;
        points?: {
            icon: {
                type: "eye" | "rocket" | "check" | "check-circle";
                weight: "thin" | "light" | "regular" | "bold" | "duotone" | "fill";
            };
            content: string;
        }[] | undefined;
        buttons?: {
            title: string;
            link?: string | undefined;
            type: "link" | "outline" | "default" | "destructive" | "secondary" | "ghost";
        }[] | undefined;
        image: {
            alt: string;
            src: string;
            width: number;
            height: number;
        };
    };
}
import Icon from "../Icon";
import Button from "../Button";

export default function CTATitleImage({ data }: CTATitleImageProps) {
  return (
    <section
      className={cn(
        "relative flex h-full w-screen auto-rows-min grid-cols-1 grid-rows-2 flex-col-reverse items-center justify-center gap-10 md:grid md:grid-cols-2 md:grid-rows-1 md:gap-24",
      )}
    >
      <div className="flex flex-col items-center justify-center gap-y-10 p-6 text-center md:items-start md:py-32 md:pl-10 md:text-start">
        <div className="flex flex-col gap-y-6">
          <span className="text-sm uppercase text-[#368DB1]">
            {data.subtitle}
          </span>
          <h2>{data.title}</h2>
        </div>
        <div className="flex flex-col gap-y-6">
          <p>{data.content}</p>
          {data.points && (
            <ul className="flex flex-col items-start justify-start gap-y-2 text-start">
              {data.points.map((point, i) => (
                <li key={i} className="flex items-start justify-center gap-x-3">
                  <Icon
                    type={point.icon.type}
                    weight={point.icon.weight}
                    className="mt-1 size-5 text-[#368DB1]"
                  />
                  <span className="text-lg font-light">{point.content}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-center gap-x-6">
          {data.buttons &&
            data.buttons.map((button, i) => (
              <Button key={i} variant={button.type}>
                {button.title}
              </Button>
            ))}
        </div>
      </div>
      <div className="flex aspect-square h-full w-full items-center justify-center">
        <img
          src={data.image.src}
          alt={data.image.alt}
          width={data.image.width}
          height={data.image.height}
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}

