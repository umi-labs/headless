"use client";
import React from "react";

const DEFAULT_CONTEXT = {
  pkgManager: "pnpm",
};

const Context = React.createContext(DEFAULT_CONTEXT);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Context.Provider value={DEFAULT_CONTEXT}>{children}</Context.Provider>
  );
}
