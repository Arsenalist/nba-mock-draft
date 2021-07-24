export interface Player {
  id: number,
  defaultOrder: number,
  name: string,
  height: string,
  weight?: string,
  position: string,
  school: string,
  year: string
}

export interface Entry {
  hash: string
  players: Player[]
}

export interface TeamLogos {
  w72xh72: string
}

export interface Team {
  id: number,
  name: string,
  logos: TeamLogos
}
