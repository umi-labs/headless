import { Command } from "commander";
import { init, create, add, remove, help } from "./commands";

import { getPackageInfo } from "./utils/package";

const program = new Command();

async function main() {
  const packageInfo = await getPackageInfo();

  program
    .name("umi")
    .description("A CLI tool for project management")
    .version(
      packageInfo.version || "0.0.1",
      "-v, --vers",
      "display the current version"
    );

  // Command for initialising a new project
  program
    .command("init")
    .description("Initialises a new project")
    .option("-y, --yes", "Skip prompts and use default values")
    .action((options) => {
      init(options);
    });

  // Command for creating a new project
  program
    .command("create [projectName]")
    .description("Creates a new project")
    .action(async (projectName) => {
      await create(projectName);
    });

  // // Command for adding components or features
  program
    .command("add [componentName]")
    .description("Adds components or features to your project")
    .action(async (componentName) => {
      await add(componentName); // Pass the component name to add
    });

  // Command for removing components or features
  program
    .command("remove [componentName]")
    .description("Removes components or features from your project")
    .action(async (componentName) => {
      await remove(componentName); // Pass the component name to add
    });

  // Command for displaying help information
  program
    .command("help")
    .description("Displays help information for UMI CLI")
    .action(help);

  // Show help if no command is specified
  if (process.argv.length < 3) {
    program.outputHelp();
  }

  program.parse(process.argv);
}

main();
