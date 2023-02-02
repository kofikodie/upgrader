import * as fs from 'node:fs/promises'
import {ERROR, SUCCESS} from './common/types'
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
                status: ERROR,
                body: `Library ${library} not found`,
            }
        }

        return {
            status: SUCCESS,
            body: prolib || devLib || peerLib,
        }
    }

    async readMany(mode?: string): Promise<{status: 'ERROR' | 'SUCCESS', body: string}> {
        const packageJson = JSON.parse(await fs.readFile(this.filePath, 'utf8'))

        if (mode === 'prod') {
            console.log('packageJson.dependencies', packageJson.dependencies)
            if (!packageJson.dependencies) {
                console.log('No production dependencies found')
                return {
                    status: ERROR,
                    body: 'No production dependencies found',
                }
            }

            return {
                status: SUCCESS,
                body: JSON.stringify(packageJson.dependencies),
            }
        }

        if (mode === 'dev') {
            if (!packageJson.devDependencies) {
                return {
                    status: ERROR,
                    body: 'No development dependencies found',
                }
            }

            return {
                status: SUCCESS,
                body: JSON.stringify(packageJson.devDependencies),
            }
        }

        if (mode === 'peer') {
            if (!packageJson.peerDependencies) {
                return {
                    status: ERROR,
                    body: 'No peer dependencies found',
                }
            }

            return {
                status: SUCCESS,
                body: JSON.stringify(packageJson.peerDependencies),
            }
        }

        const allDependencies = {
            ...packageJson.dependencies,
            ...packageJson.devDependencies,
            ...packageJson.peerDependencies,
        }

        return {
            status: SUCCESS,
            body: JSON.stringify(allDependencies),
        }
    }
}
