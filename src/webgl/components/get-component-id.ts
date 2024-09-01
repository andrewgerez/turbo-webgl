export function getComponentId<T>(component: React.ComponentType<T>): string {
  return component.displayName ?? (component.name || 'Component')
}
