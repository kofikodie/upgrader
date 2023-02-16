import {NpmClientInterface} from '../client/api.interface'
import {CommandInterface} from '../commands/locals/local-cmd.interface'
import {ERROR, ResponseType} from '../common/types'

export default class Upgrader {
    private npmClient: NpmClientInterface
    private installCmd: CommandInterface

    constructor(
        npmClient: NpmClientInterface,
        installCmd: CommandInterface,
    ) {
        this.npmClient = npmClient
        this.installCmd = installCmd
    }

    async updateSinglePackage(packageName: string, packageVersion: string): Promise<ResponseType> {
        const packageExists = await this.npmClient.checkPackageExists(packageName)
        if (packageExists.status === ERROR) {
            return {
                status: packageExists.status,
                context: packageExists.context,
            }
        }

        const packageVersionExists = await this.npmClient.checkPackageVersion(packageName, packageVersion)
        if (packageVersionExists.status === ERROR) {
            return {
                status: packageVersionExists.status,
                context: packageVersionExists.context,
            }
        }

        const cmdResult = await this.installCmd.execute()
        console.log(cmdResult)
        if (cmdResult.status === ERROR) {
            const iCmd = await this.installCmd.undo()

            return {
                status: iCmd.status,
                context: iCmd.context,
            }
        }

        return {
            status: cmdResult.status,
            context: cmdResult.context,
        }
    }

    async updateManyPackages(packages: Array<{ library: string; version: string }>): Promise<ResponseType> {
        const results = await Promise.all(packages.map(({library, version}) => this.updateSinglePackage(library, version)))

        return {
            status: results.every(({status}) => status === 'UPDATED') ? 'UPDATED' : 'ERROR',
            context: results.map(({context}) => context).join(''),
        }
    }
}
