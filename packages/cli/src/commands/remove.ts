import fs from "fs-extra";
import path from "path";
import ora from "ora";
import prompts from "prompts";
import { Config } from "../utils/schema";

const { pathExists, readJSON } = fs;

export const remove = async (options: { name: string }) => {
  const spinner = ora();

  try {
    if (!options.name) {
      spinner.fail("Component name is required.");
      return;
    }

    // Get the config values
    // Load existing configuration
    let existingConfig: Config | {} = {};
    const configPath = path.resolve(process.cwd(), "umirc.json");

    if (await pathExists(configPath)) {
      existingConfig = await readJSON(configPath);
    }

    // Validate config
    const config = existingConfig as Config;

    // Get the components and ui directories
    const componentDir = path.join(
      process.cwd(),
      "app",
      `_${config.aliases.components}`,
      `${config.aliases.ui}`,
    );

    // Define the path for the component to remove
    const componentPath = path.join(componentDir, `${options.name}.tsx`);

    // Check if the component exists
    if (!(await fs.pathExists(componentPath))) {
      spinner.fail(
        `Component "${options.name}" does not exist in the UI directory.`,
      );
      return;
    }

    // Confirm with the user before deletion
    const { confirmDelete } = await prompts({
      type: "confirm",
      name: "confirmDelete",
      message: `Are you sure you want to delete the component "${options.name}"?`,
      initial: false,
    });

    if (!confirmDelete) {
      spinner.info("Component removal cancelled.");
      return;
    }

    spinner.start(`Removing component: ${options.name}...`);
    // Remove the component
    await fs.remove(componentPath);
    spinner.succeed(
      `Component "${options.name}" removed successfully from ${componentDir}.`,
    );
  } catch (error) {
    spinner.fail("An error occurred while removing the component.");
    console.error(error);
  }
};
