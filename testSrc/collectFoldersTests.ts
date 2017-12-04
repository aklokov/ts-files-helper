import { collectFolders, Folder } from '../src/lib';
import { expect } from 'chai';
import { toStringMap } from 'hash-map';
import * as _ from 'lodash';

describe('collectFolders', function (): void {
  it('should correctly collect folders', async function (): Promise<void> {
    // arrange
    const expected: Folder[] = [{
      path: './testFolder',
      files: ['index.ts', 'file1.ts', 'file2.tsx']
    },
    {
      path: './testFolder/childFolder',
      files: ['file4.ts']
    },
    {
      path: './testFolder/emptyFolder/childOfEmptyFolder',
      files: ['index.ts']
    }];

    // act
    const result = await collectFolders(['./testFolder/**/*.ts', './testFolder/**/*.tsx']);

    // assert
    expect(result.length).to.be.equal(expected.length);
    testFolders(result, expected);
  });

  it('should collect folders with back slash', async function (): Promise<void> {
    // arrange
    const expected: Folder[] = [{
      path: './testFolder/childFolder',
      files: ['file4.ts']
    }];

    // act
    const result = await collectFolders('.\\testFolder\\childFolder\\**\\*.ts');

    // assert
    expect(result.length).to.be.equal(expected.length);
    testFolders(result, expected);
  });
});

function testFolders(result: Folder[], expected: Folder[]): void {
  const map = toStringMap(result, result => result.path);
  expected.forEach(folder => testFolder(map[folder.path], folder));
}

function testFolder(result: Folder, expected: Folder): void {
  expect(result).to.be.not.equal(undefined);
  expect(sort(result.files)).to.be.deep.equal(sort(expected.files));
}

function sort(arr: string[]): string[] {
  return _.sortBy(arr, x => x);
}
