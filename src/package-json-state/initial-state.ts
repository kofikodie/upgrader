import PackageJsonFile from './package-json-file'
import {StateInterface} from './state.interface'
import * as fs from 'node:fs/promises'
import UpdatedState from './update-state'
import {StateResponse} from './types'

export default class InitialState implements StateInterface {
    private packageJsonFile: PackageJsonFile;

    constructor(packageJsonFile: PackageJsonFile) {
        this.packageJsonFile = packageJsonFile
    }

    async updateLibraryVersion(libraryName: string, newVersion: string): Promise<StateResponse> {
        const packageJson = JSON.parse(await fs.readFile(this.packageJsonFile.filePath, 'utf8'))
        packageJson.dependencies[libraryName] = newVersion
        try {
            await fs.writeFile(this.packageJsonFile.filePath, JSON.stringify(packageJson, null, 4), 'utf8')
        } catch (error) {
            return {
                state: 'ERROR',
                context: `error while updating library ${libraryName} to version ${newVersion}. Error: ${error}`,
            }
        }

        this.packageJsonFile.state = new UpdatedState(this.packageJsonFile)

        return {
            state: 'UPDATED',
            context: `library ${libraryName} updated to version ${newVersion}`,
        }
    }
}
