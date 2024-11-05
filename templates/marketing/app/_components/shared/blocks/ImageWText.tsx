import { type PortableTextBlock } from 'next-sanity'
import type { Image as ImageType } from 'sanity'

import ImageBox from '@/app/_components/shared/ImageBox'

interface ImageWTextProps {
  images?: ImageType[]
  content: PortableTextBlock
}

export default function ImageWText(props: ImageWTextProps) {
  const { images, content } = props

  return (
    <section className="grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32 pr-4 md:pr-8 lg:pr-16 bg-midnight-green py-12">
      <div className="relative flex-col justify-between gap-y-4 hidden lg:flex lg:py-[7.5rem]">
        {images &&
          images?.map((image, key) => {
            return (
              <ImageBox
                key={key}
                image={image}
                alt={`Cover image from unsplash`}
                width={2070}
                height={1360}
                classesWrapper="relative aspect-[16/9]"
              />
            )
          })}
      </div>
    </section>
  )
}
