import { ComponentType, createContext } from 'react'
import { FocusPath } from './types';

export const FocusContextMapper: FocusPath[] = [];

export const FocusContext = createContext({});

export function getComponentDisplayName<T>(Comp: ComponentType<T>): string {
  return Comp.displayName ?? (Comp.name || 'Component');
}

