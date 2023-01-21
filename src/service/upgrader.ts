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

        const cmdResult = this.installCmd.execute()

        if (cmdResult.status === ERROR) {
            this.installCmd.undo()

            return {
                status: cmdResult.status,
                context: `Error updating ${packageName} to version ${packageVersion}. Error: ${cmdResult.context}. Rollback successful`,
            }
        }

        return {
            status: cmdResult.status,
            context: `Updated ${packageName} to version ${packageVersion}`,
        }
    }
}
