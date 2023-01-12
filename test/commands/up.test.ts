import {expect, test} from '@oclif/test'

describe('up', () => {
    test
        .stdout()
        .command(['up', 'react', '-v', 'jeff'])
        .it('upgrade a package given a version', ctx => {
            expect(ctx.stdout).to.contain('Searching for react...')
        })
})
