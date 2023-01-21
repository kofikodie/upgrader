import {CommandInterface} from './local-cmd.interface'
import * as fs from 'node:fs'
import {exec} from 'node:child_process'
import {ERROR, ResponseType, UPDATED} from '../../common/types'

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
        const packageJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
        this.oldVersion = packageJson.dependencies[this.libraryName]

        exec(`npm install ${this.libraryName}@${this.newVersion}`, (error, stdout, stderr) => {
            if (error) {
                return {
                    status: ERROR,
                    context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: ${error.message}`,
                }
            }

            if (stderr) {
                return {
                    status: ERROR,
                    context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: ${stderr}`,
                }
            }

            return {
                status: UPDATED,
                context: `Updated ${this.libraryName} to version ${this.newVersion}`,
            }
        })

        return {
            status: UPDATED,
            context: `Updated ${this.libraryName} to version ${this.newVersion}`,
        }
    }

    undo(): ResponseType {
        if (this.oldVersion === '') {
            return {
                status: ERROR,
                context: `Error updating ${this.libraryName} to version ${this.newVersion}.`,
            }
        }

        exec(`npm install ${this.libraryName}@${this.oldVersion}`, (error, stdout, stderr) => {
            if (error) {
                return {
                    status: ERROR,
                    context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: ${error.message}`,
                }
            }

            if (stderr) {
                return {
                    status: ERROR,
                    context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: ${stderr}`,
                }
            }

            return {
                status: UPDATED,
                context: `Updated ${this.libraryName} to version ${this.newVersion}`,
            }
        })

        return {
            status: UPDATED,
            context: `Updated ${this.libraryName} to version ${this.newVersion}`,
        }
    }
}
