import "./TextArea.scss";
import { TEXTAREA_TYPE } from "./types";

export default function TextArea({ classNames, ...props }: TEXTAREA_TYPE) {
  return <div className={classNames} data-testid="test" {...props} />;
}
