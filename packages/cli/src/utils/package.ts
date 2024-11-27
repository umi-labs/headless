import path from "path";
import fs from "fs-extra";
import { type PackageJson } from "type-fest";
import { log } from "@clack/prompts";

const { readJSON, readJSONSync } = fs;

export function getPackageInfo() {
  try {
    // Resolve the path of the package.json relative to this file's location
    const packageJsonPath = path.resolve(__dirname, "../package.json");

    // Read and return the package.json contents
    return readJSONSync(packageJsonPath) as PackageJson;
  } catch (error) {
    // If the file is not found or cannot be read, throw a specific error
    throw new Error(
      "Could not find or read package.json. Please ensure it exists and is accessible.",
    );
  }
}

export async function checkIfPackageInstalled(
  packageName: string,
): Promise<boolean> {
  try {
    // Check if the package is listed in dependencies or devDependencies in package.json
    const packageJsonPath = path.resolve(process.cwd(), "package.json");
    const packageJson = await readJSON(packageJsonPath);

    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    // Return true if the package is found in either dependencies or devDependencies
    return packageName in dependencies || packageName in devDependencies;
  } catch (error) {
    log.warn(
      `Could not read package.json to verify ${packageName}. Proceeding with installation.`,
    );
    return false;
  }
}

export async function checkMultiPackageStatus(packages: Array<string>) {
  const packagesToInstall = [];
  for (const packageName of packages) {
    if (!(await checkIfPackageInstalled(packageName))) {
      packagesToInstall.push(packageName);
    }
  }
  return packagesToInstall;
}
