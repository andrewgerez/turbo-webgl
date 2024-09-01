import { createContext } from 'react'

export const FocusContextMapper: string[] = []

export const FocusContext = createContext({
  currentFocusPath: '',
  setFocus: (key: string) => { },
})
