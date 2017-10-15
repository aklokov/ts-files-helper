import * as path from 'path';

export interface FileWithDir {
  dir: string;
  file: string;
}

export function splitFilePath(filePath: string): FileWithDir {
  const dir = path.dirname(filePath);
  const file = filePath.substr(dir.length + 1);
  return {
    dir,
    file
  };
}
