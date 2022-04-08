import * as fs from "fs";
import * as path from "path";

import { parse } from "csv-parse";

export type FolderStructure<T> = {
  [key: string]: T;
};

function ParseFile(fileName: string): FolderStructure<string>[] {
  const csvfilePath = path.resolve(__dirname, fileName);
  let results: FolderStructure<string>[] = [];

  const headers = [
    "company",
    "partNumber",
    "webCategory",
    "subCategory",
    "family",
    "orderInFamily",
  ];
  const fileContent = fs.readFileSync(csvfilePath, { encoding: "utf-8" });

  parse(
    fileContent,
    {
      delimiter: ",",
      columns: headers,
      fromLine: 2,
    },
    (error, result: FolderStructure<string>[]) => {
      if (error) {
        console.error(error);
      }
      console.log("Result", result);
      results = result;
    }
  );

  return results;
}

export default ParseFile;
