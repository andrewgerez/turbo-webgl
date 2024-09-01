import { NavigationDirection, NavigationDirectionEvent, NavigationResponsibility } from "../values/enums";

/**
 * Function to get the responsibility based on the navigation direction.
 * @param direction - The direction of navigation.
 * @returns The responsibility associated with the direction.
 */
export function getDirectionResponsibility(direction: NavigationDirection): NavigationResponsibility {
  switch (direction) {
    case NavigationDirection.DOWN:
    case NavigationDirection.RIGHT:
      return NavigationResponsibility.ADD;
    case NavigationDirection.UP:
    case NavigationDirection.LEFT:
      return NavigationResponsibility.SUBTRACT;
    default:
      return NavigationResponsibility.ADD;
  }
}

/**
 * Function to get the navigation direction based on the keyboard event.
 * @param directionEvent - The keyboard event for navigation.
 * @returns The corresponding navigation direction.
 */
export function getEventBasedDirection(directionEvent: NavigationDirectionEvent): NavigationDirection {
  const directionMap: Record<NavigationDirectionEvent, NavigationDirection> = {
    [NavigationDirectionEvent.LEFT]: NavigationDirection.LEFT,
    [NavigationDirectionEvent.RIGHT]: NavigationDirection.RIGHT,
    [NavigationDirectionEvent.UP]: NavigationDirection.UP,
    [NavigationDirectionEvent.DOWN]: NavigationDirection.DOWN,
  };

  const direction = directionMap[directionEvent];
  if (!direction) {
    throw new Error(`Unknown direction event: ${directionEvent}`);
  }

  return direction;
}
