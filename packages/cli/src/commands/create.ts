import fs from "fs-extra";
import path from "path";
import {
  cancel,
  confirm,
  intro,
  isCancel,
  log,
  outro,
  select,
  tasks,
  text,
} from "@clack/prompts";
import { execa } from "execa";
import simpleGit from "simple-git";
import { bold, green, inverse } from "kleur/colors";

const git = simpleGit();

export const create = async (options: { name: string }) => {
  let targetDir = "";
  let projectName: string;
  let packageManager: string;
  const templatesRepo = "https://github.com/umi-labs/umi"; // Correct repo URL
  const tempDir = path.join(process.cwd(), "temp-templates");

  intro(inverse(" create-umi-app "));

  log.message(
    " _   _ __  __ ___   ____ ___ ____ ___ _____  _    _     \n" +
      "| | | |  \\/  |_ _| |  _ \\_ _/ ___|_ _|_   _|/ \\  | |    \n" +
      "| | | | |\\/| || |  | | | | | |  _ | |  | | / _ \\ | |    \n" +
      "| |_| | |  | || |  | |_| | | |_| || |  | |/ ___ \\| |___ \n" +
      " \\___/|_|  |_|___| |____/___\\____|___| |_/_/   \\_\\_____|\n",
  );

  log.message(inverse(" It's pronounced oo-me! "));

  await tasks([
    {
      title: "Setup Directory",
      task: async () => {
        // Prompt for the project name
        // TODO: Currently asking this twice - I believe first time is because the var is running before usage???

        if (options.name) {
          projectName = options.name;
        } else {
          // @ts-expect-error issue with text type possibly expecting symbol
          projectName = await text({
            message: "What is the name of the new project?",
          });

          if (isCancel(projectName)) {
            cancel("Project name is required.");
            process.exit(0);
          }
        }

        targetDir = path.join(process.cwd(), projectName!);

        // Check if the target directory already exists
        if (await fs.pathExists(targetDir)) {
          const overwrite = await confirm({
            message: `The directory ${projectName} already exists. Do you want to overwrite it?`,
          });

          if (overwrite === false) {
            cancel("Project creation cancelled.");
            process.exit(0);
          }

          // Remove the existing directory if overwrite is confirmed
          await fs.remove(targetDir);
        }

        return "Directory setup complete.";
      },
    },
    {
      title: "Cloning templates",
      task: async () => {
        // Clone the templates repository into a temporary directory
        await git.clone(templatesRepo, tempDir);
        log.success("Templates cloned successful.");
      },
    },
    {
      title: "Template Selection",
      task: async () => {
        // List available templates in the cloned directory
        const templatesDir = path.join(tempDir, "templates");
        const templates = await fs.readdir(templatesDir);

        if (templates.length === 0) {
          log.error("No templates available in the cloned directory.");
          await fs.remove(tempDir);
          process.exit(0);
        }

        // Prompt user to select a template
        // @ts-expect-error issue with text type possibly expecting symbol
        const selectedTemplate: string = await select({
          message: "Select a template:",
          options: templates.map((template) => ({
            title: template,
            value: template,
          })),
        });

        if (isCancel(selectedTemplate)) {
          cancel("Template selection is required.");
          await fs.remove(tempDir);
          process.exit(0);
        }

        const templatePath = path.join(templatesDir, selectedTemplate);

        log.step(`Copying template: ${selectedTemplate}`);

        // Move the template contents to the target directory
        await fs.copy(templatePath, targetDir, { overwrite: true });

        await fs.remove(tempDir);

        return "Template copied.";
      },
    },
    {
      title: "Installation",
      task: async () => {
        // Run installation commands
        // @ts-expect-error issue with text type possibly expecting symbol
        packageManager = await select({
          message: "Which package manager would you like to use?",
          options: [
            { label: "pnpm", value: "pnpm", hint: "Recommended" },
            { label: "npm", value: "npm" },
            { label: "yarn", value: "yarn" },
          ],
        });

        await execa(packageManager, ["install"], {
          cwd: targetDir,
          stdio: "ignore",
        }).catch(async (error) => {
          log.error(error);
          await fs.remove(tempDir);
          process.exit(0);
        });

        await fs.remove(tempDir);
        return "Installation complete.";
      },
    },
    {
      title: "",
      task: async () => {
        // Offering helpful tips to the user
        const tips = [
          `Navigate into your new project folder: ${bold(
            green(`cd ${projectName}`),
          )}`,
          `Run ${bold(green("umi init"))} to initialise your project.`,
          `Start your development server: ${bold(
            green(
              `${packageManager} ${packageManager === "npm" ? "run" : ""} dev`,
            ),
          )}`,
          `Check the ${bold(green("README.md"))} file for more setup instructions.`,
          `Explore the available templates to customise your project further.`,
        ];

        log.message(
          `Project created successfully! ${bold(green(" Let's get you started: "))}`,
          { symbol: "🎉" },
        );
        tips.map((tip, index) =>
          log.message(tip, { symbol: bold(green(`${index + 1}.`)) }),
        );
      },
    },
  ]);

  outro("Happy coding :)");
};
