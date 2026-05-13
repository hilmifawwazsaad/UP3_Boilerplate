import STYLES from './cls'
import RULES from './rule'

export const RULE_VISIBILITY = RULES

export const MENU_STYLE = STYLES

export const cls = (...args) => args.filter(Boolean).join(' ')
