export type TEXTAREA_TYPE = {
  id: string
  name: string
  value?: string
  onChange?: (e: any) => void
  classNames?: React.ComponentPropsWithoutRef<'textarea'>['className']
  register: any
} & React.ComponentPropsWithoutRef<'textarea'>
