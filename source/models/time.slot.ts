import { failure, Result, success } from '@helpers'
import { InvalidTimeSlotError } from './errors'

export namespace TimeSlot {
    export type Request = string
    export type DTO = string
    export type Response = TimeSlot
}

export enum TimeSlotEnum {
    Afternoon = "afternoon",
    Morning = "morning"
}

export class TimeSlot {

    private constructor (
        private timeslot: TimeSlotEnum
    ) {}

    public static create(timeslot: TimeSlot.Request): Result<InvalidTimeSlotError, TimeSlot.Response> {
        
        const isInvalidTimeSlot = !TimeSlot.validate(timeslot)

        if (isInvalidTimeSlot)
            return failure(new InvalidTimeSlotError(timeslot))
        
        return success(new TimeSlot(timeslot))

    }

    public static with(timeslot: TimeSlot.DTO): TimeSlot.Response {
        return new TimeSlot(timeslot as TimeSlotEnum)
    }

    public static validate(timeslot: string): timeslot is TimeSlotEnum {
        return !!Object.values(TimeSlotEnum).find(value => value == timeslot)
    }

    public update(timeslot: string): Result<InvalidTimeSlotError, string> {

        if (!TimeSlot.validate(timeslot))
            return failure(new InvalidTimeSlotError(timeslot))

        return success(this.timeslot = timeslot)

    }

    public get value(): TimeSlotEnum {
        return this.timeslot
    }

    public to(): TimeSlot.DTO {
        return this.value
    }

}