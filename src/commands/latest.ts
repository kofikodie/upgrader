import {Command, Flags} from '@oclif/core'
import * as fs from 'node:fs'

export default class Latest extends Command {
    static description = 'upgrade packages to latest major or minor version'

    static examples = [
        '$ upgrader latest --major --mode=dev',
    ]

    static flags = {
        mode: Flags.string({char: 'm', description: 'Indicate which libraries to upgrade: dev/prod/peer. If omitted upgrade all sections'}),
        major: Flags.boolean({description: 'upgrade to latest major version'}),
        minor: Flags.boolean({description: 'upgrade to latest minor version'}),
    }

    public async run(): Promise<void> {
        const {flags} = await this.parse(Latest)

        if (flags.mode && flags.mode !== 'dev' && flags.mode !== 'prod' && flags.mode !== 'peer') {
            this.log('Invalid mode. Valid modes are: dev/prod/peer, If omitted all sections will be upgraded')
            return
        }

        if (!flags.major && !flags.minor) {
            this.log('Please specify major or minor version')
            return
        }

        if (flags.major && flags.minor) {
            this.log('Please specify only major or minor version')
            return
        }

        const packageJsonFilePath = './package.json'

        if (!fs.existsSync(packageJsonFilePath)) {
            this.log('No package.json file found')
            return
        }

        this.log('Upgrading packages to latest version')

        switch (flags.mode) {
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

        if (flags.major) {
            this.log('Upgrading to latest major version')
        }

        if (flags.minor) {
            this.log('Upgrading to latest minor version')
        }

        this.log('Upgrading packages to latest version')
    }
}
