import "../../global.css";
// import { cn } from "../../lib/utils";
import { Type as SlidingContentProps } from "./schema";
import { PortableText } from "@portabletext/react";
import useEmblaCarousel from "embla-carousel-react";

export default function SlidingContent({ data }: SlidingContentProps) {
  // Initialize Embla carousel
  const [emblaRef] = useEmblaCarousel({ loop: true });

  if (!data || !data.cards?.length) {
    return <p>No content available.</p>;
  }

  return (
    <section className="py-28 px-28">
      <div className="w-full flex flex-col justify-center gap-24">
        {/* Section Title and Caption */}
        <div className="section-title">
          <h2 className="text-5xl font-bold mb-6">{data.sectionTitle}</h2>
          <div className="caption">
            <p>{data.sectionCaption}</p>
          </div>
        </div>

        {/* Embla Carousel */}
        <div ref={emblaRef} className="embla overflow-hidden">
          <div className="embla__container flex gap-6">
            {data.cards.map((card, index) => (
              <div
                key={index}
                className="embla__slide flex-shrink-0 w-[80%] md:w-[60%] lg:w-[33%] p-6 border rounded shadow-md"
              >
                <div className="number">
                  <span>{(index < 10 ? "0" : "") + (index + 1)}</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{card.cardTitle}</h3>
                <PortableText value={card.cardContent} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

SlidingContent.displayName = "SlidingContent";