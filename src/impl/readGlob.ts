import * as glob from 'glob';

export function readGlob(globArg: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    glob(globArg, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

