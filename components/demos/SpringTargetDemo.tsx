'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const CIRCLE = 40
const PADDING = CIRCLE

export function SpringTargetDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const move = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const maxX = width / 2 - PADDING
    const maxY = height / 2 - PADDING
    setOffset({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
    })
  }, [])

  return (
    <div
      ref={containerRef}
      onClick={move}
      className="w-full h-full bg-white rounded-lg flex items-center justify-center cursor-crosshair select-none"
    >
      <motion.div
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        onClick={(e) => { e.stopPropagation(); move() }}
        className="rounded-full bg-black cursor-pointer"
        style={{ width: CIRCLE, height: CIRCLE }}
      />
    </div>
  )
}
