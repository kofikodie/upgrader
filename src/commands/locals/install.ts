import {Command} from './local-cmd.interface'
import * as fs from 'node:fs'
import {exec} from 'node:child_process'

class InstallLibraryVersionCommand implements Command {
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

    execute(): void {
        const packageJson = JSON.parse(fs.readFileSync(this.filePath, 'utf8'))
        this.oldVersion = packageJson.dependencies[this.libraryName]

        exec(`npm install ${this.libraryName}@${this.newVersion}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return
            }

            console.log(`stdout: ${stdout}`)
        })
    }

    undo(): void {
        if (this.oldVersion === '') {
            return
        }

        exec(`npm install ${this.libraryName}@${this.oldVersion}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`)
                return
            }

            if (stderr) {
                console.log(`stderr: ${stderr}`)
                return
            }

            console.log(`stdout: ${stdout}`)
        })
    }
}
