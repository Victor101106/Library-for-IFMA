export class InvalidTimeSlotError extends Error {
    constructor(timeSlot: string) {
        super(`The time role "${timeSlot}" is invalid.`)
        this.name = 'InvalidTimeSlotError'
    }
}