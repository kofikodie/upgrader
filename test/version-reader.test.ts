import * as fs from 'node:fs/promises'
import VersionReader from '../src/version-reader'
import {expect} from 'chai'

describe('Version Reader', async () => {
    const packageJsonFilePath = './test/package-test.json'

    beforeEach(async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({
            dependencies: {
                'library-name': '1.0.0',
                'library-name-2': '2.0.0',
            },
            devDependencies: {
                '@types/library-name': '1.0.0',
                '@types/library-name-2': '2.0.0',
            },
            peerDependencies: {
                'library-name-peer': '1.0.0',
                'library-name-peer-2': '2.0.0',
            },
        }, null, 4), 'utf8')
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

    it('should return all production dependencies', async () => {
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany('prod')

        expect(res.status).to.equal('SUCCESS')
        expect(res.body).to.equal('{"library-name":"1.0.0","library-name-2":"2.0.0"}')
    })

    it('should return an error if no production dependencies are found', async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({}), 'utf8')
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany('prod')

        expect(res.status).to.equal('ERROR')
        expect(res.body).to.equal('No production dependencies found')
    })

    it('should return all development dependencies', async () => {
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany('dev')

        expect(res.status).to.equal('SUCCESS')
        expect(res.body).to.equal('{"@types/library-name":"1.0.0","@types/library-name-2":"2.0.0"}')
    })

    it('should return an error if no development dependencies are found', async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({}), 'utf8')
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany('dev')

        expect(res.status).to.equal('ERROR')
        expect(res.body).to.equal('No development dependencies found')
    })

    it('should return all peer dependencies', async () => {
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany('peer')

        expect(res.status).to.equal('SUCCESS')
        expect(res.body).to.equal('{"library-name-peer":"1.0.0","library-name-peer-2":"2.0.0"}')
    })

    it('should return an error if no peer dependencies are found', async () => {
        await fs.writeFile(packageJsonFilePath, JSON.stringify({}), 'utf8')
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany('peer')

        expect(res.status).to.equal('ERROR')
        expect(res.body).to.equal('No peer dependencies found')
    })

    it('should return all dependencies if no mode is given', async () => {
        const vReader = new VersionReader(packageJsonFilePath)
        const res = await vReader.readMany()

        expect(res.status).to.equal('SUCCESS')
        expect(res.body).to.equal('{"library-name":"1.0.0","library-name-2":"2.0.0","@types/library-name":"1.0.0","@types/library-name-2":"2.0.0","library-name-peer":"1.0.0","library-name-peer-2":"2.0.0"}')
    })
})
