'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  // resolvedTheme is undefined on server; use 'dark' as default to match defaultTheme
  const theme = resolvedTheme ?? 'dark'

  return (
    <Button
      suppressHydrationWarning
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-[var(--sand-9)] hover:text-[var(--sand-12)] transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  )
}