import clsx from 'clsx'

import { INPUT_TYPE } from './type'

export default function INPUT({
  id,
  name,
  type = 'text',
  value,
  onChange,
  classNames,
  register,
  ...props
}: INPUT_TYPE) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={clsx(
        'w-full px-4 py-2 bg-transparent border border-black text-black placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500',
        classNames,
      )}
      {...register(id)}
      {...props}
    />
  )
}
