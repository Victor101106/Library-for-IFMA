import { DefineAbility } from '../contracts'

const defineAbility: DefineAbility = function (user, { can, cannot }) {
    cannot('manage', 'all')
}

export default defineAbility