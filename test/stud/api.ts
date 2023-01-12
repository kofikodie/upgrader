import {NpmClientInterface} from '../../src/client/api.interface'
import {PackageInterface} from '../../src/client/types'
import npmApi from '../integration/npm-api.json'

export default class NpmClient implements NpmClientInterface {
    getPackageInfo(packageName: string): Promise<PackageInterface | { errorMessage: string; }> {
        if (packageName === 'npm-api') {
            return Promise.resolve(npmApi)
        }

        return Promise.resolve({errorMessage: 'Package not found'})
    }

    getPackageStableUpgradeVersions(packageInfo: PackageInterface, packageVersion: string): Promise<string[]> {
        if (packageInfo.name === 'npm-api' && packageVersion === '0.4.13') {
            return Promise.resolve(['0.4.14', '0.4.15'])
        }

        return Promise.resolve([])
    }

    checkPackageVersion(packageName: string, packageVersion: string): Promise<boolean> {
        if (packageName === 'npm-api' && packageVersion === '0.4.13') {
            return Promise.resolve(true)
        }

        return Promise.resolve(false)
    }

    checkPackageExists(packageName: string): Promise<boolean> {
        if (packageName === 'npm-api') {
            return Promise.resolve(true)
        }

        return Promise.resolve(false)
    }
}
