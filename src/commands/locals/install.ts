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

    execute(): Promise<ResponseType> {
        return new Promise(resolve => {
            const packageJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
            this.oldVersion = packageJson.dependencies[this.libraryName]
            console.log(`npm install ${this.libraryName}@${this.newVersion}`)
            exec(`npm install ${this.libraryName}@${this.newVersion}`, (error, stdout, stderr) => {
                if (error) {
                    resolve({
                        status: ERROR,
                        context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: ${error.message}`,
                    })
                    return
                }

                if (stderr) {
                    resolve({
                        status: ERROR,
                        context: `Error updating ${this.libraryName} to version ${this.newVersion}. Error: ${stderr}`,
                    })
                    return
                }

                resolve({
                    status: UPDATED,
                    context: `Updated ${this.libraryName} to version ${this.newVersion}`,
                })
            })
        })
    }

    undo(): Promise<ResponseType> {
        return new Promise(resolve => {
            if (this.oldVersion === '') {
                resolve({
                    status: ERROR,
                    context: `Error updating ${this.libraryName} to version ${this.newVersion}.`,
                })
                return
            }

            exec(`npm install ${this.libraryName}@${this.oldVersion}`, (error, stdout, stderr) => {
                if (error) {
                    resolve({
                        status: ERROR,
                        context: `Error updating ${this.libraryName} to version ${this.oldVersion}. Error: ${error.message}`,
                    })
                    return
                }

                if (stderr) {
                    resolve({
                        status: ERROR,
                        context: `Error updating ${this.libraryName} to version ${this.oldVersion}. Error: ${stderr}`,
                    })
                    return
                }

                resolve({
                    status: UPDATED,
                    context: `Updated ${this.libraryName} to version ${this.oldVersion}`,
                })
            })
        })
    }
}
