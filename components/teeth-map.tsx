"use client"

import { useEffect, useRef } from "react"

export function TeethMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = 200

    // Draw teeth outline
    const drawTooth = (
      x: number,
      y: number,
      width: number,
      height: number,
      status: "healthy" | "cavity" | "partial",
    ) => {
      // Draw tooth outline
      ctx.beginPath()
      ctx.roundRect(x, y, width, height, 5)
      ctx.strokeStyle = "#000000"
      ctx.lineWidth = 1
      ctx.stroke()

      // Fill based on status
      if (status === "healthy") {
        ctx.fillStyle = "#ffffff"
      } else if (status === "cavity") {
        ctx.fillStyle = "#ef4444" // red
      } else if (status === "partial") {
        ctx.fillStyle = "#eab308" // yellow
      }

      ctx.fill()
    }

    // Upper teeth
    const upperTeeth = ["healthy", "healthy", "cavity", "healthy", "healthy", "partial", "healthy", "healthy"]

    // Lower teeth
    const lowerTeeth = ["healthy", "partial", "healthy", "healthy", "cavity", "healthy", "healthy", "healthy"]

    const toothWidth = 30
    const toothHeight = 40
    const spacing = 5
    const startX = (canvas.width - (upperTeeth.length * (toothWidth + spacing) - spacing)) / 2

    // Draw upper teeth
    upperTeeth.forEach((status, index) => {
      const x = startX + index * (toothWidth + spacing)
      drawTooth(x, 20, toothWidth, toothHeight, status as "healthy" | "cavity" | "partial")
    })

    // Draw lower teeth
    lowerTeeth.forEach((status, index) => {
      const x = startX + index * (toothWidth + spacing)
      drawTooth(x, 100, toothWidth, toothHeight, status as "healthy" | "cavity" | "partial")
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full"></canvas>
}
