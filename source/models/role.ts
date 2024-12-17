import { failure, Result, success } from '@helpers'
import { InvalidRoleError } from './errors'

export namespace Role {
    export type Request = string
    export type DTO = string
    export type Response = Role
}

export enum RoleEnum {
    Employee = "employee",
    Student = "student",
    Pending = "pending",
    Admin = "admin"
}

export class Role {

    private constructor (
        private role: RoleEnum
    ) {}

    public static create(role: Role.Request): Result<InvalidRoleError, Role.Response> {
        
        const isInvalidRole = !Role.validate(role)

        if (isInvalidRole)
            return failure(new InvalidRoleError(role))
        
        return success(new Role(role))

    }

    public static with(role: Role.DTO): Role.Response {
        return new Role(role as RoleEnum)
    }

    public static validate(role: string): role is RoleEnum {
        return !!Object.values(RoleEnum).find(value => value == role)
    }

    public update(role: string): Result<InvalidRoleError, string> {

        if (!Role.validate(role))
            return failure(new InvalidRoleError(role))

        return success(this.role = role)

    }

    public get value(): RoleEnum {
        return this.role
    }

}