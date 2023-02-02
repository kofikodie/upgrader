import {Command, Flags} from '@oclif/core'
import NpmClient from '../client/api'
import Upgrader from '../service/upgrader'
import VersionReader from '../version-reader'
import InstallLibraryVersionCommand from './locals/install'

export default class Up extends Command {
    static description = 'Upgrade a package to a specific version'

    static examples = [
        '$ upgrader up react -v 17.0.2',
    ]

    static flags = {
        version: Flags.string({char: 'v', aliases: ['version'], description: 'version to upgrade to'}),
    }

    static args = [{name: 'package', description: 'package name', required: true}]

    public async run(): Promise<void> {
        const {args, flags} = await this.parse(Up)
        const packageJsonFilePath = './package.json'

        this.log(`Searching for ${args.package}...`)

        if (!flags.version) {
            this.log('Please specify a version to upgrade to')
            return
        }

        this.log(`Upgrading ${args.package} to version ${flags.version}`)

        const currVersion = await new VersionReader(packageJsonFilePath).read(args.package)
        if (currVersion.status === 'ERROR') {
            this.log(`Aborting.. ${currVersion.body}`)
            return
        }

        const currVersionParsed = currVersion.body.replace(/[^\d.]/g, '')
        this.log(`Current version is ${currVersionParsed}`)

        if (currVersionParsed === flags.version) {
            this.log(`Already on version ${flags.version}`)
            return
        }

        const upgrader = new Upgrader(new NpmClient(), new InstallLibraryVersionCommand(
            packageJsonFilePath,
            args.package,
            flags.version,
            currVersionParsed,
        ))

        const res = await upgrader.updateSinglePackage(args.package, flags.version)

        if (res.status === 'ERROR') {
            this.log(`Error upgrading ${args.package}. Error ${res.context}`)
            return
        }

        this.log(`Upgraded ${args.package} to version ${flags.version}`)
    }
}
