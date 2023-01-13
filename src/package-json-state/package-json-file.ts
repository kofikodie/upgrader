import InitialState from './initial-state'
import {StateInterface} from './state.interface'
import {StateResponse} from './types'

export default class PackageJsonFile {
    public state: StateInterface;

    constructor(public filePath: string) {
        this.state = new InitialState(this)
    }

    updateLibraryVersion(libraryName: string, newVersion: string): Promise<StateResponse> {
        return this.state.updateLibraryVersion(libraryName, newVersion)
    }
}
