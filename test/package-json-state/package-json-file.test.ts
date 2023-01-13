import * as fs from 'node:fs/promises'
import PackageJsonFile from '../../src/package-json-state/package-json-file'
import {expect} from 'chai'

describe('PackageJsonFile', () => {
    let packageJsonFile: PackageJsonFile
    const packageJsonFilePath = './test/package-json-state/package-test.json'

    beforeEach(async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({dependencies: {'library-name': '1.0.0'}}, null, 4), 'utf8')
        packageJsonFile = new PackageJsonFile(packageJsonFilePath)
    })

    afterEach(async () => {
        await fs.unlink(packageJsonFilePath)
    })

    it('should update library version', async () => {
        const lnInit = await packageJsonFile.updateLibraryVersion('library-name', '2.0.0')
        const packageJson = JSON.parse(await fs.readFile(packageJsonFilePath, 'utf8'))

        expect(lnInit.state).to.equal('UPDATED')
        expect(packageJson.dependencies['library-name']).to.equal('2.0.0')
    })

    it('should not update already updated library version', async () => {
        const lnInit = await packageJsonFile.updateLibraryVersion('library-name', '2.0.0')
        const lnUpdated = await packageJsonFile.updateLibraryVersion('library-name', '2.0.0')

        expect(lnInit.state).to.equal('UPDATED')
        expect(lnUpdated.state).to.equal('ALREADY_UPDATED')
    })
})
