import "./TextArea.scss";
import { TEXTAREA_TYPE as TextAreaProps } from "./types";

export default function TextArea({ classNames, ...props }: TextAreaProps) {
  return <div className={classNames} data-testid="test" {...props} />;
}
