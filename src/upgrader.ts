import {NpmClientInterface} from './client/api.interface'
import PackageJsonFile from './state/package-json-file'

export default class Upgrader {
    private npmClient: NpmClientInterface
    constructor(npmClient: NpmClientInterface) {
        this.npmClient = npmClient
    }

    async updateSinglePackage(packageName: string, packageVersion: string): Promise<boolean> {
        console.log(`Updating ${packageName} to version ${packageVersion}`)

        const packageExists = await this.npmClient.checkPackageExists(packageName)
        if (!packageExists) {
            console.log(`Package ${packageName} does not exist`)
            return false
        }

        const packageVersionExists = await this.npmClient.checkPackageVersion(packageName, packageVersion)

        if (!packageVersionExists) {
            console.log(`Package ${packageName} does not have version ${packageVersion}`)
            return false
        }

        console.log(`Updating ${packageName} to version ${packageVersion}...`)

        const packageJsonFile = new PackageJsonFile('./package.json')
        packageJsonFile.updateLibraryVersion(packageName, packageVersion)
        console.log(`Updated ${packageName} to version ${packageVersion}`)

        return true
    }
}
