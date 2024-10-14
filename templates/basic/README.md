# Headless Template

### Run site locally in development mode

```bash
pnpm install && pnpm dev
```

When you run this development server, the changes you make in your frontend and studio configuration will be applied live using hot reloading.

Your website should be up and running on [localhost:3000](http://localhost:3000)! You can create and edit content on [localhost:3000/studio](http://localhost:3000/studio).

### Deploying to production

To deploy your changes to production you use `git`:

```bash
git add .
git commit
git push
```

#### Commit messages

Commit messages should be in the present tense and should be descriptive.

> Suggested convention for commit messages is the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples) specification.

---

#### Branching

All commits to the `main` branch are automatically deployed to production. So do not use `main` for development. Create a new branch from dev and make your changes there.

Create a new branch from dev and make your changes there.

```bash
git checkout dev
git checkout -b my-new-feature
```

#### Pull Requests

Create a new pull request from your branch to the dev branch.

```bash
git push origin my-new-feature
```

---

### Use of this template

This template is the starting point for your new headless website. It is built with Next.js, Sanity, TailwindCSS and uses the Prismic repo as the single source of truth.

The site is fully responsive and built with accessibility in mind. It is a static site and is deployed on Vercel.

The site is built with the following technologies:

- [Next.js](https://nextjs.org/)
- [Sanity](https://www.sanity.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

### Folder and file structure

The folder and file structure of this template is as follows:
