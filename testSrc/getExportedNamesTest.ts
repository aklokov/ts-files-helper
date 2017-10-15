import { getExportedNames } from '../src/lib';
import { expect } from 'chai';
import * as _ from 'lodash';

describe('getExportedNames', function (): void {
  it('should return exported names', async function (): Promise<void> {
    // arrange
    const content = `
      export function someFunction(){}
      export async function someAsync(){}
      export interface someInterface{}
      export class someClass {}
      export type someType{}
      export enum someEnum {}
      export const someConst = {}
      `;
    const expected = [
      'someFunction', 'someAsync', 'someInterface', 'someClass',
      'someType', 'someEnum', 'someConst'
    ];
    const sortedExp = _.sortBy(expected, x => x);

    // act
    const result = getExportedNames(content);

    // assert
    const sortedResult = _.sortBy(result, x => x);
    expect(sortedResult).to.be.deep.equal(sortedExp);
  });

});
