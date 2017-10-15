import { calculateRealPath } from './calculateRealPath';
import { Import } from '../interface';
import { execRegex } from '../tools/execRegex';
import * as _ from 'lodash';

const regex = /import[\s]*{(.*)}[\s]*from[\s]*['|"](.*)['|"]/g;
export function parseImports(tsConfig: any, content: string, path: string): Import[] {
  const matches = execRegex(regex, content);
  const typeGroups = matches.map(match => parseMatch(tsConfig, match[1], match[2], path));
  return _.flatten(typeGroups);
}

function parseMatch(tsConfig: any, types: string, importline: string, path: string): Import[] {
  const realPath = calculateRealPath(tsConfig, path, importline);
  return types.split(',').map(type => createImport(type, realPath)).filter(x => x);
}

function createImport(type: string, realPath: string): Import {
  const parts = type.split(' ').filter(s => s.length);
  if (parts.length === 3 && parts[1] === 'as') {
    return {
      typeName: parts[0],
      aliasName: parts[2],
      realPath
    };
  } else if (parts.length > 0) {
    return {
      typeName: parts[0],
      aliasName: parts[0],
      realPath
    };
  }
}
