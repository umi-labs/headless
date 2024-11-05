'use client'
import React from 'react'

interface Props {
  text: string
}

export default function Test({ text }: Props) {
  return <div>{text}</div>
}
