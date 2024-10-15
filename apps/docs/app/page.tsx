import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { PageRoutes } from "@/lib/pageroutes";

export default function Home() {
  return (
    <div className="min-h-[86.5vh] flex flex-col justify-center items-center text-center px-2 py-8">
      <h1 className="text-4xl font-bold mb-4 sm:text-7xl">UMI Headless</h1>
      <p className="max-w-[600px] text-foreground mb-8 sm:text-base">
        The home for the UMI Headless Stack (UHS). Learn more about the UHS
        below by getting started or by searching where you need to go above.
      </p>
      <div className="flex items-center gap-5">
        <Link
          href={`/cli${PageRoutes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
