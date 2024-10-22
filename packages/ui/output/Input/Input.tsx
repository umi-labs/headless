
export default function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  classNames,
  register,
  ...props
}: Type) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={classNames}
      {...register(id)}
      data-testid="input"
      {...props}
    />
  );
}

