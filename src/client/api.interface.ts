import {NpmClientErrorResponse, NpmClientResponse, PackageInterface} from './types'

export interface NpmClientInterface {
    checkPackageVersion(packageName: string, packageVersion: string): Promise<NpmClientResponse>
    checkPackageExists(packageName: string): Promise<NpmClientResponse>
    getPackageInfo(packageName: string): Promise<PackageInterface | NpmClientErrorResponse>
    getPackageStableUpgradeVersions(packageInfo: PackageInterface, packageVersion: string): Promise<string[]>
}
