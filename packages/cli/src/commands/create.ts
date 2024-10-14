import fs from "fs-extra";
import path from "path";
import ora from "ora";
import prompts from "prompts";
import { execa } from "execa";
import simpleGit from "simple-git";
import { bold, green } from "kleur/colors";

const git = simpleGit();

export const create = async (projectName?: string) => {
  const spinner = ora();
  try {
    // Prompt for the project name if not provided
    if (!projectName) {
      const response = await prompts({
        type: "text",
        name: "projectName",
        message: "What is the name of the new project?",
      });

      projectName = response.projectName;
    }

    spinner.start("Setting up a new project...");

    if (!projectName) {
      spinner.fail("Project name is required.");
      return;
    }

    const targetDir = path.join(process.cwd(), projectName);

    // Check if the target directory already exists
    if (await fs.pathExists(targetDir)) {
      const { overwrite } = await prompts({
        type: "confirm",
        name: "overwrite",
        message: `The directory ${projectName} already exists. Do you want to overwrite it?`,
        initial: false,
      });

      if (!overwrite) {
        spinner.fail("Project creation cancelled.");
        return;
      }

      // Remove the existing directory if overwrite is confirmed
      await fs.remove(targetDir);
    }

    // Clone the templates repository into a temporary directory
    const templatesRepo = "https://github.com/umi-labs/umi"; // Correct repo URL
    const tempDir = path.join(process.cwd(), "temp-templates");

    spinner.start("Cloning templates from GitHub...");
    await git.clone(templatesRepo, tempDir);

    spinner.succeed("Templates cloned.");

    // List available templates in the cloned directory
    const templatesDir = path.join(tempDir, "templates");
    const templates = await fs.readdir(templatesDir);

    if (templates.length === 0) {
      spinner.fail("No templates available in the cloned directory.");
      return;
    }

    // Prompt user to select a template
    const { selectedTemplate } = await prompts({
      type: "select",
      name: "selectedTemplate",
      message: "Select a template:",
      choices: templates.map((template) => ({
        title: template,
        value: template,
      })),
    });

    if (!selectedTemplate) {
      spinner.fail("Template selection is required.");
      return;
    }

    const templatePath = path.join(templatesDir, selectedTemplate);

    spinner.start(`Copying template: ${selectedTemplate}...`);

    // Move the template contents to the target directory
    await fs.copy(templatePath, targetDir, { overwrite: true });

    spinner.succeed("Template copied.");

    // Run installation commands
    const packageManager = await prompts({
      type: "select",
      name: "manager",
      message: "Which package manager would you like to use?",
      choices: [
        { title: "pnpm", value: "pnpm", description: "Recommended" },
        { title: "npm", value: "npm" },
        { title: "yarn", value: "yarn" },
      ],
      initial: 0,
    });

    spinner.start("Installing dependencies...");
    await execa(packageManager.manager, ["install"], {
      cwd: targetDir,
      stdio: "inherit",
    });
    spinner.succeed("Dependencies installed.");

    // Clean up by removing the temporary directory
    await fs.remove(tempDir);

    // Offering helpful tips to the user
    const tips = [
      `${bold("1.")} Navigate into your new project folder: ${bold(
        `cd ${projectName}`
      )}`,
      `${bold("2.")} Run ${bold("umi init")} to initialise your project.`,
      `${bold("3.")} Start your development server: ${bold(
        `${packageManager.manager} dev`
      )}`,
      `${bold("4.")} Check the ${bold(
        "README.md"
      )} file for more setup instructions.`,
      `${bold(
        "5."
      )} Explore the available templates to customise your project further.`,
    ];

    console.log(
      `\n🎉 Project created successfully! ${bold(
        green("Let's get you started:\n")
      )}`
    );
    tips.forEach((tip) => console.log(tip));
  } catch (error) {
    spinner.fail("An error occurred while creating the project.");
    console.error(error);
  }
};
