import {ResponseType} from '../../common/types'

export interface CommandInterface {
    execute(): ResponseType;
    undo(): ResponseType;
}
