import {StateResponse} from './types'

export interface StateInterface {
    updateLibraryVersion(libraryName: string, newVersion: string): Promise<StateResponse>;
}
