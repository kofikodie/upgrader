import {PackageInterface} from './types'

export interface NpmClientInterface {
    getPackageInfo(packageName: string): Promise<PackageInterface | {errorMessage: string}>
    getPackageStableUpgradeVersions(packageInfo: PackageInterface, packageVersion: string): Promise<string[]>
    checkPackageVersion(packageName: string, packageVersion: string): Promise<boolean>
    checkPackageExists(packageName: string): Promise<boolean>
}
