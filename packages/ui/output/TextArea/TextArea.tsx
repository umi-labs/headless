
export default function TextArea({ classNames, ...props }: TextAreaProps) {
  return <div className={classNames} data-testid="test" {...props} />;
}
