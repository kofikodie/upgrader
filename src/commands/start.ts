import {Command} from '@oclif/core'
import {prompt} from 'inquirer'
import NpmClient from '../client/api'
import VersionReader from '../version-reader'
import * as fs from 'node:fs'
import Upgrader from '../service/upgrader'
import InstallLibraryVersionCommand from './locals/install'

export default class Start extends Command {
    static description = 'start interactive mode to upgrade packages'

    static examples = [
        '$ upgrader start dev',
    ]

    static args = [{name: 'mode', description: 'Indicate which libraries to upgrade: dev/prod/peer. If omitted upgrade all sections', required: false}]

    public async run(): Promise<void> {
        const {args} = await this.parse(Start)

        if (args.mode && args.mode !== 'dev' && args.mode !== 'prod' && args.mode !== 'peer') {
            this.log('Invalid mode. Valid modes are: dev/prod/peer, If omitted all sections will be upgraded')
            return
        }

        const packageJsonFilePath = './package.json'

        if (!fs.existsSync(packageJsonFilePath)) {
            this.log('No package.json file found')
            return
        }

        const vReader = new VersionReader(packageJsonFilePath)
        const libraries = await vReader.readMany(args.mode ?? undefined)

        if (libraries.status === 'ERROR') {
            this.log(`Error reading libraries: ${libraries.body}`)
            return
        }

        const answers: {[key: string]: string} = await this.getInteractiveMode(libraries.body)

        switch (args.mode) {
        case undefined:
            this.log('Upgrading all packages')
            break
        case 'dev':
            this.log('Upgrading development packages')
            break
        case 'prod':
            this.log('Upgrading production packages')
            break
        case 'peer':
            this.log('Upgrading peer packages')
            break
        default:
            // handle the case where args.mode has an unexpected value
            break
        }

        const answersArray = Object.entries(answers).map(([library, version]) => ({library, version}))
        console.log(answersArray)

        const upgrader = new Upgrader(new NpmClient(), new InstallLibraryVersionCommand(
            packageJsonFilePath,
            '',
            '',
            '',
        ))

        const res = await upgrader.updateManyPackages(answersArray)

        if (res.status === 'ERROR') {
            this.log(`Error upgrading libraries. ${res.context}`)
            return
        }

        this.log('Done. Please consider putting a star on the project')
    }

    async getInteractiveMode(libraries: string): Promise<any> {
        const librariesArray = libraries.split(',')
        const librariesWithVersions = librariesArray.map(library => {
            const [nameWithSpecialChars, versionWithSpecialChars] = library.split(':')
            const version = versionWithSpecialChars.replace(/[^\d.]/g, '')
            const name = nameWithSpecialChars.replace(/["{}]/g, '')

            return {name, version}
        })

        const questions =  await Promise.all(
            librariesWithVersions.map(async library => ({
                type: 'list',
                name: library.name ?? '',
                message: `What version of ${library.name} do you want to upgrade to (Current version is ${library.version})?`,
                choices: library.version.length === 1 ? [library.version, 'None'] : [...await this.getVersions(library.name, library.version), 'None'],
            })))

        const answers = await prompt([
            ...questions,
        ])

        return answers
    }

    public async getVersions(library: string, version: string): Promise<string[]> {
        const npmClient = new NpmClient()

        const libraryInfo = await npmClient.getPackageInfo(library)

        if ('status' in libraryInfo) {
            this.log(`Error getting info for ${library}`)
            return []
        }

        const versions = await npmClient.getPackageStableUpgradeVersions(libraryInfo, version)

        return versions
    }
}
