import { useState, useEffect, useMemo } from 'react'
import { FocusContext, FocusContextMapper, getComponentDisplayName } from './focus-context'
import { FocusPath } from './types'
import { NavigationDirectionEvent, NavigationResponsibility } from '../values/enums'
import { getDirectionResponsibility, getEventBasedDirection } from './navigation-helper'

type RequiredProps = {}

function renderParentWithNavigationPath<Props extends RequiredProps, InjectedProps>(
  WrappedComponent: React.ComponentType<Props>
): React.ComponentType<Props & InjectedProps> {
  const WithNavigation: React.FC<Props & InjectedProps> = (props) => {
    const [currentFocusPath, setCurrentFocusPath] = useState<FocusPath | undefined>(undefined);

    const getNextFocusPath = (prevFocusPath: FocusPath | undefined, e: KeyboardEvent) => {
      const currentIndex = FocusContextMapper.findIndex((item) => item.focusKey === prevFocusPath?.focusKey);
      let nextIndex = currentIndex;

      const currentDirection = getEventBasedDirection(e.key as NavigationDirectionEvent);

      if (!currentDirection) return prevFocusPath

      const directionResponsibility = getDirectionResponsibility(currentDirection);

      if (directionResponsibility === NavigationResponsibility.SUBTRACT) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : FocusContextMapper.length - 1;
      } else if (directionResponsibility === NavigationResponsibility.ADD) {
        nextIndex = currentIndex < FocusContextMapper.length - 1 ? currentIndex + 1 : 0;
      }

      const nextFocusPath = FocusContextMapper[nextIndex] || FocusContextMapper[0];

      return nextFocusPath;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setCurrentFocusPath((prevFocusPath) => getNextFocusPath(prevFocusPath, e));
    };

    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);


    const memoizedReturn = useMemo(() => ({
      currentFocusPath,
      setFocus: setCurrentFocusPath
    }), [currentFocusPath])


    return (
      <FocusContext.Provider
        value={memoizedReturn}
      >
        <WrappedComponent {...props} />
      </FocusContext.Provider>
    )
  }

  WithNavigation.displayName = `ParentWithNavigationPath(${getComponentDisplayName(WrappedComponent)})`

  return WithNavigation
}

export default renderParentWithNavigationPath
