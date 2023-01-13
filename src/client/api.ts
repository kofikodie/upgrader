import axios from 'axios'
import {ERROR} from '../common/types'
import {NpmClientInterface} from './api.interface'
import {config} from './config'
import {NpmClientErrorResponse, NpmClientResponse, PackageInterface, SUCCESS} from './types'

const npmClient = axios.create({
    baseURL: config.registry,
    headers: {
        'Content-Type': 'application/json',
    },
})

const successHandler = <T>(response: T): T => response
const errorHandler = <T>(error: T): void => {
    throw new Error(`Fetching package from npm: ${error}`)
}

npmClient.interceptors.response.use(successHandler, errorHandler)

export default class NpmClient implements NpmClientInterface {
    async checkPackageVersion(packageName: string, packageVersion: string): Promise<NpmClientResponse> {
        try {
            const response = await npmClient.get(`/${packageName}`)
            const versions = Object.keys(response.data.versions)

            if (versions.includes(packageVersion) === false) {
                return {
                    status: ERROR,
                    context: `Package ${packageName} does not have version ${packageVersion}`,
                }
            }

            return {
                status: SUCCESS,
                context: `Package ${packageName} has version ${packageVersion}`,
            }
        } catch (error) {
            return {
                status: ERROR,
                context: `Error fetching package ${packageName} from npm. Error: ${error}`,
            }
        }
    }

    async checkPackageExists(packageName: string): Promise<NpmClientResponse> {
        try {
            const response = await npmClient.get(`/${packageName}`)
            if (response.status !== 200) {
                return {
                    status: ERROR,
                    context: `Package ${packageName} does not exist`,
                }
            }

            return {
                status: SUCCESS,
                context: `Package ${packageName} exists`,
            }
        } catch (error) {
            return {
                status: ERROR,
                context: `Package ${packageName} does not exist. Error: ${error}`,
            }
        }
    }

    async getPackageInfo(packageName: string): Promise<PackageInterface | NpmClientErrorResponse> {
        try {
            const response = await npmClient.get(`/${packageName}`)

            return response.data
        } catch (error) {
            return {
                status: ERROR,
                context: `Error fetching package ${packageName} from npm. Error: ${error}`,
            }
        }
    }

    async getPackageStableUpgradeVersions(packageInfo: PackageInterface, packageVersion: string): Promise<string[]> {
        const versions = Object.keys(packageInfo.versions)

        const orderedVersions = versions.sort((a, b) => {
            const aVersion = a.split('.')
            const bVersion = b.split('.')

            for (const [i, element] of aVersion.entries()) {
                if (element > bVersion[i]) {
                    return -1
                }

                if (element < bVersion[i]) {
                    return 1
                }
            }

            return 0
        })

        const stableVersions = orderedVersions.filter(version => {
            const versionParts = version.split('.')

            for (const element of versionParts) {
                if (element.includes('-') || Number.isNaN(Number(element))) {
                    return false
                }
            }

            return true
        })

        const upgradeVersions = stableVersions.filter(version => {
            let currentVersionParts = Number.parseInt(packageVersion.split('.').join(''), 10)
            if (packageVersion.split('.')[0] === '0') {
                currentVersionParts = [...currentVersionParts.toString()].unshift('0')
            }

            let versionParts = Number.parseFloat(version.split('.').join(''))
            if (version.split('.')[0] === '0') {
                versionParts = [...versionParts.toString()].unshift('0')
            }

            return versionParts > currentVersionParts
        })

        return upgradeVersions
    }
}
