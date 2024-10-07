import { Header } from '@/app/_components/shared/Header'
import BasicHero from '@/app/_components/shared/Heros/BasicHero'
import HomeHero from '@/app/_components/shared/Heros/HomeHero'
import PrimaryHero from '@/app/_components/shared/Heros/PrimaryHero'

export default function HeroSwitcher({
  data,
  title,
  overview,
}: {
  data: any
  title?: string
  overview: any
}) {
  if (!data) {
    return <Header title={title} description={overview} />
  }

  switch (data?._type) {
    case 'primaryHero':
      return <PrimaryHero title={data?.title} />
    case 'basicHero':
      return <BasicHero heading={data?.heading} />
    default:
      return <Header title={data?.title} description={data?.overview} />
  }
}
