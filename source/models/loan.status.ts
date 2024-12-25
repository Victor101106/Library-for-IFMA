import { failure, Result, success } from '@helpers'
import { InvalidLoanStatusError } from './errors'

export namespace LoanStatus {
    export type Request = string
    export type DTO = string
    export type Response = LoanStatus
}

export enum LoanStatusEnum {
    Finished = "finished",
    Pending = "pending",
    Active = "active"
}

export class LoanStatus {

    private constructor (
        private loanStatus: LoanStatusEnum
    ) {}

    public static create(loanStatus: LoanStatus.Request): Result<InvalidLoanStatusError, LoanStatus.Response> {
        
        const isInvalidLoanStatus = !LoanStatus.validate(loanStatus)

        if (isInvalidLoanStatus)
            return failure(new InvalidLoanStatusError(loanStatus))
        
        return success(new LoanStatus(loanStatus))

    }

    public static with(loanStatus: LoanStatus.DTO): LoanStatus.Response {
        return new LoanStatus(loanStatus as LoanStatusEnum)
    }

    public static validate(loanStatus: string): loanStatus is LoanStatusEnum {
        return !!Object.values(LoanStatusEnum).find(value => value == loanStatus)
    }

    public update(loanStatus: string): Result<InvalidLoanStatusError, string> {

        if (!LoanStatus.validate(loanStatus))
            return failure(new InvalidLoanStatusError(loanStatus))

        return success(this.loanStatus = loanStatus)

    }

    public get value(): LoanStatusEnum {
        return this.loanStatus
    }

    public to(): LoanStatus.DTO {
        return this.value
    }

}