import { splitFilePath, FileWithDir } from './splitFilePath';
import { Folder } from '../interface';
import * as path from 'path';
import * as _ from 'lodash';

export function createFolders(files: FileWithDir[]): Folder[] {
  const grouped = _.groupBy(files, file => file.dir);
  const result: Folder[] = [];
  _.forIn(grouped, files => {
    const folderPath = files[0].dir;
    const folder: Folder = {
      path: folderPath,
      files: files.map(file => file.file)
    };
    result.push(folder);
  });
  return result;
}
