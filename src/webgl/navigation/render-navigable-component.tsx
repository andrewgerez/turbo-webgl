import { ComponentType, useEffect, useMemo, useState } from 'react'
import { FocusContext, FocusContextMapper } from './focus-context'

const RenderNavigableComponent = (CustomComponent: ComponentType): JSX.Element => {
  const [currentFocusKey, setCurrentFocusKey] = useState("card_0")

  const contextValue = useMemo(() => ({
    currentFocusPath: currentFocusKey,
    setFocus: (key: string) => setCurrentFocusKey(key),
  }), [currentFocusKey])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      const idx = FocusContextMapper.indexOf(currentFocusKey)
      const next = idx - 1
      if (next >= 0) {
        const nextFocusKey = FocusContextMapper[next]
        console.log('nextFocusKey', nextFocusKey)
        setCurrentFocusKey(nextFocusKey)
      }
    } else if (e.key === 'ArrowRight') {
      const idx = FocusContextMapper.indexOf(currentFocusKey)
      const next = idx + 1
      if (next < FocusContextMapper.length) {
        const nextFocusKey = FocusContextMapper[next]
        console.log('nextFocusKey', nextFocusKey)
        setCurrentFocusKey(nextFocusKey)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', (e) => handleKeyDown(e))

    return () => {
      window.removeEventListener('keydown', (e) => handleKeyDown(e))
    }
  }, [])

  return (
    <FocusContext.Provider value={contextValue}>
      <CustomComponent />
    </FocusContext.Provider>
  )
}

export default RenderNavigableComponent
