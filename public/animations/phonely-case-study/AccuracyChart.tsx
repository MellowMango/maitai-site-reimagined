import * as React from "react"
import { useEffect, useRef, useCallback } from "react"
import { addPropertyControls, ControlType } from "framer"

/* ---------- 1.  INLINE CSS ---------------------------------------------- */
const css = `
/* Accuracy Chart Component Styles */
:root {
  --primary-color: #21B892;
  --secondary-color: #F5F5F5;
  --text-color: #212121;
  --subtext-color: #666666;
  --maitai-gradient: linear-gradient(to right, #21B892, #00B3F5);
  --section-spacing: 72px;
  --shadow-color: rgba(0, 0, 0, 0.05);
  --font-family: 'Greycliff CF', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.accuracy-chart-component {
  padding: 40px 0;
  background-color: #ffffff;
  font-family: var(--font-family);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%; /* Ensure component tries to fill width */
  height: 100%; /* Ensure component tries to fill height */
  box-sizing: border-box; /* Include padding in dimensions */
}

.accuracy-chart-component .section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: var(--text-color);
  position: relative;
  width: 100%;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.accuracy-chart-component .section-title::after {
  content: '';
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--maitai-gradient);
  border-radius: 2px;
}

.accuracy-chart-component .chart-container {
  flex-grow: 1; /* Allow container to grow */
  width: 100%; /* Ensure container takes full width */
  max-width: 800px;
  margin: 0 auto;
  padding: 0 10px;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  position: relative;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.accuracy-chart-component .accuracy-chart {
  width: 100%;
  height: 100%; /* Let chart fill the container */
  background-color: transparent;
  border-radius: 0;
  margin: 0;
  position: relative;
  padding-bottom: 0px;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

.accuracy-chart-component .chart-tooltip {
  position: absolute;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.85);
  color: white;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 1000;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
  min-width: 180px;
  white-space: nowrap;
}

.accuracy-chart-component .chart-note {
  font-size: 18px;
  color: var(--subtext-color);
  text-align: center;
  margin-top: 5px;
  font-weight: 500;
  line-height: 1.5;
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 15px;
}

/* Stats Section Container - match HTML version styling */
.stats-section-container {
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px 0 0;
  padding: 40px 0 20px;
}

/* Special styling for accuracy headline section */
.accuracy-headline-section {
  margin-bottom: 0;
  padding-bottom: 0;
}

.stats-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.stat-block {
  margin-bottom: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.stat-value {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0;
  color: var(--text-color);
  position: relative;
  display: inline-block;
}

.plus {
  font-weight: 500;
}

.stat-description {
  font-size: 22px;
  color: var(--subtext-color);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
  padding-bottom: 5px;
  margin-top: 0;
}

.stat-description::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: linear-gradient(to right, rgba(33, 184, 146, 0.2), rgba(0, 179, 245, 0.2));
  border-radius: 1px;
}

/* Responsive Styles - Nest rules inside media queries */
@media (max-width: 992px) {
  .accuracy-chart-component .section-title {
    font-size: 28px;
  }

  /* Height is now controlled by prop, no need to override here */
  /* .accuracy-chart-component .accuracy-chart {
    height: 500px;
  } */

  .accuracy-chart-component .stat-value {
    font-size: 52px;
  }

  .accuracy-chart-component .stat-description {
    font-size: 18px;
  }

  .accuracy-chart-component .chart-note {
    font-size: 17px;
    margin-top: 3px;
  }
}

@media (max-width: 768px) {
  .accuracy-chart-component .section-title {
    font-size: 24px;
  }

  /* Height is now controlled by prop, no need to override here */
  /* .accuracy-chart-component .accuracy-chart {
    height: 420px;
  } */

  .accuracy-chart-component .chart-note {
    font-size: 15px;
    max-width: 90%;
    margin-top: 2px;
  }

  .accuracy-chart-component .stat-value {
    font-size: 48px;
  }
}

@media (max-width: 576px) {
  .accuracy-chart-component {
    padding: 30px 0 20px;
  }

  .accuracy-chart-component .section-title {
    font-size: 22px;
    margin-bottom: 25px;
    max-width: 95%;
  }

  .accuracy-chart-component .section-title::after {
    bottom: -10px;
  }

  /* Height is now controlled by prop, no need to override here */
  /* .accuracy-chart-component .accuracy-chart {
    height: 380px;
    width: 100%;
  } */

  .accuracy-chart-component .chart-container {
    width: 100%;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    box-sizing: border-box; /* Ensure padding is included */
  }

  .accuracy-chart-component .chart-note {
    font-size: 14px;
    margin-top: 0;
  }

  .accuracy-chart-component .stats-section-container {
      margin: 40px 0 0;
      padding-bottom: 15px;
  }

  .accuracy-chart-component .stat-value {
    font-size: 44px;
  }

  .accuracy-chart-component .stat-description {
    font-size: 16px;
  }
}
`

/* ---------- 2.  COMPONENT ------------------------------------------------- */
// Define interface for props for type safety
interface Props {
    className?: string
    height?: number
    width?: number | string // Allow string for "100%"
}

export default function AccuracyChart({
    className = "",
    height: propHeight = 550,
}: Props) {
    const chartRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement | null>(null)

    const createAccuracyChart = useCallback(() => {
        const chartContainer = chartRef.current
        if (!chartContainer) return

        // Clear any existing content
        chartContainer.innerHTML = ""

        // Use the actual offsetWidth of the container for calculations
        const chartWidth = chartContainer.offsetWidth
        const isMobile = chartWidth < 768
        const isSmallMobile = chartWidth < 576

        // Determine dynamic height based on width
        let dynamicHeight = propHeight // Start with the prop value
        if (isSmallMobile) {
            // width < 576
            dynamicHeight = 380
        } else if (isMobile) {
            // width < 768
            dynamicHeight = 420
        } else if (chartWidth < 992) {
            // Tablet
            dynamicHeight = 480
        }

        // Set the container's height dynamically *before* calculations
        chartContainer.style.height = `${dynamicHeight}px`

        // Use the dynamically calculated height for SVG rendering
        let chartHeight = dynamicHeight

        let margin = { top: 60, right: 80, bottom: 80, left: 80 }

        // Adjust margins based on width
        if (isMobile) {
            margin = { top: 60, right: 40, bottom: 90, left: 80 }
        }
        if (isSmallMobile) {
            margin = { top: 50, right: 30, bottom: 100, left: 85 }
        }

        const width = chartWidth - margin.left - margin.right
        const height = chartHeight - margin.top - margin.bottom

        if (width <= 0 || height <= 0) return

        const data = [
            {
                label: "GPT-4o",
                value: 94.7,
                color: "#888888",
                description: "Legacy",
                ttft: 661,
                completionTime: 1446,
            },
            {
                label: "Maitai m0",
                value: 81.5,
                color: "#AAECDC",
                description: "Initial Switch",
                ttft: 186,
                completionTime: 316,
            },
            {
                label: "Maitai m1",
                value: 91.8,
                color: "#62DAB8",
                description: "1st Iteration",
                ttft: 189,
                completionTime: 378,
            },
            {
                label: "Maitai m2",
                value: 95.2,
                color: "#40CEA8",
                description: "2nd Iteration",
                ttft: 176,
                completionTime: 342,
            },
            {
                label: "Maitai m3",
                value: 99.2,
                color: "#21B892",
                description: "3rd Iteration",
                ttft: 179,
                completionTime: 339,
            },
        ]

        chartContainer.innerHTML = ""

        const svgWrapper = document.createElement("div")
        svgWrapper.style.width = "100%"
        svgWrapper.style.height = "100%" // Allow wrapper to take height
        svgWrapper.style.display = "flex"
        svgWrapper.style.justifyContent = "center"
        svgWrapper.style.alignItems = "center"
        chartContainer.appendChild(svgWrapper)

        const svg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
        )
        svg.setAttribute("width", chartWidth.toString())
        svg.setAttribute("height", chartHeight.toString())
        svg.setAttribute("viewBox", `0 0 ${chartWidth} ${chartHeight}`)
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet")
        svg.style.maxWidth = "100%"
        svg.style.height = "auto" // Maintain aspect ratio
        svg.style.display = "block"
        svgWrapper.appendChild(svg)

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g")
        const horizontalCenter = margin.left
        g.setAttribute(
            "transform",
            `translate(${horizontalCenter}, ${margin.top})`
        )
        svg.appendChild(g)

        const chartBackground = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        )
        chartBackground.setAttribute("x", "0")
        chartBackground.setAttribute("y", "0")
        chartBackground.setAttribute("width", width.toString())
        chartBackground.setAttribute("height", height.toString())
        chartBackground.setAttribute("fill", "#f8f8f8")
        chartBackground.setAttribute("rx", "6")
        chartBackground.setAttribute("ry", "6")
        g.appendChild(chartBackground)

        const yMin = 70
        const yMax = 100
        const yScale = height / (yMax - yMin)

        const totalItems = data.length
        const barWidth = Math.min(
            isMobile ? 45 : 65,
            (width / totalItems) * 0.7
        )
        const barSpacing = width / totalItems

        const yAxis = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        )
        yAxis.setAttribute("x1", "0")
        yAxis.setAttribute("y1", "0")
        yAxis.setAttribute("x2", "0")
        yAxis.setAttribute("y2", height.toString())
        yAxis.setAttribute("stroke", "#333")
        yAxis.setAttribute("stroke-width", "2")
        g.appendChild(yAxis)

        const xAxis = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        )
        xAxis.setAttribute("x1", "0")
        xAxis.setAttribute("y1", height.toString())
        xAxis.setAttribute("x2", width.toString())
        xAxis.setAttribute("y2", height.toString())
        xAxis.setAttribute("stroke", "#333")
        xAxis.setAttribute("stroke-width", "2")
        g.appendChild(xAxis)

        const yLabel = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        )
        yLabel.setAttribute("x", (-height / 2).toString())
        yLabel.setAttribute("y", (isMobile ? -45 : -60).toString())
        yLabel.setAttribute("text-anchor", "middle")
        yLabel.setAttribute("transform", "rotate(-90)")
        yLabel.setAttribute("font-size", isMobile ? "14px" : "16px")
        yLabel.setAttribute("font-weight", "bold")
        yLabel.setAttribute("fill", "#333")
        yLabel.textContent = "Accuracy (%)"
        g.appendChild(yLabel)

        for (let i = 0; i <= 6; i++) {
            const yValue = yMin + i * 5
            const yPos = height - (yValue - yMin) * yScale
            const tick = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            )
            tick.setAttribute("x1", "-5")
            tick.setAttribute("y1", yPos.toString())
            tick.setAttribute("x2", "0")
            tick.setAttribute("y2", yPos.toString())
            tick.setAttribute("stroke", "#333")
            tick.setAttribute("stroke-width", "1")
            g.appendChild(tick)
            const label = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            )
            label.setAttribute("x", "-10")
            label.setAttribute("y", (yPos + 5).toString())
            label.setAttribute("text-anchor", "end")
            label.setAttribute("font-size", isMobile ? "12px" : "14px")
            label.setAttribute("fill", "#333")
            label.textContent = `${yValue}%`
            g.appendChild(label)
        }

        const headlineGroup = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "g"
        )
        svg.appendChild(headlineGroup)

        const chartTitle = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "text"
        )
        chartTitle.setAttribute("x", (chartWidth / 2).toString())
        chartTitle.setAttribute("y", "20")
        chartTitle.setAttribute("text-anchor", "middle")
        chartTitle.setAttribute("dominant-baseline", "middle")
        chartTitle.setAttribute("font-size", isMobile ? "16px" : "18px")
        chartTitle.setAttribute("font-weight", "bold")
        chartTitle.setAttribute("fill", "#333")
        chartTitle.textContent = "Model Accuracy Over Iterations"
        headlineGroup.appendChild(chartTitle)

        const titleUnderline = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
        )
        const underlineWidth = isMobile ? 90 : 120
        titleUnderline.setAttribute(
            "x1",
            (chartWidth / 2 - underlineWidth).toString()
        )
        titleUnderline.setAttribute("y1", "35")
        titleUnderline.setAttribute(
            "x2",
            (chartWidth / 2 + underlineWidth).toString()
        )
        titleUnderline.setAttribute("y2", "35")
        titleUnderline.setAttribute("stroke", "#21B892")
        titleUnderline.setAttribute("stroke-width", "2")
        titleUnderline.setAttribute("opacity", "0.7")
        headlineGroup.appendChild(titleUnderline)

        const tooltip = document.createElement("div")
        tooltip.className = "chart-tooltip"
        svgWrapper.style.position = "relative"
        svgWrapper.appendChild(tooltip)
        tooltipRef.current = tooltip

        data.forEach((d, i) => {
            const x = i * barSpacing + barSpacing / 2 - barWidth / 2
            const barHeight = (d.value - yMin) * yScale
            const y = height - barHeight
            const barGroup = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "g"
            )
            barGroup.setAttribute("class", "bar-group")
            g.appendChild(barGroup)
            const bar = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "rect"
            )
            bar.setAttribute("x", x.toString())
            bar.setAttribute("y", height.toString())
            bar.setAttribute("width", barWidth.toString())
            bar.setAttribute("height", "0")
            bar.setAttribute("fill", d.color)
            bar.setAttribute("rx", "4")
            bar.setAttribute("ry", "4")
            bar.setAttribute("class", "chart-bar")
            bar.style.cursor = "pointer"
            barGroup.appendChild(bar)
            bar.addEventListener("mouseover", (e) => {
                tooltip.style.opacity = "1"
                let tooltipContent = `<strong>${d.label}</strong><br>
                             Accuracy: ${d.value}%<br>
                             ${d.description}<br>
                             TTFT: ${d.ttft}ms<br>
                             Completion: ${d.completionTime}ms`
                tooltip.innerHTML = tooltipContent
                const svgRect = svgWrapper.getBoundingClientRect()
                const barRect = (e.target as Element).getBoundingClientRect()
                const tooltipX = barRect.left - svgRect.left + barRect.width / 2
                const tooltipY = barRect.top - svgRect.top - 15
                tooltip.style.left = `${tooltipX}px`
                tooltip.style.top = `${tooltipY}px`
                tooltip.style.transform = "translate(-50%, -100%)"
                bar.setAttribute("stroke", "#333")
                bar.setAttribute("stroke-width", "2")
            })
            bar.addEventListener("mouseout", () => {
                tooltip.style.opacity = "0"
                bar.setAttribute("stroke", "none")
            })
            let improvement = 0
            if (i > 0) {
                improvement = d.value - data[i - 1].value
            }
            const modelLabel = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            )
            modelLabel.setAttribute("x", (x + barWidth / 2).toString())
            modelLabel.setAttribute("y", (height + 20).toString())
            modelLabel.setAttribute("text-anchor", "middle")
            modelLabel.setAttribute("font-size", isMobile ? "11px" : "14px")
            modelLabel.setAttribute("fill", "#333")
            modelLabel.textContent = d.label.replace("Maitai ", "")
            if (isMobile) {
                modelLabel.setAttribute("y", (height + 25).toString())
            }
            barGroup.appendChild(modelLabel)
            const valueLabel = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "text"
            )
            valueLabel.setAttribute("x", (x + barWidth / 2).toString())
            valueLabel.setAttribute("y", (y - (isMobile ? 6 : 12)).toString())
            valueLabel.setAttribute("text-anchor", "middle")
            valueLabel.setAttribute("font-size", isMobile ? "11px" : "14px")
            valueLabel.setAttribute("font-weight", "bold")
            valueLabel.setAttribute("fill", "#333")
            valueLabel.textContent = `${d.value}%`
            if (barHeight > (isMobile ? 20 : 30)) {
                barGroup.appendChild(valueLabel)
            }
            if (!isMobile) {
                const descLabel = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "text"
                )
                descLabel.setAttribute("x", (x + barWidth / 2).toString())
                descLabel.setAttribute("y", (height + 38).toString())
                descLabel.setAttribute("text-anchor", "middle")
                descLabel.setAttribute("font-size", "12px")
                descLabel.setAttribute("fill", "#666")
                descLabel.textContent = d.description
                barGroup.appendChild(descLabel)
            }
            setTimeout(() => {
                animateBar(bar, height, y, barHeight)
            }, i * 150)
        })

        const firstBarValue = data[0].value
        if (firstBarValue >= yMin) {
            const firstBarY = height - (firstBarValue - yMin) * yScale
            const legacyLine = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "line"
            )
            legacyLine.setAttribute("x1", "0")
            legacyLine.setAttribute("y1", firstBarY.toString())
            legacyLine.setAttribute("x2", width.toString())
            legacyLine.setAttribute("y2", firstBarY.toString())
            legacyLine.setAttribute("stroke", "#aaa")
            legacyLine.setAttribute("stroke-width", "1")
            legacyLine.setAttribute("stroke-dasharray", "4,4")
            g.appendChild(legacyLine)
        }

        function animateBar(bar, startY, endY, height) {
            let startTime: number | null = null
            const duration = 1000
            function step(timestamp: number) {
                if (!startTime) startTime = timestamp
                const elapsed = timestamp - startTime
                const progress = Math.min(elapsed / duration, 1)
                const easeProgress = 1 - Math.pow(1 - progress, 3)
                const currentHeight = height * easeProgress
                const currentY = startY - currentHeight
                bar.setAttribute("y", currentY.toString())
                bar.setAttribute("height", currentHeight.toString())
                if (progress < 1) {
                    requestAnimationFrame(step)
                }
            }
            requestAnimationFrame(step)
        }
    }, [propHeight])

    /* --- Replace window resize listener with ResizeObserver --- */
    useEffect(() => {
        // Debounce function
        const debounce = (func: () => void, wait: number) => {
            let timeout: ReturnType<typeof setTimeout>
            return function executedFunction(...args: any[]) {
                const later = () => {
                    clearTimeout(timeout)
                    func() // Call the function
                }
                clearTimeout(timeout)
                timeout = setTimeout(later, wait)
            }
        }

        // Debounced chart creation
        const debouncedCreateChart = debounce(createAccuracyChart, 250)

        // Create and observe with ResizeObserver
        const ro = new ResizeObserver(() => {
            debouncedCreateChart()
        })

        const currentChartRef = chartRef.current
        if (currentChartRef) {
            ro.observe(currentChartRef) // Observe the chart container div
            debouncedCreateChart() // Initial draw after mount
            // Optional: Force redraw after short delay if needed
            // setTimeout(debouncedCreateChart, 100)
        }

        // Cleanup function
        return () => {
            ro.disconnect()
            // Clean up tooltip if it exists
            if (tooltipRef.current && tooltipRef.current.parentNode) {
                tooltipRef.current.parentNode.removeChild(tooltipRef.current)
                tooltipRef.current = null
            }
        }
    }, [createAccuracyChart]) // Depend on createAccuracyChart

    return (
        <div className={`accuracy-chart-component ${className}`}>
            <style>{css}</style>
            <div className="chart-container">
                <div
                    className="accuracy-chart"
                    ref={chartRef}
                    style={{ height: "100%" }}
                ></div>
                <p className="chart-note">
                    Maitai's iterative fine‑tuning hits 99.2% accuracy on the
                    4th iteration, surpassing GPT‑4o‑mini by 4.5%.
                </p>
            </div>
        </div>
    )
}

// Add defaultProps for Framer canvas behavior
AccuracyChart.defaultProps = {
    width: "100%", // stretch horizontally by default
    height: 550, // Default height matches control
}

/* ---------- 3.  OPTIONAL PROPERTY CONTROLS ------------------------------ */
addPropertyControls(AccuracyChart, {
    height: {
        title: "Height",
        type: ControlType.Number,
        min: 300,
        max: 800,
        defaultValue: 550,
    },
})
