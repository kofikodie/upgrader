import {expect, test} from '@oclif/test'

describe('latest', () => {
    test
        .stdout()
        .command(['latest', '--mode=prod', '--minor'])
        .it('should upgrade all minor prod packages version', ctx => {
            expect(ctx.stdout).to.contain('Upgrading production packages')
            expect(ctx.stdout).to.contain('Upgrading to latest minor version')
        })

    test
        .stdout()
        .command(['latest', '--mode=prod', '--major'])
        .it('should upgrade all major prod packages version', ctx => {
            expect(ctx.stdout).to.contain('Upgrading production packages')
            expect(ctx.stdout).to.contain('Upgrading to latest major version')
        })

    test
        .stdout()
        .command(['latest', '--mode=superdev', '--minor'])
        .it('should not upgrade all minor packages version with invalid mode', ctx => {
            expect(ctx.stdout).to.contain('Invalid mode. Valid modes are: dev/prod/peer, If omitted all sections will be upgraded')
        })

    test
        .stdout()
        .command(['latest', '--mode=dev', '--minor', '--major'])
        .it('should not upgrade packages version given both minor and major flag', ctx => {
            expect(ctx.stdout).to.contain('Please specify only major or minor version')
        })

    test
        .stdout()
        .command(['latest', '--mode=dev'])
        .it('should not upgrade packages version given no minor or major flag', ctx => {
            expect(ctx.stdout).to.contain('Please specify major or minor version')
        })
})
