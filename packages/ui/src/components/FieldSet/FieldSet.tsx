import './FIELDSET.scss';
import { FIELDSET_TYPE } from './types';

export default function FieldSet({ classNames, children, ...props }: FIELDSET_TYPE) {
  return <fieldset className={classNames} data-testid="test" {...props}>{children}</fieldset>;
};
