import { AbilityBuilder } from '@casl/ability'
import { User } from '@models'
import { AppAbility } from '..'

export type DefineAbility = (user: User, builder: AbilityBuilder<AppAbility>) => void