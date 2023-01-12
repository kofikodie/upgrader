import InitialState from './initial-state'
import {StateInterface} from './state.interface'

export default class PackageJsonFile {
    public state: StateInterface;

    constructor(public filePath: string) {
        this.state = new InitialState(this)
    }

    updateLibraryVersion(libraryName: string, newVersion: string): void {
        this.state.updateLibraryVersion(libraryName, newVersion)
    }
}
