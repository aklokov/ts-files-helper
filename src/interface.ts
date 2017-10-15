export interface Folder {
  path: string;
  files: string[];
}

export interface Import {
  typeName: string;
  aliasName: string;
  realPath: string;
}
