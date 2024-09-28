import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'
import Link from 'next/link'

import ImageWText from '@/components/shared/Blocks/ImageWText'
import ImageBox from '@/components/shared/ImageBox'
import ContactForm from '@/components/shared/Blocks/ContactForm/ContactForm'
import { FormBuilderBlock } from '@/components/global/FormBuilder/FormBuilder'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <Link
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </Link>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      imageWithText: ({ value }) => {
        const { content, images } = value || {}
        return <ImageWText content={content} images={images} />
      },
      contactFormBlock: ({ }) => {
        return <ContactForm />
      },
      formBuilder: ({ value }) => {
        const { formFields, _key } = value || {}
        return <FormBuilderBlock formFields={formFields} uid={_key} />
      },
    },
  }

  return <PortableText components={components} value={value} />
}
