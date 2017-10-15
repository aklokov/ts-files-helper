import { Folder } from '../interface';
import * as _ from 'lodash';

import { splitFilePath } from './splitFilePath';
import { createFolders } from './createFolders';
import { readGlob } from './readGlob';

export function collectFolders(globs: string | string[]): Promise<Folder[]> {
  if (!Array.isArray(globs)) {
    globs = [globs];
  }

  return collectFoldersImpl(globs);
}

async function collectFoldersImpl(globs: string[]): Promise<Folder[]> {
  const allFiles = await Promise.all(globs.map(glob => readGlob(glob)));
  const files = _(allFiles).flatten().uniq().map(splitFilePath).value();
  return createFolders(files);
}
