export interface FileWithDir {
    dir: string;
    file: string;
}
export declare function splitFilePath(filePath: string): FileWithDir;
