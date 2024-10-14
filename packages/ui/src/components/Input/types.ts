import React from "react";

export type INPUT_TYPE = {
  id: string;
  name: string;
  value?: string;
  type?: "text" | "number" | "email";
  onChange?: (e: any) => void;
  classNames?: React.ComponentPropsWithoutRef<"input">["className"];
  register: (id: string) => {} | "";
} & React.ComponentPropsWithoutRef<"input">;
