import * as fs from 'node:fs'
import PackageJsonFile from '../../src/state/package-json-file'
import {expect} from 'chai'

describe('PackageJsonFile', () => {
    let packageJsonFile: PackageJsonFile

    beforeEach(() => {
        packageJsonFile = new PackageJsonFile('./test/state/package.json')
        fs.writeFileSync('./test/state/package.json', JSON.stringify({dependencies: {'library-name': '1.0.0'}}, null, 4), 'utf8')
    })

    afterEach(() => {
        fs.unlinkSync('./test/state/package.json')
    })

    it('should update library version', () => {
        packageJsonFile.updateLibraryVersion('library-name', '2.0.0')
        const packageJson = JSON.parse(fs.readFileSync('./test/state/package.json', 'utf8'))
        expect(packageJson.dependencies['library-name']).to.equal('2.0.0')
    })

    /* it('should not update already updated library version', () => {
        packageJsonFile.updateLibraryVersion('library-name', '2.0.0')
        packageJsonFile.updateLibraryVersion('library-name', '2.0.0')
        expect(console.log).to.equal('library library-name already updated')
    }) */
})
