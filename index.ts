import createFolderPaths from "./createFolders";
import ParseFile, { FolderStructure } from "./readCsvFiles";

const CSV_FILE_NAME = "webcategoriespimcore.csv";

const folderCategories: FolderStructure<string>[] = ParseFile(CSV_FILE_NAME);

//createFolderPaths("/test/test/test2", true);
