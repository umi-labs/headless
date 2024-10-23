import { CLIDocuments, FlowDocuments, UIDocuments } from "@/settings/documents";

export type Paths =
  | {
      title: string;
      href: string;
      noLink?: true;
      heading?: string;
      items?: Paths[];
    }
  | {
      spacer: true;
    };

export const CLIRoutes: Paths[] = [...CLIDocuments];
export const UIRoutes: Paths[] = [...UIDocuments];
export const FlowRoutes: Paths[] = [...FlowDocuments];

type Page = { title: string; href: string };

function isRoute(
  node: Paths,
): node is Extract<Paths, { title: string; href: string }> {
  return "title" in node && "href" in node;
}

function getAllLinks(node: Paths): Page[] {
  const pages: Page[] = [];

  if (isRoute(node) && !node.noLink) {
    pages.push({ title: node.title, href: node.href });
  }

  if (isRoute(node) && node.items) {
    node.items.forEach((subNode) => {
      if (isRoute(subNode)) {
        const temp = { ...subNode, href: `${node.href}${subNode.href}` };
        pages.push(...getAllLinks(temp));
      }
    });
  }

  return pages;
}

export const CLIPageRoutes = CLIRoutes.map((it) => getAllLinks(it)).flat();
export const UIPageRoutes = UIRoutes.map((it) => getAllLinks(it)).flat();
export const FlowPageRoutes = FlowRoutes.map((it) => getAllLinks(it)).flat();
