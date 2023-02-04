import Upgrader from '../../src/service/upgrader'
import NpmClientStud from '../stud/api'
import {expect} from 'chai'
import * as fs from 'node:fs/promises'
import {ERROR, SUCCESS, UPDATED} from '../../src/common/types'
import InstallLibraryVersionCommand from '../stud/install-cmd'
import {CommandInterface} from '../../src/commands/locals/local-cmd.interface'

describe('Upgrader', async () => {
    let installLibVersCmd: CommandInterface
    const packageJsonFilePath = './test/package-test.json'

    beforeEach(async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({dependencies: {'library-name': '1.0.0'}}, null, 4), 'utf8')
        installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, 'library-name', '2.0.0', '1.0.0')
    })

    afterEach(async () => {
        await fs.unlink(packageJsonFilePath)
    })

    it('should upgrade a package given a version', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage('library-name', '1.0.0')

        expect(res.status).to.equal(UPDATED)
    })

    it('should not upgrade a package given an invalid version', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage('library-name', '-1.0.0')

        expect(res.status).to.equal(ERROR)
    })

    it('should not upgrade a package given an invalid package name', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage('library-name-invalid', '1.0.0')

        expect(res.status).to.equal(ERROR)
    })

    it('should not upgrade a package given an invalid package name and version', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage('library-name-invalid', '-1.0.0')

        expect(res.status).to.equal(ERROR)
    })

    it('should not upgrade a package and rollback given a version and a package.json with a failed install cmd', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage('library-name-rollback', '1.0.0')

        expect(res.status).to.equal(SUCCESS)
        expect(res.context).to.equal('Rollback library-name-rollback to previous version 1.0.0')
    })
})
