import * as shell from 'shelljs'
import {ERROR, ResponseType, UPDATED} from '../common/types'

export default class Upgrader {
    async updateSinglePackage(packageNameVersion: {packageName: string; packageVersion: string}): Promise<ResponseType> {
        return new Promise(resolve => {
            const command = `npm install ${packageNameVersion.packageName}@${packageNameVersion.packageVersion}`
            const result = shell.exec(command, {silent: true})

            if (result.code !== 0) {
                resolve({
                    status: ERROR,
                    context: `Error updating ${packageNameVersion.packageName} to version ${packageNameVersion.packageVersion}. ${result.stderr}`,
                })
                return
            }

            resolve({
                status: UPDATED,
                context: `Updated ${packageNameVersion.packageName} to version ${packageNameVersion.packageVersion}`,
            })
        })
    }

    async updateManyPackages(packagesNamesAndVersion: Array<{packageName: string; packageVersion: string}>): Promise<ResponseType> {
        return new Promise(resolve => {
            const command = `npm install ${packagesNamesAndVersion.map(({packageName, packageVersion}) => `${packageName}@${packageVersion}`).join(' ')}`
            const result = shell.exec(command, {silent: true})

            if (result.code !== 0) {
                resolve({
                    status: ERROR,
                    context: `Error updating packages to versions. Error: ${result.stderr}`,
                })
                return
            }

            resolve({
                status: UPDATED,
                context: 'Updated packages to versions',
            })
        })
    }
}
