
export default function FieldSet({
  classNames,
  children,
  ...props
}: FieldSetProps) {
  return (
    <fieldset className={classNames} data-testid="test" {...props}>
      {children}
    </fieldset>
  );
}
