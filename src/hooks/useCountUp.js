import { useEffect, useState, useRef } from 'react'

export function useCountUp(target, { duration = 1500, enabled = true } = {}) {
  const [value, setValue] = useState(enabled ? 0 : target)
  const raf = useRef(null)
  const startTime = useRef(null)

  useEffect(() => {
    if (!enabled) {
      setValue(target)
      return
    }

    startTime.current = null
    const from = 0

    function animate(now) {
      if (!startTime.current) startTime.current = now
      const elapsed = now - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(from + (target - from) * eased))
      if (progress < 1) {
        raf.current = requestAnimationFrame(animate)
      }
    }

    raf.current = requestAnimationFrame(animate)
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [target, duration, enabled])

  return value
}
