import path from "path"
import fs from "fs-extra"
import { type PackageJson } from "type-fest"

export function getPackageInfo() {
    try {
        // Resolve the path of the package.json relative to this file's location
        const packageJsonPath = path.resolve(__dirname, "../package.json");

        // Read and return the package.json contents
        return fs.readJSONSync(packageJsonPath) as PackageJson;
    } catch (error) {
        // If the file is not found or cannot be read, throw a specific error
        throw new Error("Could not find or read package.json. Please ensure it exists and is accessible.");
    }
}