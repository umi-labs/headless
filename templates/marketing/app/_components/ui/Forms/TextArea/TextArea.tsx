import clsx from 'clsx'

import { TEXTAREA_TYPE } from './type'

export default function TEXTAREA({
  id,
  name,
  value,
  onChange,
  classNames,
  register,
  ...props
}: TEXTAREA_TYPE) {
  return (
    <textarea
      id={id}
      name={name}
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
