"use client";

import { usePathname } from "next/navigation";
import { CLIRoutes, UIRoutes, FlowRoutes } from "@/lib/pageroutes";
import SubLink from "@/components/navigation/sublink";

export default function PageMenu({ isSheet = false }) {
  const pathname = usePathname();
  const baseRoute = pathname.split("/")[1];
  if (
    !pathname.startsWith("/cli") &&
    !pathname.startsWith("/ui") &&
    !pathname.startsWith("/flow")
  )
    return null;

  const Routes =
    baseRoute === "cli"
      ? CLIRoutes
      : baseRoute === "ui"
        ? UIRoutes
        : FlowRoutes;

  return (
    <div className="flex flex-col gap-3.5 mt-5 pb-6">
      {Routes.map((item, index) => {
        if ("spacer" in item) {
          return (
            <div key={`spacer-${index}`} className="my-2 mr-3">
              <hr className="border-t border-gray-300" />
            </div>
          );
        }
        return (
          <div key={item.title + index} className="mb-2">
            {item.heading && (
              <h2 className="text-sm font-bold mb-2">{item.heading}</h2>
            )}
            <SubLink
              {...{
                ...item,
                href: `/${baseRoute}${item.href}`,
                level: 0,
                isSheet,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
