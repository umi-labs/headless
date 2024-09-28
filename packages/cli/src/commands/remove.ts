import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import prompts from 'prompts';
import { Config } from '../utils/schema';

const { pathExists, readJSON } = fs;

export const remove = async (componentName: string) => {
    const spinner = ora();

    try {
        if (!componentName) {
            spinner.fail('Component name is required.');
            return;
        }



        // Get the config values
        // Load existing configuration
        let existingConfig: Config | {} = {};
        const configPath = path.resolve(process.cwd(), 'umirc.json');

        if (await pathExists(configPath)) {
            existingConfig = await readJSON(configPath);
        }

        // Validate config
        const config = existingConfig as Config;

        // Get the components and ui directories
        const componentDir = path.join(process.cwd(), 'app', `_${config.aliases.components}`, `${config.aliases.ui}`);

        // Define the path for the component to remove
        const componentPath = path.join(componentDir, `${componentName}.tsx`);

        // Check if the component exists
        if (!(await fs.pathExists(componentPath))) {
            spinner.fail(`Component "${componentName}" does not exist in the UI directory.`);
            return;
        }

        // Confirm with the user before deletion
        const { confirmDelete } = await prompts({
            type: 'confirm',
            name: 'confirmDelete',
            message: `Are you sure you want to delete the component "${componentName}"?`,
            initial: false,
        });

        if (!confirmDelete) {
            spinner.info('Component removal cancelled.');
            return;
        }

        spinner.start(`Removing component: ${componentName}...`);
        // Remove the component
        await fs.remove(componentPath);
        spinner.succeed(`Component "${componentName}" removed successfully from ${componentDir}.`);
    } catch (error) {
        spinner.fail('An error occurred while removing the component.');
        console.error(error);
    }
};
