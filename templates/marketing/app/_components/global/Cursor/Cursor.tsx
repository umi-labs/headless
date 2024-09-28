'use client'

import React from 'react'

function Cursor() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (ref.current == null) return

    let trailer: any = ref.current

    const animateTrailer = (e: any, interacting: boolean) => {
      let x = e.clientX - trailer.offsetWidth / 2
      let y = e.clientY - trailer.offsetHeight / 2

      const keyframes = {
        transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`,
        backgroundColor: interacting ? 'transparent' : '#212529',
      }

      trailer.animate(keyframes, {
        duration: 800,
        fill: 'forwards',
      })
    }

    window.onmousemove = (e: any) => {
      const interactable = e.target.closest('.interactable'),
        interacting = interactable !== null

      animateTrailer(e, interacting)
    }
  }, [])

  return (
    <div
      className="h-3 w-3 rounded-[20px] bg-[#212529] hidden lg:flex justify-center items-center fixed left-0 top-0 z-[10000] pointer-events-none border-[0.1em] border-solid border-[#212529] invert mix-blend-difference"
      ref={ref}
    />
  )
}

export { Cursor }
