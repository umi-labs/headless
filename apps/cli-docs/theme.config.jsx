import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  logo: <span>UMI CLI</span>,
  project: {
    link: "https://github.com/umi-labs/umi/tree/main/packages/cli",
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="UMI CLI" />
      <meta property="og:description" content="The next site builder" />
    </>
  ),
  navigation: {
    prev: true,
    next: true,
  },
};
