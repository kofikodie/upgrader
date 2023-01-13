import Upgrader from '../src/upgrader'
import NpmClientStud from '../test/stud/api'
import {expect} from 'chai'
import PackageJsonFile from '../src/package-json-state/package-json-file'
import * as fs from 'node:fs/promises'
import {ERROR, UPDATED} from '../src/common/types'

describe('Upgrader', async () => {
    let packageJsonFile: PackageJsonFile
    const packageJsonFilePath = './test/package-test.json'

    beforeEach(async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({dependencies: {'library-name': '1.0.0'}}, null, 4), 'utf8')
        packageJsonFile = new PackageJsonFile(packageJsonFilePath)
    })

    afterEach(async () => {
        await fs.unlink(packageJsonFilePath)
    })

    it('should upgrade a package given a version', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), packageJsonFile)
        const res = await upgrader.updateSinglePackage('library-name', '1.0.0')

        expect(res.status).to.equal(UPDATED)
    })

    it('should not upgrade a package given an invalid version', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), packageJsonFile)
        const res = await upgrader.updateSinglePackage('library-name', '-1.0.0')

        expect(res.status).to.equal(ERROR)
    })

    it('should not upgrade a package given an invalid package name', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), packageJsonFile)
        const res = await upgrader.updateSinglePackage('library-name-invalid', '1.0.0')

        expect(res.status).to.equal(ERROR)
    })

    it('should not upgrade a package given an invalid package name and version', async () => {
        const upgrader = new Upgrader(new NpmClientStud(), packageJsonFile)
        const res = await upgrader.updateSinglePackage('library-name-invalid', '-1.0.0')

        expect(res.status).to.equal(ERROR)
    })
})
