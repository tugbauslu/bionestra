"use client"

import { useEffect, useRef, useState } from "react"

interface BarData {
  day: string
  value: number
  minutes: number
  seconds: number
}

export function MinimalBarChart() {
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
    const barWidth = (canvas.offsetWidth / data.length) * 0.7
    const barSpacing = (canvas.offsetWidth / data.length) * 0.3

    // Clear canvas
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    // Draw bars with minimal styling
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (canvas.offsetHeight - 40)
      const x = index * (barWidth + barSpacing) + barSpacing / 2
      const y = canvas.offsetHeight - barHeight - 20

      // Create gradient for bar
      const gradient = ctx.createLinearGradient(x, y, x, canvas.offsetHeight - 20)
      gradient.addColorStop(0, "#0ea5e9")
      gradient.addColorStop(1, "#38bdf8")

      // Draw bar with rounded top
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
      ctx.fill()

      // Draw day label
      ctx.fillStyle = "#64748b"
      ctx.font = "12px Outfit, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(days[index], x + barWidth / 2, canvas.offsetHeight - 5)
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
        const barHeight = (chartData[i].value / maxValue) * (canvas.offsetHeight - 40)
        const barY = canvas.offsetHeight - barHeight - 20

        if (x >= barX && x <= barX + barWidth && y >= barY && y <= canvas.offsetHeight - 20) {
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
          className="absolute pointer-events-none bg-white p-2 rounded-md shadow-md border border-gray-100 z-10 transform -translate-x-1/2"
          style={{
            left: tooltip.x,
            top: tooltip.y - 40,
          }}
        >
          <div className="text-xs font-medium">
            {tooltip.data.minutes}:{tooltip.data.seconds.toString().padStart(2, "0")} dk
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-100"></div>
        </div>
      )}
    </div>
  )
}
