export interface AuthUser {
  loginId: string
  ownerName: string
}

export interface AuthContextValue {
  isAuthenticated: boolean
  user: AuthUser | null
  login: (loginId: string, pin: string) => boolean
  logout: () => void
}
