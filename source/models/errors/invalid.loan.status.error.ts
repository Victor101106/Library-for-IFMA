export class InvalidLoanStatusError extends Error {
    constructor(loanStatus: string) {
        super(`The loan status "${loanStatus}" is invalid.`)
        this.name = 'InvalidLoanStatusError'
    }
}