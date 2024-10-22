import "./FieldSet.scss";
import { FIELDSET_TYPE as FieldSetProps } from "./types";

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
