"use client"

import { useEffect, useRef } from "react"

export function BarChartPro() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)

    // Data for the chart
    const data = [80, 65, 90, 75, 100, 60, 85]
    const days = ["Pzt", "Salı", "Çarş", "Perş", "Cuma", "Cmt", "Pzr"]
    const maxValue = Math.max(...data)
    const barWidth = (canvas.offsetWidth / data.length) * 0.6
    const barSpacing = (canvas.offsetWidth / data.length) * 0.4

    // Clear canvas
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = canvas.offsetHeight - 40 - (i * (canvas.offsetHeight - 60)) / 5

      ctx.strokeStyle = "#f1f5f9"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.offsetWidth, y)
      ctx.stroke()

      // Draw y-axis labels
      const value = Math.round((maxValue / 5) * i)
      ctx.fillStyle = "#94a3b8"
      ctx.font = "12px Outfit, sans-serif"
      ctx.textAlign = "left"
      ctx.fillText(value.toString(), 5, y - 5)
    }

    // Draw bars with animation
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.offsetHeight - 80)
      const x = index * (barWidth + barSpacing) + barSpacing / 2
      const y = canvas.offsetHeight - barHeight - 40

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(x, y, x, canvas.offsetHeight - 40)
      gradient.addColorStop(0, "#0ea5e9")
      gradient.addColorStop(1, "#38bdf8")

      // Draw bar with rounded top
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(x, canvas.offsetHeight - 40)
      ctx.lineTo(x, y + 5)
      ctx.arc(x + 5, y + 5, 5, Math.PI, Math.PI * 1.5)
      ctx.lineTo(x + barWidth - 5, y)
      ctx.arc(x + barWidth - 5, y + 5, 5, Math.PI * 1.5, 0)
      ctx.lineTo(x + barWidth, canvas.offsetHeight - 40)
      ctx.closePath()
      ctx.fill()

      // Add shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"
      ctx.shadowBlur = 4
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 2

      // Draw day label
      ctx.shadowColor = "transparent"
      ctx.fillStyle = "#64748b"
      ctx.font = "bold 12px Outfit, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(days[index], x + barWidth / 2, canvas.offsetHeight - 20)

      // Draw value on top of bar
      ctx.fillStyle = "#0f172a"
      ctx.font = "bold 12px Outfit, sans-serif"
      ctx.fillText(value.toString(), x + barWidth / 2, y - 8)
    })
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>
}
