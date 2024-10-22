# UMI

UMI is the monorepo for the UMI Headless Stack, this encompasses the following:

- Templates (templates/*)
- UI (packages/ui)
- CLI (packages/cli)
- Docs (apps/docs)

## Getting Started

### Prerequisites

- [NEXT.js](https://nextjs.org/docs/getting-started)
- [PNPM](https://pnpm.io/installation)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Sanity.io](https://www.sanity.io/docs/introduction/getting-started-with-sanity-studio)
- [TypeScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [Vite](https://vitejs.dev/guide/getting-started.html)
- [Turborepo](https://turborepo.org/docs/getting-started)

### Installation

1. Clone the repo
2. Install dependencies
   ```sh copy
   pnpm install
   ```
5. Start the development server
   ```sh copy
   turbo dev
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### Commit messages

Commit messages should be in the present tense and should be descriptive.

> Suggested convention for commit messages is the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples) specification.

---

### Branching

All commits to the `main` branch are automatically deployed to production. So do not use `main` for development. Create a new branch from dev and make your changes there.

Create a new branch from dev and make your changes there.

```bash
git checkout dev
git checkout -b my-new-feature
```

### Pull Requests

Create a new pull request from your branch to the dev branch.

```bash
git push origin my-new-feature
```

---

## License

This project is licensed under the MIT License.
