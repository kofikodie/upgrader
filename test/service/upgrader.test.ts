import Upgrader from '../../src/service/upgrader'
import NpmClientStud from '../stub/api'
import {expect} from 'chai'
import * as fs from 'node:fs/promises'
import {ERROR, UPDATED} from '../../src/common/types'
import InstallLibraryVersionCommand from '../stub/install-cmd'

describe('Upgrader', async () => {
    const packageJsonFilePath = './test/package-test.json'

    beforeEach(async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({dependencies: {'library-name': '1.0.0'}}, null, 4), 'utf8')
    })

    afterEach(async () => {
        await fs.unlink(packageJsonFilePath)
    })

    it('should upgrade a package given a version', async () => {
        const packageName = 'package-name'
        const oldVersion = '1.0.0'
        const newVersion = '2.0.0'
        const installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, packageName, newVersion, oldVersion)

        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage(packageName, newVersion)

        expect(res.status).to.equal(UPDATED)
        expect(res.context).to.equal(`Updated ${packageName} to version ${newVersion}`)
    })

    it('should not upgrade a package given an invalid version', async () => {
        const packageName = 'package-name'
        const oldVersion = '1.0.0'
        const newVersion = '-1.0.0'
        const installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, packageName, newVersion, oldVersion)

        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage(packageName, newVersion)

        expect(res.status).to.equal(ERROR)
        expect(res.context).to.equal(`Package ${packageName} does not have version ${newVersion}`)
    })

    it('should not upgrade a package given an invalid package name', async () => {
        const packageName = 'package-name-invalid'
        const oldVersion = '1.0.0'
        const newVersion = '2.0.0'
        const installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, packageName, newVersion, oldVersion)

        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage(packageName, newVersion)

        expect(res.status).to.equal(ERROR)
        expect(res.context).to.equal(`Package ${packageName} does not exist`)
    })

    it('should not upgrade a package given an invalid package name and version', async () => {
        const packageName = 'package-name-invalid'
        const oldVersion = '1.0.0'
        const newVersion = '-1.0.0'
        const installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, packageName, newVersion, oldVersion)

        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage(packageName, newVersion)

        expect(res.status).to.equal(ERROR)
        expect(res.context).to.equal(`Package ${packageName} does not exist`)
    })

    it('should not upgrade and rollback when install cmd fail', async () => {
        const packageName = 'package-name-rollback'
        const oldVersion = '1.0.0'
        const newVersion = '2.0.0'
        const installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, packageName, newVersion, oldVersion)

        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage(packageName, newVersion)

        expect(res.status).to.equal(UPDATED)
        expect(res.context).to.equal(`Rollback ${packageName} to previous version ${oldVersion}`)
    })

    it('should not upgrade and not rollback when install cmd fail', async () => {
        const packageName = 'package-name-no-rollback'
        const oldVersion = '1.0.0'
        const newVersion = '2.0.0'
        const installLibVersCmd = new InstallLibraryVersionCommand(packageJsonFilePath, packageName, newVersion, oldVersion)

        const upgrader = new Upgrader(new NpmClientStud(), installLibVersCmd)
        const res = await upgrader.updateSinglePackage(packageName, newVersion)

        expect(res.status).to.equal(ERROR)
        expect(res.context).to.equal(`Error updating ${packageName} to version ${newVersion}. Run npm i ${packageName}@${newVersion} to fix it`)
    })
})
