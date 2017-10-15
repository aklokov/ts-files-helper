import { parseImports } from '../src/lib';
import { Import } from '../src/interface';
import { expect } from 'chai';

describe('parseImports', function (): void {
  it('should return singular imports', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';

    const content = `
    import { Type1 } from '.';
    import { Type2 } from './';
`;
    const expected: Import[] = [
      { typeName: 'Type1', aliasName: 'Type1', realPath: './someDir/dir2' },
      { typeName: 'Type2', aliasName: 'Type2', realPath: './someDir/dir2' }
    ];

    // act
    const result = parseImports({}, content, path);

    // assert
    checkImports(result, expected);
  });

  it('should return multi imports', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';

    const content = `
    import { Type1, Type2 } from '.';
`;
    const expected: Import[] = [
      { typeName: 'Type1', aliasName: 'Type1', realPath: './someDir/dir2' },
      { typeName: 'Type2', aliasName: 'Type2', realPath: './someDir/dir2' }
    ];

    // act
    const result = parseImports({}, content, path);

    // assert
    checkImports(result, expected);
  });

  it('should return aliased imports', async function (): Promise<void> {
    // arrange
    const path = './someDir/dir2';

    const content = `
    import { Type1 } from '@tools';
    import { Type2 } from '@api/dir';
`;
    const baseUrl = './app';
    const paths = {
      '@api/*': ['api/*'],
      '@tools': ['tools/']
    };

    const expected: Import[] = [
      { typeName: 'Type1', aliasName: 'Type1', realPath: './app/tools' },
      { typeName: 'Type2', aliasName: 'Type2', realPath: './app/api/dir' }
    ];

    // act
    const result = parseImports({ baseUrl, paths }, content, path);

    // assert
    checkImports(result, expected);
  });

});

export function checkImports(imports: Import[], expected: Import[]): void {
  expect(imports).to.be.not.equal(undefined);
  expect(imports.length).to.be.equal(expected.length);
  for (let exp of expected) {
    const imp = imports.find(i => i.realPath === exp.realPath && i.typeName === exp.typeName);
    expect(imp).to.be.not.equal(undefined);
    expect(imp.aliasName).to.be.equal(exp.aliasName);
  }
}
