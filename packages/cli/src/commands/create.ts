import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import prompts from 'prompts';
import { execa } from 'execa';
import simpleGit from 'simple-git';

const git = simpleGit();

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

        const targetDir = path.join(process.cwd(), projectName);

        // Check if the target directory already exists
        if (await fs.pathExists(targetDir)) {
            const { overwrite } = await prompts({
                type: 'confirm',
                name: 'overwrite',
                message: `The directory ${projectName} already exists. Do you want to overwrite it?`,
                initial: false,
            });

            if (!overwrite) {
                spinner.fail('Project creation cancelled.');
                return;
            }

            // Remove the existing directory if overwrite is confirmed
            await fs.remove(targetDir);
        }

        spinner.start('Cloning templates from GitHub...');

        // Clone the templates repository
        const templatesRepo = 'https://github.com/sneddonisaac/umi.git';
        const templatesDir = path.resolve(__dirname, '../../../templates');

        await git.clone(templatesRepo, templatesDir);

        // List available templates in the cloned directory
        const templates = await fs.readdir(path.join(templatesDir, 'templates'));

        if (templates.length === 0) {
            spinner.fail('No templates available in the templates directory.');
            return;
        }

        spinner.stop();

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

        const templatePath = path.join(templatesDir, 'templates', selectedTemplate);

        spinner.start(`Copying template: ${selectedTemplate}...`);

        // Copy the template to the target directory
        await fs.copy(templatePath, targetDir);

        spinner.succeed('Template copied.');

        // Run installation commands
        const packageManager = await prompts({
            type: 'select',
            name: 'manager',
            message: 'Which package manager would you like to use?',
            choices: [
                { title: 'npm', value: 'npm' },
                { title: 'yarn', value: 'yarn' },
            ],
            initial: 0,
        });

        spinner.start('Installing dependencies...');
        await execa(packageManager.manager, ['install'], { cwd: targetDir, stdio: 'inherit' });
        spinner.succeed('Dependencies installed.');

        spinner.succeed(`Project "${projectName}" created successfully!`);
    } catch (error) {
        spinner.fail('An error occurred while creating the project.');
        console.error(error);
    }
};
