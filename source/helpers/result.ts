export type Result<F, S> = Failure<F, S> | Success<F, S>

export class Failure<F, S> {

    constructor(readonly value: F) {}

    public failed(): this is Failure<F, S> {
        return true
    }

    public successfully(): this is Success<F, S> {
        return false
    }

}

export class Success<F, S> {

    constructor(readonly value: S) {}

    public failed(): this is Failure<F, S> {
        return false
    }

    public successfully(): this is Success<F, S> {
        return true
    }

}

export function failure<F, S>(F: F): Result<F, S> {
    return new Failure<F, S>(F)
}

export function success<F, S>(S: S): Result<F, S> {
    return new Success<F, S>(S)
}