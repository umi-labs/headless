import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'

import { ProjectListItem } from '@/app/_components/shared/ProjectShowcase/ProjectListItem'
import { resolveHref } from '@/sanity/lib/utils'

export default function ProjectShowcase({
  showcase,
  encodeDataAttribute,
}: {
  showcase: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}) {
  return (
    <section className="mx-auto max-w-[100rem] px-4 md:px-16 lg:px-32">
      {showcase && showcase.length > 0 && (
        <div className="w-full rounded-md border">
          {showcase.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.(['showcase', key, 'slug'])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
