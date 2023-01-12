import PackageJsonFile from './package-json-file'
import {StateInterface} from './state.interface'
import * as fs from 'node:fs'
import UpdatedState from './update-state'

export default class InitialState implements StateInterface {
    private packageJsonFile: PackageJsonFile;

    constructor(packageJsonFile: PackageJsonFile) {
        this.packageJsonFile = packageJsonFile
    }

    updateLibraryVersion(libraryName: string, newVersion: string): void {
        const packageJson = JSON.parse(fs.readFileSync(this.packageJsonFile.filePath, 'utf8'))
        packageJson.dependencies[libraryName] = newVersion
        fs.writeFileSync(this.packageJsonFile.filePath, JSON.stringify(packageJson, null, 4), 'utf8')
        this.packageJsonFile.state = new UpdatedState(this.packageJsonFile)
    }
}
