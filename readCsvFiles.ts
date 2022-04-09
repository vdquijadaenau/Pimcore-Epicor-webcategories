import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";

import { parse } from "csv-parse";

export type FolderStructure<T> = {
  [key: string]: T;
};

function ParseFile(
  csvFileName: string,
  dataFileName: string,
  columnsHeaders: string[]
): Promise<boolean> {
  return new Promise<boolean>((resolve, rejects) => {
    const csvfilePath = path.resolve(__dirname, csvFileName);
    const fileContent = fs.readFileSync(csvfilePath, { encoding: "utf-8" });

    parse(
      fileContent,
      {
        delimiter: ",",
        columns: columnsHeaders,
        fromLine: 2,
      },
      (error, result: FolderStructure<string>[]) => {
        if (error) {
          console.error(chalk.bgRedBright(error));
          rejects(false);
        }
        const fileResult = JSON.stringify(result);
        const fs = require("fs");
        fs.writeFile(dataFileName, fileResult, (err: any) => {
          if (err) {
            rejects(false);
          }
          console.log(chalk.bgBlueBright("report created"));
          resolve(true);
        });
      }
    );
  });
}

export default ParseFile;
