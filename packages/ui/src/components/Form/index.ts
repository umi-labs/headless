import { Root, Field, Control, Label } from "./component";

interface FormComponents {
  Root: typeof Root;
  Field: typeof Field;
  Control: typeof Control;
  Label: typeof Label;
}

const Form: FormComponents = {
  Root: Root,
  Field: Field,
  Control: Control,
  Label: Label,
};

export type { FormProps, FieldProps, ControlProps } from "./component";

export default Form;
