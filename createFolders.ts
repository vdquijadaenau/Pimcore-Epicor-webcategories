import * as fs from "fs";
import * as path from "path";
import { compileFunction } from "vm";

export type Folders = {
  folder: { subfolder: Folders[] };
};

function createFolderPaths(targetDir: string, isRelative: boolean = false) {
  // let baseDir: string;
  // console.log("boolean value " + isRelative);
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
        return console.error(err);
      }
      console.log("Created dir:" + curDir);
    });
    return curDir;
  }, initDir);
}

export default createFolderPaths;
