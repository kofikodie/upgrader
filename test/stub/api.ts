import {NpmClientInterface} from '../../src/client/api.interface'
import {NpmClientErrorResponse, NpmClientResponse, PackageInterface} from '../../src/client/types'
import {ERROR, SUCCESS} from '../../src/common/types'
import npmApi from '../library-name.json'

export default class NpmClient implements NpmClientInterface {
    checkPackageVersion(packageName: string, packageVersion: string): Promise<NpmClientResponse> {
        if (packageVersion === '1.0.0' || packageVersion === '2.0.0') {
            return Promise.resolve(
                {
                    status: SUCCESS,
                    context: `Package ${packageName} has version ${packageVersion}`,
                },
            )
        }

        return Promise.resolve(
            {
                status: ERROR,
                context: `Package ${packageName} does not have version ${packageVersion}`,
            },
        )
    }

    checkPackageExists(packageName: string): Promise<NpmClientResponse> {
        if (packageName === 'package-name' || packageName === 'package-name-rollback' || packageName === 'package-name-no-rollback') {
            return Promise.resolve(
                {
                    status: SUCCESS,
                    context: `Package ${packageName} exists`,
                },
            )
        }

        return Promise.resolve(
            {
                status: ERROR,
                context: `Package ${packageName} does not exist`,
            },
        )
    }

    getPackageInfo(packageName: string): Promise<PackageInterface | NpmClientErrorResponse> {
        if (packageName === 'package-name') {
            return Promise.resolve(npmApi)
        }

        return Promise.resolve(
            {
                status: ERROR,
                context: `Error fetching package ${packageName} from npm`,
            },
        )
    }

    getPackageStableUpgradeVersions(packageInfo: PackageInterface, packageVersion: string): Promise<string[]> {
        if (packageInfo.name === 'library-name' && packageVersion === '1.0.0') {
            return Promise.resolve(['2.0.0', '3.0.0'])
        }

        return Promise.resolve([])
    }
}
