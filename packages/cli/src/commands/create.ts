import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import prompts from 'prompts';
import { execa } from 'execa';

const { copy } = fs;

export const create = async (projectName?: string) => {
    const spinner = ora('Setting up a new project...').start();

    try {
        // Prompt for the project name if not provided
        if (!projectName) {
            const response = await prompts({
                type: 'text',
                name: 'projectName',
                message: 'What is the name of the new project?',
            });

            projectName = response.projectName;
        }

        if (!projectName) {
            spinner.fail('Project name is required.');
            return;
        }

        // Define paths
        const templatesDir = path.resolve(__dirname, '../../../templates');
        const targetDir = path.join(process.cwd(), projectName);

        // Check if the templates directory exists
        if (!(await fs.pathExists(templatesDir))) {
            spinner.fail('Templates directory not found.');
            return;
        }

        // List available templates
        const templates = await fs.readdir(templatesDir);

        if (templates.length === 0) {
            spinner.fail('No templates available in the templates directory.');
            return;
        }

        // Prompt user to select a template
        const { selectedTemplate } = await prompts({
            type: 'select',
            name: 'selectedTemplate',
            message: 'Select a template:',
            choices: templates.map((template) => ({
                title: template,
                value: template,
            })),
        });

        if (!selectedTemplate) {
            spinner.fail('Template selection is required.');
            return;
        }

        const templatePath = path.join(templatesDir, selectedTemplate);

        // Clone the template into the target directory
        await copy(templatePath, targetDir);

        // Run installation commands
        spinner.start('Installing dependencies...');
        await execa('npm', ['install'], { cwd: targetDir, stdio: 'inherit' });
        spinner.succeed('Dependencies installed.');

        spinner.succeed(`Project "${projectName}" created successfully!`);
    } catch (error) {
        spinner.fail('An error occurred while creating the project.');
        console.error(error);
    }
};
