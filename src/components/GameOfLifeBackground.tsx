import { useEffect, useRef } from 'react'

const STEP_MS = 90
const DESKTOP_CELL_SIZE = 9
const MOBILE_CELL_SIZE = 7
const INITIAL_DENSITY = 0.11

export function GameOfLifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const gridRef = useRef<Uint8Array>(new Uint8Array())
  const nextGridRef = useRef<Uint8Array>(new Uint8Array())
  const rowsRef = useRef(0)
  const colsRef = useRef(0)
  const cellSizeRef = useRef(DESKTOP_CELL_SIZE)
  const frameRef = useRef(0)
  const lastStepRef = useRef(0)
  const lastSeedRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) {
      return
    }

    contextRef.current = context

    const initializeGrid = (width: number, height: number) => {
      const cellSize = width < 768 ? MOBILE_CELL_SIZE : DESKTOP_CELL_SIZE
      const cols = Math.max(28, Math.floor(width / cellSize))
      const rows = Math.max(24, Math.floor(height / cellSize))
      const total = cols * rows

      cellSizeRef.current = cellSize
      colsRef.current = cols
      rowsRef.current = rows
      gridRef.current = new Uint8Array(total)
      nextGridRef.current = new Uint8Array(total)

      for (let index = 0; index < total; index += 1) {
        gridRef.current[index] = Math.random() < INITIAL_DENSITY ? 1 : 0
      }
    }

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = window.innerWidth
      const height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.imageSmoothingEnabled = false

      initializeGrid(width, height)
    }

    const seedAtPointer = (clientX: number, clientY: number, radius: number) => {
      const grid = gridRef.current
      const cols = colsRef.current
      const rows = rowsRef.current
      const cellSize = cellSizeRef.current

      if (cols === 0 || rows === 0) {
        return
      }

      const centerX = Math.floor(clientX / cellSize)
      const centerY = Math.floor(clientY / cellSize)

      for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
        for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
          if (Math.random() < 0.35) {
            continue
          }

          const x = centerX + offsetX
          const y = centerY + offsetY

          if (x < 0 || x >= cols || y < 0 || y >= rows) {
            continue
          }

          grid[y * cols + x] = 1
        }
      }
    }

    const step = () => {
      const cols = colsRef.current
      const rows = rowsRef.current
      const total = cols * rows
      const current = gridRef.current
      const next = nextGridRef.current
      let aliveCount = 0

      if (total === 0) {
        return
      }

      for (let y = 0; y < rows; y += 1) {
        const up = y === 0 ? rows - 1 : y - 1
        const down = y === rows - 1 ? 0 : y + 1

        for (let x = 0; x < cols; x += 1) {
          const left = x === 0 ? cols - 1 : x - 1
          const right = x === cols - 1 ? 0 : x + 1

          const index = y * cols + x
          const neighbors =
            current[up * cols + left] +
            current[up * cols + x] +
            current[up * cols + right] +
            current[y * cols + left] +
            current[y * cols + right] +
            current[down * cols + left] +
            current[down * cols + x] +
            current[down * cols + right]

          const isAlive = current[index] === 1
          const survives = neighbors === 3 || (isAlive && neighbors === 2)
          next[index] = survives ? 1 : 0
          aliveCount += next[index]
        }
      }

      if (aliveCount < total * 0.018) {
        for (let index = 0; index < total; index += 1) {
          if (Math.random() < 0.03) {
            next[index] = 1
          }
        }
      }

      gridRef.current = next
      nextGridRef.current = current
    }

    const draw = () => {
      const context = contextRef.current
      const cols = colsRef.current
      const rows = rowsRef.current
      const cellSize = cellSizeRef.current
      const grid = gridRef.current

      if (!context || cols === 0 || rows === 0) {
        return
      }

      const width = cols * cellSize
      const height = rows * cellSize

      context.clearRect(0, 0, width, height)
      context.fillStyle = 'rgba(3, 8, 12, 0.34)'
      context.fillRect(0, 0, width, height)
      context.fillStyle = 'rgba(123, 145, 162, 0.28)'

      for (let y = 0; y < rows; y += 1) {
        const rowStart = y * cols

        for (let x = 0; x < cols; x += 1) {
          if (grid[rowStart + x] === 0) {
            continue
          }

          context.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 1, cellSize - 1)
        }
      }
    }

    const loop = (time: number) => {
      if (!lastStepRef.current) {
        lastStepRef.current = time
      }

      if (time - lastStepRef.current >= STEP_MS) {
        step()
        draw()
        lastStepRef.current = time
      }

      frameRef.current = requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') {
        return
      }

      const now = performance.now()
      if (now - lastSeedRef.current < 24) {
        return
      }

      lastSeedRef.current = now
      seedAtPointer(event.clientX, event.clientY, 2)
    }

    const onPointerDown = (event: PointerEvent) => {
      seedAtPointer(event.clientX, event.clientY, 3)
      draw()
    }

    resizeCanvas()
    draw()
    frameRef.current = requestAnimationFrame(loop)

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
