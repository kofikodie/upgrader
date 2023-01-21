import * as fs from 'node:fs/promises'

export default class VersionReader {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath
    }

    async read(library: string): Promise<string> {
        const packageJson = JSON.parse(await fs.readFile(this.filePath, 'utf8'))
        return packageJson.dependencies[library]
    }
}
