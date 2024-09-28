'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import type { SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const { socialLinks, name } = data || {}

  return (
    <footer className="bottom-0 w-full px-8 pt-12 pb-4 text-center md:pt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full flex flex-row items-center justify-between gap-x-2 flex-wrap">
          {socialLinks &&
            socialLinks?.map((socialLink) => {
              return (
                <Link
                  id={socialLink._key}
                  key={socialLink._key}
                  className="interactable uppercase text-gray-600 hover:text-black hover:font-bold transition-all duration-300 ease-in-out cursor-pointer text-center"
                  href={socialLink?.link || ''}
                  target="_blank"
                >
                  {socialLink.title}
                </Link>
              )
            })}
        </div>
        <div className="overflow-clip">
          <motion.h2
            className="text-9xl md:text-[18rem] lg:text-[25rem] xl:text-[30rem] leading-none font-black uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, ease: 'easeInOut' }}
          >
            {name && name.split(' ')[0]}
          </motion.h2>
        </div>
      </div>
    </footer>
  )
}
