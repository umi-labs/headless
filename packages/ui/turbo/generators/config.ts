import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("add-component", {
    description:
      "Component generator - generates a base component ready for work.",
    prompts: [
      {
        type: "input",
        name: "title",
        message: "What is the title? Please use PascalCase",
      },
      {
        type: "list",
        name: "category",
        message: "What is the category?",
        choices: ["blocks", "forms", "heros", "global"],
      },
      {
        type: "input",
        name: "type",
        message: "What type of component?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/component.tsx",
        templateFile: "templates/component-template.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/schema.ts",
        templateFile: "templates/schema-template.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/config.json",
        templateFile: "templates/config-template.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/index.ts",
        templateFile: "templates/index-template.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/__docs__/example.tsx",
        templateFile: "templates/docs-example-template.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/__docs__/{{ properCase title }}.mdx",
        templateFile: "templates/docs-markdown-template.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/packages/ui/src/components/{{ properCase title }}/__docs__/{{ properCase title }}.stories.tsx",
        templateFile: "templates/docs-stories-template.hbs",
      },
    ],
  });
}
