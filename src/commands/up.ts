import {Command, Flags} from '@oclif/core'

export default class Up extends Command {
    static description = 'Upgrade a package to a specific version'

    static examples = [
        `$ upgrader up react -v 17.0.2
    TO BE IMPLEMENT! (./src/commands/up.ts)
    `,
    ]

    static flags = {
        // flag with a value (-v, --version=VALUE)
        version: Flags.string({char: 'v', aliases: ['version'], description: 'version to upgrade to'}),
    }

    static args = [{name: 'package', description: 'package name', required: true}]

    public async run(): Promise<void> {
        const {args, flags} = await this.parse(Up)

        const name = flags.name
        this.log(`Searching for ${args.package}...`)
        /* const name = flags.name ?? 'world'
        this.log(`hello ${name} from /app/src/commands/up.ts`)
        if (args.file && flags.force) {
            this.log(`you input --force and --file: ${args.file}`)
        } */
    }
}
