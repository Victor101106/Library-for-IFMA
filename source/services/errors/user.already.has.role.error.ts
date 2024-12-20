export class UserAlreadyHasRoleError extends Error {
    constructor() {
        super('The user already has role.')
        this.name = 'UserAlreadyHasRoleError'
    }
}