'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { STATUS, STATUS_TYPE } from './types'

import { INPUT, TEXTAREA, FIELDSET } from '@/app/_components/ui/Forms'

export default function ContactForm() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  })

  const { register, handleSubmit } = useForm()

  const [status, setStatus] = React.useState<STATUS_TYPE>(STATUS[0])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = async (data: any) => {
    setStatus(STATUS[1])

    const response = await fetch('/api/contact/contact-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      setStatus(STATUS[2])
    } else {
      setStatus(STATUS[3])
    }
  }

  return (
    <section className="px-8 py-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FIELDSET name="Name" id="name">
          <INPUT
            id="name"
            name="name"
            placeholder="Name*"
            required
            register={register}
          />
        </FIELDSET>
        <FIELDSET id="email" name="Email">
          <INPUT
            type="email"
            id="email"
            name="email"
            placeholder="Email*"
            required
            register={register}
          />
        </FIELDSET>
        <FIELDSET id="message" name="Message">
          <TEXTAREA
            id="message"
            name="message"
            placeholder="Message*"
            required
            register={register}
          />
        </FIELDSET>
        <button
          className="bg-transparent border border-black text-black px-10 py-4 hover:bg-black hover:text-isabelline transition-colors duration-300 ease-in-out"
          type="submit"
        >
          Send
        </button>
        <p>{status?.MESSAGE}</p>
      </form>
    </section>
  )
}
