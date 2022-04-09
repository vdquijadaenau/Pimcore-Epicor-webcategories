import * as fs from "fs";

import createFolderPaths from "./createFolders";
import ParseFile, { FolderStructure } from "./readCsvFiles";

import chalk from "chalk";

// filenames on root dir
const CSV_FILE_NAME = "webcategoriespimcore.csv";
const DATA_FILE_NAME = "dataFolders.json";

const headers = [
  "company",
  "partNumber",
  "webCategory",
  "subCategory",
  "family",
  "orderInFamily",
];

let folders: FolderStructure<string>[] = [];

//folder structure from file
ParseFile(CSV_FILE_NAME, DATA_FILE_NAME, headers)
  .then(() => {
    // Read & Parse Data
    const data = fs.readFileSync(DATA_FILE_NAME, { encoding: "utf-8" });
    folders = JSON.parse(data);

    //   create a set with each address
    const dirs = new Set<string>();

    folders.forEach((folder) => {
      const folderName: string =
        "/" +
        folder["webCategory"] +
        "/" +
        folder["subCategory"] +
        "/" +
        folder["family"];
      dirs.add(folderName);
    });

    console.log(chalk.bgBlueBright(dirs));
    dirs.forEach((dir) => {
      createFolderPaths(dir, true);
    });
  })
  .catch((err) => {
    console.error(chalk.redBright(err));
  });
