import PackageJsonFile from './package-json-file'
import {StateInterface} from './state.interface'

export default class UpdatedState implements StateInterface {
    private packageJsonFile: PackageJsonFile;

    constructor(packageJsonFile: PackageJsonFile) {
        this.packageJsonFile = packageJsonFile
    }

    updateLibraryVersion(libraryName: string, _newVersion: string): void {
        console.log(`library ${libraryName} already updated`)
    }
}
