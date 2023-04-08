import {expect, test} from '@oclif/test'

describe('start', () => {
    it('should not run start on all mode', () => {
        test
            .stdout()
            .command(['start'])
            .it('runs start', ctx => {
                expect(ctx.stdout).to.contain('Upgrading all packages')
            })
    })

    it('should not run start on dev mode', () => {
        test
            .stdout()
            .command(['start', 'dev'])
            .it('runs start on dev mode', ctx => {
                expect(ctx.stdout).to.contain('Upgrading development packages')
            })
    })

    it('should not run start on prod mode', () => {
        test
            .stdout()
            .command(['start', 'prod'])
            .it('runs start on prod mode', ctx => {
                expect(ctx.stdout).to.contain('Upgrading production packages')
            })
    })

    it('should not run start on peer mode', () => {
        test
            .stdout()
            .command(['start', 'peer'])
            .it('runs start on peer mode', ctx => {
                expect(ctx.stdout).to.contain('Upgrading peer packages')
            })
    })
})
