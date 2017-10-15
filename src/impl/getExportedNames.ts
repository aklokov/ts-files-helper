import { execRegex } from '../tools/execRegex';

export function containsReexports(content: string): boolean {
  return getExportedNames(content).length > 0;
}

const funcRegex = /export[\s]*function[\s]*([^\s^\()]*)|export[\s]*async[\s]*function[\s]*([^\s^\()]*)/g;
const typeRegex = /export[\s]*enum[\s]*([^\s^{]*)|export[\s]*type[\s]*([^\s^{]*)/g;
const classRegex = /export[\s]*interface[\s]*([^\s^{]*)|export[\s]*class[\s]*([^\s^{]*)/g;
const constRegex = /export[\s]*const[\s]*([^\s]*)[\s]*[:[\s]*[^\s]*[\s]*]?=/g;
export function getExportedNames(content: string): string[] {
  const funcs = execRegex(funcRegex, content).map(match => match[1] || match[2]);
  const types = execRegex(typeRegex, content).map(match => match[1] || match[2]);
  const classes = execRegex(classRegex, content).map(match => match[1] || match[2]);
  const constants = execRegex(constRegex, content).map(match => match[1]);
  return [...funcs, ...types, ...classes, ...constants];
}
