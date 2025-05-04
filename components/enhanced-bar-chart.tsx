"use client"

import { useEffect, useRef, useState } from "react"

interface BarData {
  day: string
  value: number
  minutes: number
  seconds: number
}

export function EnhancedBarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tooltip, setTooltip] = useState<{
    visible: boolean
    x: number
    y: number
    data: BarData | null
  }>({
    visible: false,
    x: 0,
    y: 0,
    data: null,
  })

  // Sample data with detailed time information
  const chartData: BarData[] = [
    { day: "Pzt", value: 80, minutes: 1, seconds: 48 },
    { day: "Salı", value: 65, minutes: 1, seconds: 32 },
    { day: "Çarş", value: 90, minutes: 2, seconds: 5 },
    { day: "Perş", value: 75, minutes: 1, seconds: 45 },
    { day: "Cuma", value: 100, minutes: 2, seconds: 15 },
    { day: "Cmt", value: 60, minutes: 1, seconds: 25 },
    { day: "Pzr", value: 85, minutes: 1, seconds: 55 },
  ]

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
    const data = chartData.map((item) => item.value)
    const days = chartData.map((item) => item.day)
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

    // Add event listeners for tooltip
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Check if mouse is over a bar
      let hoveredBar: BarData | null = null
      for (let i = 0; i < chartData.length; i++) {
        const barX = i * (barWidth + barSpacing) + barSpacing / 2
        const barHeight = (chartData[i].value / maxValue) * (canvas.offsetHeight - 80)
        const barY = canvas.offsetHeight - barHeight - 40

        if (x >= barX && x <= barX + barWidth && y >= barY && y <= canvas.offsetHeight - 40) {
          hoveredBar = chartData[i]
          setTooltip({
            visible: true,
            x: barX + barWidth / 2,
            y: barY - 10,
            data: hoveredBar,
          })
          break
        }
      }

      if (!hoveredBar) {
        setTooltip((prev) => ({ ...prev, visible: false }))
      }
    }

    const handleMouseLeave = () => {
      setTooltip((prev) => ({ ...prev, visible: false }))
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [chartData])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full"></canvas>

      {tooltip.visible && tooltip.data && (
        <div
          className="absolute pointer-events-none bg-white p-2 rounded-md shadow-lg border border-gray-200 z-10 transform -translate-x-1/2"
          style={{
            left: tooltip.x,
            top: tooltip.y - 60,
          }}
        >
          <div className="text-xs font-medium">{tooltip.data.day}</div>
          <div className="text-sm font-bold">
            {tooltip.data.minutes}:{tooltip.data.seconds.toString().padStart(2, "0")} dk
          </div>
          <div className="text-xs text-muted-foreground">Puan: {tooltip.data.value}</div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
        </div>
      )}
    </div>
  )
}
