export interface BasicHeroProps {
  heading: string
}

export default function BasicHero(props: BasicHeroProps) {
  const { heading } = props
  return (
    <section className="min-h-[60svh] py-20 w-full flex flex-col items-end justify-end gap-y-12">
      <div className="flex flex-col items-start justify-end gap-y-4 w-full px-8 lg:w-fit">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none">
          {heading}
        </h1>
      </div>
    </section>
  )
}
