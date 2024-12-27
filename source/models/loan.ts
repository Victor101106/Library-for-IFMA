import { Failure, failure, Result, success } from '@helpers'
import { Code, Id, LoanStatus, LoanStatusEnum, OptionalId, OptionalTimestamp, TimeSlot, Timestamp } from './index'

export namespace Loan {
    
    export type Request = {
        pickupTime: string
        returnTime: string
        unitCode: number
        startsAt: number
        userId: string
        endsAt: number
    }
    
    export type DTO = Request & {
        confirmedBy?: string
        finishedBy?: string
        returnedAt?: number
        createdAt: number
        updatedAt: number
        status: string
        id: string
    }
    
    export type Response = Loan
    
    export namespace Update {
        export type Request = {
            confirmedBy?: string
            finishedBy?: string
            pickupTime?: string
            returnTime?: string
            returnedAt?: number
            status?: string
        }
        export type Response = Loan
    }

}

export class Loan {

    private constructor (
        public readonly confirmedBy: OptionalId,
        public readonly finishedBy : OptionalId,
        public readonly pickupTime : TimeSlot,
        public readonly returnTime : TimeSlot,
        public readonly returnedAt : OptionalTimestamp,
        public readonly createdAt  : Timestamp,
        public readonly updatedAt  : Timestamp,
        public readonly startsAt   : Timestamp,
        public readonly unitCode   : Code,
        public readonly status     : LoanStatus,
        public readonly endsAt     : Timestamp,
        public readonly userId     : Id,
        public readonly id         : Id
    ) {}

    public static create(request: Loan.Request): Result<Error, Loan.Response> {
        
        const statusResult     = LoanStatus.create(LoanStatusEnum.Pending)
        const pickupTimeResult = TimeSlot  .create(request.pickupTime)
        const returnTimeResult = TimeSlot  .create(request.returnTime)
        const unitCodeResult   = Code      .create(request.unitCode)

        if (statusResult.failed())
            return failure(statusResult.value)

        if (pickupTimeResult.failed())
            return failure(pickupTimeResult.value)
        
        if (returnTimeResult.failed())
            return failure(returnTimeResult.value)
        
        if (unitCodeResult.failed())
            return failure(unitCodeResult.value)
        
        const pickupTime = pickupTimeResult.value
        const returnTime = returnTimeResult.value
        const unitCode   = unitCodeResult  .value
        const status     = statusResult    .value
        
        const confirmedBy = OptionalId       .create(undefined)
        const finishedBy  = OptionalId       .create(undefined)
        const returnedAt  = OptionalTimestamp.create(undefined)

        const startsAt = Timestamp.create(request.startsAt)
        const endsAt   = Timestamp.create(request.endsAt)

        const createdAt = Timestamp.create()
        const updatedAt = Timestamp.create()

        const userId = Id.create(request.userId)
        const id     = Id.create()
        
        return success(new Loan(confirmedBy, finishedBy, pickupTime, returnTime, returnedAt, createdAt, updatedAt, startsAt, unitCode, status, endsAt, userId, id))

    }

    public static with(data: Loan.DTO): Loan.Response {

        const confirmedBy = OptionalId       .with(data.confirmedBy)
        const finishedBy  = OptionalId       .with(data.finishedBy)
        const pickupTime  = TimeSlot         .with(data.pickupTime)
        const returnTime  = TimeSlot         .with(data.returnTime)
        const returnedAt  = OptionalTimestamp.with(data.returnedAt)
        const createdAt   = Timestamp        .with(data.createdAt)
        const updatedAt   = Timestamp        .with(data.updatedAt)
        const startsAt    = Timestamp        .with(data.startsAt)
        const unitCode    = Code             .with(data.unitCode)
        const status      = LoanStatus       .with(data.status)
        const endsAt      = Timestamp        .with(data.endsAt)
        const userId      = Id               .with(data.userId)
        const id          = Id               .with(data.id)
        
        return new Loan(confirmedBy, finishedBy, pickupTime, returnTime, returnedAt, createdAt, updatedAt, startsAt, unitCode, status, endsAt, userId, id)

    }

    public update(request: Loan.Update.Request): Result<Error, Loan.Update.Response> {

        const results = [
            request.confirmedBy ? this.confirmedBy.update(request.confirmedBy) : undefined,
            request.finishedBy  ? this.finishedBy .update(request.finishedBy)  : undefined,
            request.returnedAt  ? this.returnedAt .update(request.returnedAt)  : undefined,
            request.pickupTime  ? this.pickupTime .update(request.pickupTime)  : undefined,
            request.returnTime  ? this.returnTime .update(request.returnTime)  : undefined,
            request.status      ? this.status     .update(request.status)      : undefined
        ]

        for (const result of results)
            if (result instanceof Failure)
                return failure(result.value)
        
        this.updatedAt.update(new Date())

        return success(this)

    }

    public to(): Loan.DTO {

        const confirmedBy = this.confirmedBy.to()
        const finishedBy  = this.finishedBy .to()
        const pickupTime  = this.pickupTime .to()
        const returnTime  = this.returnTime .to()
        const returnedAt  = this.returnedAt .to()
        const createdAt   = this.createdAt  .to()
        const updatedAt   = this.updatedAt  .to()
        const startsAt    = this.startsAt   .to()
        const unitCode    = this.unitCode   .to()
        const status      = this.status     .to()
        const endsAt      = this.endsAt     .to()
        const userId      = this.userId     .to()
        const id          = this.id         .to()

        return { confirmedBy, finishedBy, pickupTime, returnTime, returnedAt, createdAt, updatedAt, startsAt, unitCode, status, endsAt, userId, id }

    }

}