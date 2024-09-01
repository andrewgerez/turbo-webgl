import { ComponentType, useContext } from 'react'
import { FocusContext, FocusContextMapper } from './focus-context'

export type ExtraComponentProps = {
  focused: boolean | void
  setFocus: (key: string) => void
  data: any
  idx: number
  carouselPosition: number
}

type RenderFocusedComponentProps = {
  CustomComponent: ComponentType<any>
  focusKey: string
  data: any
  idx: number
  carouselPosition: number
}

const RenderFocusedComponent: React.FC<RenderFocusedComponentProps> = ({
  CustomComponent,
  focusKey,
  data,
  idx,
  carouselPosition,
}) => {
  const { currentFocusPath, setFocus } = useContext(FocusContext)

  const contextValue = {
    currentFocusPath: focusKey,
    setFocus: setFocus,
  }

  const renderWithFocusPath = () => {
    FocusContextMapper.push(focusKey)

    return (
      <FocusContext.Provider value={contextValue}>
        <CustomComponent
          focused={currentFocusPath === focusKey}
          setFocus={setFocus}
          data={data}
          idx={idx}
          carouselPosition={carouselPosition}
        />
      </FocusContext.Provider>
    )
  }

  return (
    <FocusContext.Consumer>
      {renderWithFocusPath}
    </FocusContext.Consumer>
  )
}

export default RenderFocusedComponent
