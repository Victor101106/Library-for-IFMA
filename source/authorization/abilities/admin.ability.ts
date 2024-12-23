import { DefineAbility } from '../contracts'

const defineAbility: DefineAbility = function (user, { can, cannot }) {
    can('manage', 'all')
}

export default defineAbility