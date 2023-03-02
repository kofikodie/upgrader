import {Command} from '@oclif/core'
import {prompt} from 'inquirer'
import NpmClient from '../client/api'
import VersionReader from '../version-reader'
import * as fs from 'node:fs'
import Upgrader from '../service/upgrader'

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
        const packages = await vReader.readMany(args.mode ?? undefined)

        if (packages.status === 'ERROR') {
            this.log(`Error reading packages: ${packages.body}`)
            return
        }

        const answers: {[key: string]: string} = await this.getInteractiveMode(packages.body)

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

        const answersArray = Object.entries(answers)
            .map(([packageName, packageVersion]) => ({packageName, packageVersion}))
            .filter(({packageVersion}) => packageVersion !== 'None')

        const upgrader = new Upgrader()
        const res = await upgrader.updateManyPackages(answersArray)

        if (res.status === 'ERROR') {
            this.log(`Error upgrading packages. Error ${res.context}`)
            return
        }

        this.log('Packages upgraded successfully. Please consider putting a star on the project')
    }

    async getInteractiveMode(packages: string): Promise<any> {
        const packagesArray = packages.split(',')
        const packagesWithVersions = packagesArray.map(library => {
            const [nameWithSpecialChars, versionWithSpecialChars] = library.split(':')
            const version = versionWithSpecialChars.replace(/[^\d.]/g, '')
            const name = nameWithSpecialChars.replace(/["{}]/g, '')

            return {name, version}
        })

        const questions =  await Promise.all(
            packagesWithVersions.map(async pkg => ({
                type: 'list',
                name: pkg.name ?? '',
                message: `What version of ${pkg.name} do you want to upgrade to (Current version is ${pkg.version})?`,
                choices: pkg.version.length === 1 ? [pkg.version, 'None'] : [...await this.getVersions(pkg.name, pkg.version), 'None'],
            })))

        const answers = await prompt([
            ...questions,
        ])

        return answers
    }

    public async getVersions(pkg: string, version: string): Promise<string[]> {
        const npmClient = new NpmClient()

        const pkgInfo = await npmClient.getPackageInfo(pkg)

        if ('status' in pkgInfo) {
            this.log(`Error getting info for ${pkg}`)
            return []
        }

        const versions = await npmClient.getPackageStableUpgradeVersions(pkgInfo, version)

        return versions
    }
}
