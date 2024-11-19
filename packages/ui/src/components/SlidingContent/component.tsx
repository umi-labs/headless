import "../../global.css";
// import { cn } from "../../lib/utils";
import { Type as SlidingContentProps } from "./schema";
import { PortableText } from "@portabletext/react";

export default function SlidingContent({ data }: SlidingContentProps) {
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

        {/* Cards */}
        <div className="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.cards.map((card, index) => (
            <div key={index} className="card p-6 border rounded shadow-md">
              <div className="number">
                <span>{(index < 10 ? '0' : '') + (index + 1)}</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">{card.cardTitle}</h3>
              <PortableText value={card.cardContent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


SlidingContent.displayName = "SlidingContent";
