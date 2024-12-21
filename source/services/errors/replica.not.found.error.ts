export class ReplicaNotFoundError extends Error {
    constructor() {
        super('Replica not found.')
        this.name = 'ReplicaNotFoundError'
    }
}