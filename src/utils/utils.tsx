export function getActiveNavLinkStyles({ isActive }: { isActive: boolean }) {
  return isActive ? { color: 'var(--color-accent)' } : {}
}