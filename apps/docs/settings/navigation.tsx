import { PageRoutes } from "@/lib/pageroutes";

export const Navigations = [
  {
    title: "Home",
    href: "https://www.umidigital.co.uk/",
    external: true,
  },
  {
    title: "CLI",
    href: `/cli${PageRoutes[0].href}`,
  },
];

export const GitHubLink = {
  href: "https://github.com/umi-labs/umi",
};
