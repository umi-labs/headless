'use client'

import React from 'react'
import { useForm } from 'react-hook-form'

import { STATUS, STATUS_TYPE, STATUS_ENUM } from '@/lib/types'

import { INPUT, TEXTAREA, FIELDSET } from '@/app/_components/ui/Forms'

export const FormBuilderBlock = ({ formFields, uid }) => {
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

    console.log(data)

    const response = await fetch('/api/contact/form-builder', {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={uid}
      className="space-y-4 px-8 py-2"
    >
      {Array.isArray(formFields) &&
        formFields.map((field) => {
          const {
            inputType,
            _key,
            fieldId,
            placeholder,
            _type,
            fieldName,
            required,
          } = field ?? {}
          const { current } = fieldId ?? {}
          if (!inputType || !current) return null

          if (inputType === 'textArea') {
            return (
              <div key={_key}>
                <label htmlFor={current}>{fieldName}</label>
                <div>
                  <textarea
                    id={current}
                    required={!!required}
                    placeholder={placeholder}
                    aria-describedby="textarea"
                    {...register(current)}
                  />
                </div>
              </div>
            )
          }

          return (
            <FIELDSET key={_key} id={current} name={fieldName}>
              <INPUT
                id={current}
                key={_key}
                type={inputType}
                name={fieldName}
                required={required}
                placeholder={placeholder}
                register={register}
              />
            </FIELDSET>
          )
        })}
      <button type="submit" disabled={status.TYPE === STATUS_ENUM.SUBMITTING}>
        Submit
      </button>
    </form>
  )
}
