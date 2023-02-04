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

        const cmdResult = this.installCmd.execute()

        if (cmdResult.status === ERROR) {
            this.installCmd.undo()

            return {
                status: cmdResult.status,
                context: cmdResult.context,
            }
        }

        return {
            status: cmdResult.status,
            context: cmdResult.context,
        }
    }

    async updateManyPackages(packages: Array<{ key: string; value: string }>): Promise<ResponseType> {
        const results = await Promise.all(packages.map(({key, value}) => this.updateSinglePackage(key, value)))

        return {
            status: results.every(({status}) => status === 'UPDATED') ? 'UPDATED' : 'ERROR',
            context: results.map(({context}) => context).join(''),
        }
    }
}
