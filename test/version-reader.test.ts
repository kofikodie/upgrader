import * as fs from 'node:fs/promises'
import VersionReader from '../src/version-reader'
import {expect} from 'chai'

describe('Upgrader', async () => {
    const packageJsonFilePath = './test/package-test.json'

    beforeEach(async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({dependencies: {'library-name': '1.0.0'}}, null, 4), 'utf8')
    })

    afterEach(async () => {
        await fs.unlink(packageJsonFilePath)
    })

    it('should return a package given a version given a package name', async () => {
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.read('library-name')

        expect(res.body).to.equal('1.0.0')
    })

    it('should return an error if the package is not found', async () => {
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.read('library-name-invalid')

        expect(res.status).to.equal('ERROR')
        expect(res.body).to.equal('Library library-name-invalid not found')
    })
})
