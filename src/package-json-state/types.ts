export type StateResponse = {
    state: 'UPDATED' | 'ERROR' | 'ALREADY_UPDATED';
    context: string;
}
