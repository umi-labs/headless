import { Command } from "commander";
import { add, create, help, init, remove } from "./commands";

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
      "display the current version",
    );

  // Command for initialising a new project
  program
    .command("init")
    .description("Initialises a new project")
    .option("-y, --yes", "Skip prompts and use default values")
    .option("-n, --name <name>", "Name of the project")
    .action((options) => {
      init(options);
    });

  // Command for creating a new project
  program
    .command("create")
    .description("Creates a new project")
    .option("-n, --name <name>", "Name of the project")
    .action(async (options) => {
      await create(options);
    });

  // // Command for adding components or features
  program
    .command("add")
    .description("Adds components or features to your project")
    .option("-n, --name <name>", "Name of the component")
    .option("-c, --component <component>", "Name of the component")
    .action(async (options) => {
      await add(options); // Pass the component name to add
    });

  // Command for removing components or features
  program
    .command("remove")
    .description("Removes components or features from your project")
    .option("-n, --name <name>", "Name of the component")
    .action(async (options) => {
      await remove(options); // Pass the component name to add
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
