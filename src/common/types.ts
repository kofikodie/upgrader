export type ResponseType = {
    status: typeof UPDATED | typeof ERROR | typeof ALREADY_UPDATED;
    context: string;
}
export const UPDATED = 'UPDATED'
export const ERROR = 'ERROR'
export const ALREADY_UPDATED = 'ALREADY_UPDATED'
export const SUCCESS = 'SUCCESS'
