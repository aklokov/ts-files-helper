import * as _ from 'lodash';
import { last } from '../tools/last-first';
import { combinePath } from '../tools/combinePath';

export function calculateRealPath(tsconfig: any, path: string, importLine: string): string {
  const splitPath = path.split('/');
  const splitImport = split(importLine);
  if (splitImport[0] !== '.' && splitImport[0] !== '..') {
    return applyPath(tsconfig, splitImport);
  }

  return calculateDiff(splitPath, splitImport);
}

function split(line: string): string[] {
  return line.replace(/\\/g, '/').split('/').filter(part => part.length);
}

function applyPath(tsconfig: any, split: string[]): string {
  split[0] = tryReplace(tsconfig, split[0]);
  return split.join('/');
}

function tryReplace(tsconfig: any, first: string): string {
  const pathstart: string = tsconfig.baseUrl;
  if (!tsconfig || !tsconfig.baseUrl) {
    return first;
  }

  let result = first;
  _.forIn(tsconfig.paths, (repl, path) => {
    if (path === first) {
      result = combinePath(pathstart, repl[0]);
    } else if (path === first + '/*') {
      result = combinePath(pathstart, repl[0].substr(0, repl[0].length - 2));
    }
  });

  return split(result).join('/');
}

function calculateDiff(path: string[], imp: string[]): string {
  imp.forEach(line => {
    if (line === '..') {
      path = subtractPath(path);
    } else if (line !== '.') {
      path = [...path, line];
    }
  });
  return path.join('/');
}

function subtractPath(path: string[]): string[] {
  const lastLine = last(path);
  if (lastLine === '.') {
    const lastRemoved = path.slice(0, path.length - 1);
    return [...lastRemoved, '..'];
  } else if (lastLine === '..') {
    return [...path, '..'];
  } else {
    return path.slice(0, path.length - 1);
  }
}
