"use client"

import { useEffect, useRef } from "react"

export function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Data for the chart
    const data = [80, 65, 90, 75, 100, 60, 85]
    const days = ["Pzt", "Salı", "Çarş", "Perş", "Cuma", "Cmt", "Pzr"]
    const maxValue = Math.max(...data)
    const barWidth = canvas.width / data.length - 10
    const barSpacing = 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw bars
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.height - 60)
      const x = index * (barWidth + barSpacing) + barSpacing
      const y = canvas.height - barHeight - 30

      // Draw bar
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw day label
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(days[index], x + barWidth / 2, canvas.height - 10)

      // Draw value
      ctx.fillText(value.toString(), x + barWidth / 2, y - 5)
    })

    // Draw y-axis labels
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((maxValue / 5) * i)
      const y = canvas.height - (value / maxValue) * (canvas.height - 60) - 30

      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      ctx.fillText(value.toString(), 5, y)

      // Draw horizontal grid line
      ctx.strokeStyle = "#e5e7eb"
      ctx.beginPath()
      ctx.moveTo(30, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}
