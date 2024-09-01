import { useContext, useEffect } from 'react'
import { FocusContext, FocusContextMapper, getComponentDisplayName } from './focus-context'
import { FocusPath } from './types'

type RequiredProps = FocusPath

function renderFocusedElement<Props extends RequiredProps, InjectedProps>(
  WrappedComponent: React.ComponentType<Props>
): React.FC<Props & InjectedProps> {
  const FocusedElement: React.FC<Props & InjectedProps> = (props) => {
    const focusContext = useContext(FocusContext)
    const { currentFocusPath, setFocus } = focusContext as { currentFocusPath: FocusPath, setFocus: Function }
    const focusPath = props

    const getCurrentIndex = () => {
      return FocusContextMapper.findIndex((path) => path.focusKey === focusPath.focusKey)
    }

    useEffect(() => {
      if (!FocusContextMapper.some((path) => path.focusKey === focusPath.focusKey)) {
        FocusContextMapper.push(focusPath)
      }

      return () => {
        const index = getCurrentIndex()
        if (index !== -1) {
          FocusContextMapper.splice(index, 1)
        }
      }
    }, [focusPath])

    return (
      <FocusContext.Provider value={focusPath}>
        <WrappedComponent
          {...props}
          focused={currentFocusPath?.focusKey === focusPath.focusKey}
          setFocus={setFocus.bind(null, focusPath)}
        />
      </FocusContext.Provider>
    )
  }

  FocusedElement.displayName = `FocusedElement(${getComponentDisplayName(WrappedComponent)})`

  return FocusedElement
}

export default renderFocusedElement
