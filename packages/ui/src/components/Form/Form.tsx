import React from "react";
import { z } from "zod";

const FormPropsSchema = z.object({
  children: z.custom<React.ReactNode>(),
});

type FormProps = z.infer<typeof FormPropsSchema>;

function Form({ children, ...props }: FormProps) {
  return <form {...props}>{children}</form>;
}

const FieldPropsSchema = z.object({
  children: z.custom<React.ReactNode>(),
});

type FieldProps = z.infer<typeof FieldPropsSchema>;

function Field({ children, ...props }: FieldProps) {
  return <fieldset {...props}>{children}</fieldset>;
}

const ControlPropsSchema = z.object({
  children: z.custom<React.ReactNode>(),
  variant: z.enum(["input", "textarea", "select"]),
  type: z.enum([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
  ]),
});

type ControlProps = z.infer<typeof ControlPropsSchema>;

function Control({ children, variant, type, ...props }: ControlProps) {
  return variant == "input" ? (
    <input type={type} {...props} />
  ) : variant == "textarea" ? (
    <textarea {...props} />
  ) : variant == "select" ? (
    <select {...props} />
  ) : null;
}

function Label({ children, ...props }: FieldProps) {
  return <label {...props}>{children}</label>;
}

export { Form as Root, Field as Field, Control as Control, Label as Label };

export type { FormProps, FieldProps, ControlProps };
