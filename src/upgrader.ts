import {NpmClientInterface} from './client/api.interface'
import {ALREADY_UPDATED, ERROR, ResponseType, UPDATED} from './common/types'
import PackageJsonFile from './package-json-state/package-json-file'

export default class Upgrader {
    private npmClient: NpmClientInterface
    constructor(npmClient: NpmClientInterface) {
        this.npmClient = npmClient
    }

    async updateSinglePackage(packageName: string, packageVersion: string): Promise<ResponseType> {
        console.log(`Updating ${packageName} to version ${packageVersion}`)

        const packageExists = await this.npmClient.checkPackageExists(packageName)
        if (!packageExists) {
            return {
                status: ERROR,
                context: `Package ${packageName} does not exist`,
            }
        }

        const packageVersionExists = await this.npmClient.checkPackageVersion(packageName, packageVersion)

        if (!packageVersionExists) {
            return {
                status: ERROR,
                context: `Package ${packageName} does not have version ${packageVersion}`,
            }
        }

        console.log(`Updating ${packageName} to version ${packageVersion}...`)

        const packageJsonFile = new PackageJsonFile('./package.json')
        const pkjFile = await packageJsonFile.updateLibraryVersion(packageName, packageVersion)

        if (pkjFile.status === ERROR) {
            return {
                status: ERROR,
                context: `Error updating ${packageName} to version ${packageVersion}`,
            }
        }

        if (pkjFile.status === ALREADY_UPDATED) {
            return {
                status: ALREADY_UPDATED,
                context: `Already updated ${packageName} to version ${packageVersion}`,
            }
        }

        return {
            status: UPDATED,
            context: `Updated ${packageName} to version ${packageVersion}`,
        }
    }
}
