import {CommandInterface} from '../../src/commands/locals/local-cmd.interface'
import {ERROR, ResponseType, UPDATED} from '../../src/common/types'

export default class InstallLibraryVersionCommand implements CommandInterface {
    private filePath: string;
    private oldVersion: string;
    private newVersion: string;
    private libraryName: string;

    constructor(filePath: string, libraryName: string, newVersion: string, oldVersion = '') {
        this.filePath = filePath
        this.newVersion = newVersion
        this.oldVersion = oldVersion
        this.libraryName = libraryName
    }

    execute(): ResponseType {
        if (this.libraryName === 'library-name') {
            return {
                status: UPDATED,
                context: `Updated ${this.libraryName} to version ${this.newVersion}`,
            }
        }

        return {
            status: ERROR,
            context: `Error updating ${this.libraryName} to version ${this.newVersion}.`,
        }
    }

    undo(): ResponseType {
        if (this.oldVersion === '') {
            return {
                status: ERROR,
                context: `Error rollbacking ${this.libraryName} to previous version ${this.newVersion}.`,
            }
        }

        if (this.libraryName === 'library-name-rollback') {
            return {
                status: UPDATED,
                context: `Rollback ${this.libraryName} to previous version ${this.oldVersion}`,
            }
        }

        return {
            status: ERROR,
            context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: Run npm i ${this.libraryName}@${this.newVersion} to fix it`,
        }
    }
}
