import "./input.scss";
import { INPUT_TYPE } from "./types";

export default function Input({
  id,
  name,
  type = "text",
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
      className={classNames}
      {...register(id)}
      data-testid="input"
      {...props}
    />
  );
}

Input.displayName = "Input";
