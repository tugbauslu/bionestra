"use client"

import { useEffect, useRef } from "react"

export function TeethMapPro() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = 240 * dpr
    ctx.scale(dpr, dpr)

    // Draw teeth outline with modern styling
    const drawTooth = (
      x: number,
      y: number,
      width: number,
      height: number,
      status: "healthy" | "cavity" | "partial",
    ) => {
      // Shadow for depth
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2

      // Fill based on status
      if (status === "healthy") {
        ctx.fillStyle = "#ffffff"
      } else if (status === "cavity") {
        ctx.fillStyle = "#ef4444" // red
      } else if (status === "partial") {
        ctx.fillStyle = "#eab308" // yellow
      }

      // Draw tooth with rounded corners
      ctx.beginPath()
      ctx.roundRect(x, y, width, height, 8)
      ctx.fill()

      // Draw tooth outline
      ctx.shadowColor = "transparent"
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 2
      ctx.stroke()

      // Add highlight for 3D effect
      ctx.beginPath()
      ctx.roundRect(x + 3, y + 3, width - 6, height / 3, 5)
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)"
      ctx.fill()
    }

    // Draw mouth outline
    ctx.beginPath()
    ctx.ellipse(canvas.offsetWidth / 2, 120, canvas.offsetWidth / 2.5, 100, 0, 0, Math.PI * 2)
    ctx.strokeStyle = "#cbd5e1"
    ctx.lineWidth = 2
    ctx.stroke()

    // Upper teeth
    const upperTeeth = ["healthy", "healthy", "cavity", "healthy", "healthy", "partial", "healthy", "healthy"]

    // Lower teeth
    const lowerTeeth = ["healthy", "partial", "healthy", "healthy", "cavity", "healthy", "healthy", "healthy"]

    const toothWidth = 32
    const toothHeight = 45
    const spacing = 6
    const startX = (canvas.offsetWidth - (upperTeeth.length * (toothWidth + spacing) - spacing)) / 2

    // Draw upper teeth
    upperTeeth.forEach((status, index) => {
      const x = startX + index * (toothWidth + spacing)
      drawTooth(x, 40, toothWidth, toothHeight, status as "healthy" | "cavity" | "partial")
    })

    // Draw lower teeth
    lowerTeeth.forEach((status, index) => {
      const x = startX + index * (toothWidth + spacing)
      drawTooth(x, 155, toothWidth, toothHeight, status as "healthy" | "cavity" | "partial")
    })

    // Add tooth numbers
    ctx.font = "10px Outfit, sans-serif"
    ctx.fillStyle = "#64748b"
    ctx.textAlign = "center"

    upperTeeth.forEach((_, index) => {
      const x = startX + index * (toothWidth + spacing) + toothWidth / 2
      ctx.fillText(`${8 - index}`, x, 30)
    })

    lowerTeeth.forEach((_, index) => {
      const x = startX + index * (toothWidth + spacing) + toothWidth / 2
      ctx.fillText(`${index + 9}`, x, 215)
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full"></canvas>
}
