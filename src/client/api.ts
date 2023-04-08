import axios from 'axios'
import {ERROR, SUCCESS} from '../common/types'
import {NpmClientInterface} from './api.interface'
import {config} from './config'
import {NpmClientErrorResponse, NpmClientResponse, PackageInterface} from './types'

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
            const [aMajor, aMinor, aPatch] = a.split('.').map(element => Number(element))
            const [bMajor, bMinor, bPatch] = b.split('.').map(element => Number(element))

            if (aMajor !== bMajor) {
                return aMajor - bMajor
            }

            if (aMinor !== bMinor) {
                return aMinor - bMinor
            }

            return aPatch - bPatch
        }).slice(versions.indexOf(packageVersion) + 1, versions.indexOf(packageVersion) + 3)

        const stableVersions = orderedVersions.filter(version => {
            const versionParts = version.split('.')

            for (const element of versionParts) {
                if (element.includes('-') || Number.isNaN(Number(element))) {
                    return false
                }
            }

            return true
        })

        return stableVersions.slice(0, 2)
    }
}
