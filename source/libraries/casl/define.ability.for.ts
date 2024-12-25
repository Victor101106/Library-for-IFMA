import { AbilityBuilder, CreateAbility, createMongoAbility, MongoAbility } from '@casl/ability'
import { User } from '@models'
import { abilities } from './abilities'
import { Subjects } from './subjects'

type AppAbilities = ['manage', 'all'] | Subjects

export type AppAbility = MongoAbility<AppAbilities>

export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {

    const builder = new AbilityBuilder(createAppAbility)

    abilities[user.role.value](user, builder)

    const ability = builder.build()

    ability.can = ability.can.bind(ability)
    
    ability.cannot = ability.cannot.bind(ability)

    return ability

}