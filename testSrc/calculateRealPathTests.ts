import { calculateRealPath } from '../src/impl/calculateRealPath';
import { expect } from 'chai';

describe('calculatePath', function (): void {
  it('should return same directory', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = '.';
    const expected = './someDir/dir2';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return same directory when slashed', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = './';
    const expected = './someDir/dir2';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return same directory from root', async function (): Promise<void> {
    // arrange
    const path = '.';
    const importPath = '.';
    const expected = '.';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return path of subdirectory or neighbour file', async function (): Promise<void> {
    // arrange
    const path = './parent';
    const importPath = './child';
    const expected = './parent/child';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return path of parent directory', async function (): Promise<void> {
    // arrange
    const path = './parent/child';
    const importPath = '..';
    const expected = './parent';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return path of neighbour directory or parent file', async function (): Promise<void> {
    // arrange
    const path = './parent/child';

    const importPath = '../neighbour';
    const expected = './parent/neighbour';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return path from outside root', async function (): Promise<void> {
    // arrange
    const path = './parent';

    const importPath = '../../otherPath';
    const expected = '../otherPath';

    // act
    const result = calculateRealPath({}, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return aliased path without star', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = '@tools';
    const expected = './app/tools';
    const paths = {
      '@api/*': ['api/*'],
      '@tools': ['tools/']
    };
    const baseUrl = './app';

    // act
    const result = calculateRealPath({ baseUrl, paths }, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should return aliased path with star', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = '@api/dir';
    const expected = './app/api/dir';
    const paths = {
      '@api/*': ['api/*'],
      '@tools': ['tools/']
    };
    const baseUrl = './app';

    // act
    const result = calculateRealPath({ baseUrl, paths }, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

  it('should not alter non-aliased path', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';
    const importPath = 'some-lib';
    const expected = 'some-lib';
    const paths = {
      '@api/*': ['api/*'],
      '@tools': ['tools/']
    };
    const baseUrl = './app';

    // act
    const result = calculateRealPath({ baseUrl, paths }, path, importPath);

    // assert
    expect(result).to.be.equal(expected);
  });

});
