import {ALREADY_UPDATED} from '../common/types'
import PackageJsonFile from './package-json-file'
import {StateInterface} from './state.interface'
import {StateResponse} from './types'

export default class UpdatedState implements StateInterface {
    private packageJsonFile: PackageJsonFile;

    constructor(packageJsonFile: PackageJsonFile) {
        this.packageJsonFile = packageJsonFile
    }

    async updateLibraryVersion(libraryName: string, _newVersion: string): Promise<StateResponse> {
        return {
            status: ALREADY_UPDATED,
            context: `library ${libraryName} already updated`,
        }
    }
}
