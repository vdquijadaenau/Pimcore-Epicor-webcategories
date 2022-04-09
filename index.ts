import createFolderPaths from "./createFolders";
import ParseFile, { FolderStructure } from "./readCsvFiles";
import * as fs from "fs";

// filename on root dire
const CSV_FILE_NAME = "webcategoriesCSVfile.csv";
const DATA_FILE_NAME = "dataFolders.json";
let folders: FolderStructure<string>[] = [];
//folder structure from file
ParseFile(CSV_FILE_NAME, DATA_FILE_NAME)
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

    console.log(dirs);
    dirs.forEach((dir) => {
      createFolderPaths(dir, true);
    });
  })
  .catch((err) => {
    console.error(err);
  });
