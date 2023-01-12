import nock from 'nock'
import {expect} from 'chai'
import NpmClient from '../../src/client/api'
import {config} from '../../src/client/config'
import npmApi from './npm-api.json'
import npmApiVersions from './npm-api-versions.json'

describe('Test npm apis', () => {
    const packageName = 'npm-api'
    const packageVersion = '0.4.13'

    const packageNameInvalid = 'npm-api-invalid'
    const packageVersionInvalid = '1.4.14'

    it('should return all info regarding to an npm package given a npm package name', async () => {
        nock(config.registry)
            .get(`/${packageName}`)
            .reply(200, npmApi)

        const npm = new NpmClient()
        const response = await npm.getPackageInfo(packageName)

        expect(response).to.has.property('_id')
        expect(response).to.has.property('_rev')
        expect(response).to.has.property('name')
        expect(response).to.has.property('dist-tags')
        expect(response).to.has.property('versions')
        expect(response).to.has.property('time')
        expect(response).to.has.property('maintainers')
        expect(response).to.has.property('license')
    })

    it('should return all the stable upgraded version of an package given the package name', async () => {
        nock(config.registry)
            .get(`/${packageName}`)
            .reply(200, npmApi)

        const npm = new NpmClient()
        const versions = await npm.getPackageStableUpgradeVersions(npmApi, packageVersion)

        expect(versions).to.eql(npmApiVersions.versions)
    })

    it('should return true if a package version exists', async () => {
        nock(config.registry)
            .get(`/${packageName}`)
            .reply(200, npmApi)

        const npm = new NpmClient()
        const exists = await npm.checkPackageVersion(packageName, packageVersion)

        expect(exists).to.be.true
    })

    it('should return false if a package version does not exists', async () => {
        nock(config.registry)
            .get(`/${packageNameInvalid}`)
            .reply(404)

        const npm = new NpmClient()
        const exists = await npm.checkPackageVersion(packageName, packageVersionInvalid)

        expect(exists).to.be.false
    })

    it('should return true if a package exists', async () => {
        nock(config.registry)
            .get(`/${packageName}`)
            .reply(200, npmApi)

        const npm = new NpmClient()
        const exists = await npm.checkPackageExists(packageName)

        expect(exists).to.be.true
    })

    it('should return false if a package does not exists', async () => {
        nock(config.registry)
            .get(`/${packageNameInvalid}`)
            .reply(404)

        const npm = new NpmClient()
        const exists = await npm.checkPackageExists(packageNameInvalid)

        expect(exists).to.be.false
    })
})
