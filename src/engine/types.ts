// ───────────────────────────────────────────────────────────────
//  LOUP GAROU BEL TOUNSI — types du moteur
// ───────────────────────────────────────────────────────────────

export type Camp = 'village' | 'loups' | 'solo' | 'amoureux' | 'variable'
export type Phase = 'setup' | 'night' | 'morning' | 'debate' | 'vote' | 'end'
export type Wake = 'first_night' | 'every_night' | 'on_demand' | 'never'

export interface RoleDef {
  id: string
  nameFr: string
  emoji: string
  camp: Camp
  wake: Wake
  nightOrder: number | null
  count: { min: number; max: number }
  descAr: string
  mechAr: string
  sayAr: string
  official?: boolean
  requiresRole?: string
  uses?: number
  setupParam?: { id: string; labelAr: string; default: number; min: number; max: number }
  [k: string]: any
}

export interface Player {
  id: string
  name: string
  seat: number
  roleId: string
  /** rôle d'origine — utile quand le Voleur / l'Enfant Sauvage changent */
  originRoleId: string
  alive: boolean
  camp: Camp
  lover: boolean
  doused: boolean          // 💧 aspergé par le Pyromane
  muted: boolean           // 🤐 bâillonné par le Loup Noir (jour suivant)
  bites: number            // morsures encaissées (Ancien Sage)
  infected: boolean        // transformé par le Père Infecte
  lostVote: boolean        // قانون الحسّ : a parlé la nuit → perd sa voix
  deviceId: string | null  // mode host/join
  deathNight: number | null
  deathCause: string | null
}

export interface Memory {
  sheepStart: number
  sheepAlive: number
  sheepWet: number
  salvateurLast: string | null
  loupRougeLast: string | null
  corbeauTarget: string | null
  sorciereHeal: boolean
  sorciereKill: boolean
  barbierUsed: boolean
  infectUsed: boolean
  renardLost: boolean
  voleurDone: boolean
  villagePowersLost: boolean   // Ancien Sage lynché
  wolfDied: boolean            // désactive le Grand Méchant Loup
  enfantModel: string | null
  alienAttempts: number
  speechDirection: 'cw' | 'ccw'
  centerCards: string[]        // les 2 cartes du Voleur
}

export type StepKind =
  | 'info' | 'pick' | 'choice' | 'sorciere' | 'pyromane' | 'berger' | 'voleur' | 'alien'

export interface StepOption { id: string; labelAr: string; emoji?: string }

export interface Step {
  key: string
  roleId: string | null
  titleFr: string
  emoji: string
  sayAr: string
  kind: StepKind
  min?: number
  max?: number
  candidates?: string[]
  options?: StepOption[]
  hintAr?: string
  /** le narrateur doit transmettre cette info au joueur (ou elle part sur son téléphone) */
  secret?: boolean
}

export interface Death { playerId: string; cause: string; emoji: string }

export interface Morning {
  night: number
  deaths: Death[]
  bergerReport: { dead: number; wet: number; safe: number } | null
  oursGrowl: boolean
  muted: string | null
  rumour: { textAr: string; trueOne: boolean } | null   // قانون النميمة
  notes: string[]
}

export interface LogEntry { night: number; phase: Phase; textAr: string; emoji?: string }

export interface GameState {
  phase: Phase
  night: number           // 1 = première nuit
  day: number
  players: Player[]
  rolesInPlay: string[]
  memory: Memory
  queue: string[]         // clés des étapes de la nuit
  stepIdx: number
  picks: Record<string, any>
  lastReveal: { titleAr: string; bodyAr: string; tone: 'good' | 'bad' | 'neutral' } | null
  morning: Morning | null
  votes: Record<string, number>
  winner: { camp: string; labelAr: string; playerIds: string[] } | null
  log: LogEntry[]
  /** assisted = guidé pas à pas · simple = distribution + outils */
  mode: 'assisted' | 'simple'
  options: {
    sheepCount: number
    debateSeconds: number
    houseRules: Record<string, boolean>
    useVoleur: boolean
  }
}
