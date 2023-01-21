import * as fs from 'node:fs/promises'
export default class VersionReader {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath
    }

    async read(library: string): Promise<{status: 'ERROR' | 'SUCCESS', body: string}> {
        const packageJson = JSON.parse(await fs.readFile(this.filePath, 'utf8'))
        const prolib =  packageJson.dependencies[library]
        const devLib = packageJson.devDependencies?.[library]
        const peerLib = packageJson.peerDependencies?.[library]

        if (!prolib && !devLib && !peerLib) {
            return {
                status: 'ERROR',
                body: `Library ${library} not found`,
            }
        }

        return {
            status: 'SUCCESS',
            body: prolib || devLib || peerLib,
        }
    }
}
