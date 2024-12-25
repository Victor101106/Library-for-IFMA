import { Unit } from '@models'

export type UnitActions = 'manage' | 'update' | 'create' | 'delete' | 'get-all' | 'get'

export type UnitFields = 'Unit' | Unit

export type UnitSubject = [ UnitActions, UnitFields ]