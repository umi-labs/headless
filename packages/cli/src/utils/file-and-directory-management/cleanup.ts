import { log } from "@clack/prompts";
import { pathExists, remove } from "fs-extra";

export async function cleanUp(path: string) {
  if (await pathExists(path)) {
    log.info("Cleaning up old temp directory...");
    await remove(path);
    log.success("Old temp directory removed.");
  }
}
