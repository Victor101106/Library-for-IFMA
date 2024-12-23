import { RoleEnum } from '@models'
import { DefineAbility } from '../contracts'
import admin from './admin.ability'
import employee from './employee.ability'
import student from './student.ability'
import unverified from './unverified.ability'

export const abilities: Record<RoleEnum, DefineAbility> = { unverified, employee, student, admin }