import clsx from 'clsx'

import { FIELDSET_TYPE } from './type'

export default function FIELDSET({
  id,
  name,
  classNames,
  children,
  ...props
}: FIELDSET_TYPE) {
  return (
    <fieldset
      id={id}
      name={name}
      className={clsx(
        'w-full text-black *:placeholder:text-gray-400',
        classNames,
      )}
      {...props}
    >
      <label htmlFor={id} className="sr-only">
        {name}
      </label>
      {children}
    </fieldset>
  )
}
