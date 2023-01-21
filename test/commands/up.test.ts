import {expect, test} from '@oclif/test'

describe('up', () => {
    it('should upgrade a library given a valid version', () => {
        test
            .stdout()
            .command(['up', 'library-name', '1.0.0'])
            .it('should upgrade a library given a valid version', ctx => {
                expect(ctx.stdout).to.contain('Upgraded library-name to version 1.0.0')
            })
    })

    it('should not upgrade a library given an invalid version', () => {
        test
            .stdout()
            .command(['up', 'library-name', '-1.0.0'])
            .it('should not upgrade a library given an invalid version', ctx => {
                expect(ctx.stdout).to.contain('`Error upgrading. Error Package library-name does not have version -1.0.0`')
            })
    })

    it('should not upgrade a library given an invalid library name', () => {
        test
            .stdout()
            .command(['up', 'library-name-invalid', '1.0.0'])
            .it('should not upgrade a library given an invalid library name', ctx => {
                expect(ctx.stdout).to.contain('`Error upgrading. Error Package library-name-invalid does not exist`')
            })
    })

    it('should not upgrade a library given new version equal to current version', () => {
        test
            .stdout()
            .command(['up', 'library-name', '1.0.0'])
            .it('should not upgrade a library given new version equal to current version', ctx => {
                expect(ctx.stdout).to.contain('Already on version 1.0.0')
            })
    })
})
