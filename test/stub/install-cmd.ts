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

    execute(): Promise<ResponseType> {
        if (this.libraryName === 'package-name') {
            return new Promise(resolve => {
                resolve({
                    status: UPDATED,
                    context: `Updated ${this.libraryName} to version ${this.newVersion}`,
                })
            })
        }

        return new Promise(resolve => {
            resolve({
                status: ERROR,
                context: `Error updating ${this.libraryName} to version ${this.newVersion}.`,
            })
        })
    }

    undo(): Promise<ResponseType> {
        if (this.oldVersion === '') {
            return new Promise(resolve => {
                resolve({
                    status: ERROR,
                    context: `Error updating ${this.libraryName} to version ${this.newVersion}.`,
                })
            })
        }

        if (this.libraryName === 'package-name-rollback') {
            return new Promise(resolve => {
                resolve({
                    status: UPDATED,
                    context: `Rollback ${this.libraryName} to previous version ${this.oldVersion}`,
                })
            })
        }

        return new Promise(resolve => {
            resolve({
                status: ERROR,
                context: `Error updating ${this.libraryName} to version ${this.newVersion}. Run npm i ${this.libraryName}@${this.newVersion} to fix it`,
            })
        })
    }
}
