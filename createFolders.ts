import { rejects } from "assert";
import * as fs from "fs";
import * as path from "path";
import { resolve } from "path";

export type Folders = {
  folder: { subfolder: Folders[] };
};

function createFolderPaths(
  targetDir: string,
  isRelative: boolean = false
): Promise<boolean> {
  return new Promise<boolean>((resolve, rejects) => {
    const sep = path.sep;
    const initDir = path.isAbsolute(targetDir) ? sep : "";
    const baseDir = isRelative ? __dirname : ".";
    let curDir: string;
    return targetDir.split(sep).reduce((parentDir, childDir) => {
      if (isRelative) {
        curDir = path.join(baseDir, parentDir, childDir);
      } else {
        curDir = path.resolve(baseDir, parentDir, childDir);
      }

      fs.mkdir(curDir, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
          rejects(false);
        }
        console.log("Created dir:" + curDir);
        resolve(true);
      });
      return curDir;
    }, initDir);
  });
  // let baseDir: string;
  // console.log("boolean value " + isRelative);
}

export default createFolderPaths;
