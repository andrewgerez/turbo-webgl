import { NavigationOrientation } from "../values/enums";

export type FocusKeyConfig = {
  [key: string]: NavigationOrientation
}

export type FocusPath = {
  focusKey: string;
  direction: NavigationOrientation
}
