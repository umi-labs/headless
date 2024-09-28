import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import ora from 'ora';
import { z } from 'zod';
import chalk from 'chalk';
import { execa } from 'execa';

import { configSchema, Config } from '../utils/schema';
import { UTILS } from '../utils/templates';
import { configPrompts } from '../utils/prompts';

const { readJSON, writeJSON, pathExists, writeFile, ensureDir } = fs;

const DEFAULT_CONFIG = {
    name: 'my-project',
    aliases: {
        components: 'components',
        utils: 'utils',
        hooks: 'hooks',
        api: 'api',
        ui: 'ui',
    },
};

async function checkIfPackageInstalled(packageName: string): Promise<boolean> {
    try {
        // Check if the package is listed in dependencies or devDependencies in package.json
        const packageJsonPath = path.resolve(process.cwd(), 'package.json');
        const packageJson = await readJSON(packageJsonPath);

        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        // Return true if the package is found in either dependencies or devDependencies
        return packageName in dependencies || packageName in devDependencies;
    } catch (error) {
        console.warn(`Could not read package.json to verify ${packageName}. Proceeding with installation.`);
        return false;
    }
}

export async function init(options: { yes: boolean }) {
    const spinner = ora('Initialising project...').start();

    // Paths
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const umircJsonPath = path.resolve(process.cwd(), 'umirc.json');

    try {
        const packageJson = await readJSON(packageJsonPath);
        DEFAULT_CONFIG.name = packageJson.name || DEFAULT_CONFIG.name;
    } catch (error) {
        spinner.fail('Could not read package.json. Using default values.');
        console.warn('Using default values.');
    }

    let existingConfig: Config | {} = {};
    if (await pathExists(umircJsonPath)) {
        try {
            existingConfig = await readJSON(umircJsonPath);

            // Stop the spinner and log the existing configuration
            spinner.stop();
            console.log('Existing umirc.json found:', existingConfig);

            // Restart the spinner if needed
            spinner.start('Continuing with the initialisation...');
        } catch (error) {
            spinner.warn('Could not read umirc.json. Proceeding with default values.');
        }
    }

    // Stop the spinner before prompting
    spinner.stop();

    const highlight = (text: string) => chalk.cyan(text)

    let response: Partial<Config['aliases'] & { name: string }>;

    // Prompt user for input
    if (options.yes) {
        response = {
            name: (existingConfig as Config).name || DEFAULT_CONFIG.name,
            components: (existingConfig as Config).aliases?.components || DEFAULT_CONFIG.aliases.components,
            utils: (existingConfig as Config).aliases?.utils || DEFAULT_CONFIG.aliases.utils,
            hooks: (existingConfig as Config).aliases?.hooks || DEFAULT_CONFIG.aliases.hooks,
            api: (existingConfig as Config).aliases?.api || DEFAULT_CONFIG.aliases.api,
            ui: (existingConfig as Config).aliases?.ui || DEFAULT_CONFIG.aliases.ui,
        };
    } else {
        response = await prompts(configPrompts(existingConfig as Config, DEFAULT_CONFIG));
    }

    // Restarting the spinner for the next operation
    spinner.start('Validating and saving configuration...');

    const mergedConfig: Config = {
        name: response.name || (existingConfig as Config).name || '',
        aliases: {
            components: response.components || (existingConfig as Config).aliases?.components || '',
            utils: response.utils || (existingConfig as Config).aliases?.utils || '',
            hooks: response.hooks || (existingConfig as Config).aliases?.hooks || '',
            api: response.api || (existingConfig as Config).aliases?.api || '',
            ui: response.ui || (existingConfig as Config).aliases?.ui || '',
        },
    };

    try {
        const validatedData = configSchema.parse(mergedConfig);
        spinner.succeed('Project initialised successfully.');

        // Write config to a file (e.g., .umirc.json) using fs-extra
        spinner.start('Saving configuration...');
        await writeJSON(umircJsonPath, validatedData, { spaces: 2 });
        spinner.succeed('Configuration saved to umirc.json');

        spinner.start('Creating utils directory...');

        // Construct the utils directory path dynamically based on the alias value
        const utilsAlias = mergedConfig.aliases.utils;
        const utilsDir = path.join(process.cwd(), 'app', `_${utilsAlias}`);
        await ensureDir(utilsDir);

        const utilsFilePath = path.join(utilsDir, 'index.ts');
        await writeFile(utilsFilePath, UTILS);

        spinner.succeed(`Utils file created successfully at app/_${utilsAlias}/index.ts.`);

        // Check and install clsx and tailwind-merge if they are not already installed

        const packageRequirements = ['clsx', 'tailwind-merge'];
        const packagesToInstall = [];
        for (const packageName of packageRequirements) {
            if (!(await checkIfPackageInstalled(packageName))) {
                packagesToInstall.push(packageName);
            }
        }

        if (packagesToInstall.length > 0) {
            spinner.start(`Installing ${packagesToInstall.join(', ')}...`);
            await execa('npm', ['install', ...packagesToInstall], { stdio: 'inherit' });
            spinner.succeed(`${packagesToInstall.join(', ')} installed successfully.`);
        } else {
            spinner.succeed(`${packageRequirements.join(', ')} are already installed.`);
        }



    } catch (error) {
        spinner.fail('Validation failed.');
        if (error instanceof z.ZodError) {
            console.error('Validation errors:', error.errors);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}
