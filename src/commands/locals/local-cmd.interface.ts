import {ResponseType} from '../../common/types'

export interface CommandInterface {
    execute(): Promise<ResponseType>
    undo(): Promise<ResponseType>
}
