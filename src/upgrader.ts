import {NpmClientInterface} from './client/api.interface'
import {ALREADY_UPDATED, ERROR, ResponseType} from './common/types'
import PackageJsonFile from './package-json-state/package-json-file'

export default class Upgrader {
    private npmClient: NpmClientInterface
    private packageJsonFile: PackageJsonFile

    constructor(npmClient: NpmClientInterface, packageJsonFile: PackageJsonFile) {
        this.npmClient = npmClient
        this.packageJsonFile = packageJsonFile
    }

    async updateSinglePackage(packageName: string, packageVersion: string): Promise<ResponseType> {
        const packageExists = await this.npmClient.checkPackageExists(packageName)
        if (packageExists.status === ERROR) {
            return {
                status: ERROR,
                context: `Package ${packageName} does not exist`,
            }
        }

        const packageVersionExists = await this.npmClient.checkPackageVersion(packageName, packageVersion)

        if (packageVersionExists.status === ERROR) {
            return {
                status: ERROR,
                context: `Package ${packageName} does not have version ${packageVersion}`,
            }
        }

        const pkjFile = await this.packageJsonFile.updateLibraryVersion(packageName, packageVersion)

        if (pkjFile.status === ERROR) {
            return {
                status: pkjFile.status,
                context: `Error updating ${packageName} to version ${packageVersion}`,
            }
        }

        if (pkjFile.status === ALREADY_UPDATED) {
            return {
                status: pkjFile.status,
                context: `Already updated ${packageName} to version ${packageVersion}`,
            }
        }

        return {
            status: pkjFile.status,
            context: `Updated ${packageName} to version ${packageVersion}`,
        }
    }
}
