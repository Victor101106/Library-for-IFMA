import { DefineAbility } from '../contracts'

const defineAbility: DefineAbility = function (user, { can, cannot }) {
    can('get', 'Book')
    can('get', 'Unit')
}

export default defineAbility