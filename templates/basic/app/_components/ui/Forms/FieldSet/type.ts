export type FIELDSET_TYPE = {
  id: string
  name: string
  classNames?: React.ComponentPropsWithoutRef<'fieldset'>['className']
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'fieldset'>
