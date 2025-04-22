// ───────────────────────────────────────────────────────────────────────────
//  TTFTComparison.tsx  – Build 2025‑04‑20 RevAlign Final
// ───────────────────────────────────────────────────────────────────────────
import * as React from "react"
import { useEffect, useRef, useCallback, MutableRefObject } from "react"
import { addPropertyControls, ControlType } from "framer"

/* ------------------------------------------------------------------ */
/* 1. INLINE CSS – responsive, overflow clipped, grouped logos         */
/* ------------------------------------------------------------------ */
const css = `
:root {
  --pri: #21B892;
  --txt: #212121;
  --sub: #666;
  --ff: 'Greycliff CF',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
}
.ttft {
  width: 100%;
  padding: 24px 16px;
  background: #fff;
  font-family: var(--ff);
  box-sizing: border-box;
  text-align: center;
}
.title {
  font: 700 32px/1 var(--ff);
  margin: 0 0 18px;
  color: var(--txt);
}
.desc {
  max-width: 740px;
  margin: 0 auto 26px;
  font: 19px/1.55 var(--ff);
  color: var(--txt);
}
.conn-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.conn {
  width: 75%;
  max-width: 1040px;
  display: grid;
  grid-template-columns: 200px 1fr 60px 48px;
  align-items: center;
  gap: 12px 18px;
  padding: 10px 0;
  box-sizing: border-box;
}
@media (max-width: 768px) {
  .conn {
    width: clamp(300px, 90%, 100%);
    grid-template-columns: 1fr 3fr  auto;
    gap: 8px 12px;
    padding: 8px 0;
  }
}
@media (max-width: 480px) {
  .conn {
    width: 100%;
    grid-template-columns: 1fr  auto;
    gap: 6px 8px;
    padding: 6px 0;
  }
  .logos-right, .latency, .user, .disclaimer-note {
    display: none;
  }
  .line {
    height: 20px;
    border-radius: 10px;
  }
}
.logos {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.logos-left,
.logos-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
.logos-left img,
.logos-right img {
  width: 90px;
  height: auto;
  object-fit: contain;
}
.legacy-text {
  font: 500 18px var(--ff);
  color: var(--sub);
}
.plus {
  font: 500 22px var(--ff);
  color: var(--sub);
}

.line {
  height: 24px;
  background: var(--pri);
  border-radius: 12px;
  position: relative;
  overflow: hidden; /* clip ripples cleanly */
  box-shadow: 0 3px 10px rgba(33,184,146,0.22);
}
.legacy .line {
  background: #888;
  box-shadow: 0 3px 10px rgba(136,136,136,0.25);
}
.latency {
  font: 700 16px var(--ff);
  color: var(--txt);
  text-align: right;
}
.user {
  width: 36px;
  height: 36px;
  padding: 6px;
  border-radius: 50%;
  background: rgba(0,0,0,0.04);
  color: #444;
}
.endpoint {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  background: rgba(0,0,0,0.1);
  border-radius: 50%;
  transform: translateY(-50%);
  box-shadow: 0 0 4px rgba(0,0,0,0.2);
  z-index: 1;
}
.endpoint.left { left: 4px; }
.endpoint.right { right: 4px; }

@keyframes ping {
  0%   { transform: translate(-50%,-50%) scale(0.4); opacity:0.9; }
  60%  { transform: translate(-50%,-50%) scale(1.6); opacity:0.35; }
  100% { transform: translate(-50%,-50%) scale(2.3); opacity:0; }
}
@keyframes growLeft   { from{width:0;left:0;} to{width:100%;left:0;} }
@keyframes growRight  { from{width:0;right:0;}to{width:100%;right:0;} }
@keyframes collapseLeft  { from{transform-origin:left;transform:scaleX(1);} to{transform-origin:left;transform:scaleX(0);} }
@keyframes collapseRight { from{transform-origin:right;transform:scaleX(1);}to{transform-origin:right;transform:scaleX(0);} }

.msg {
  position: absolute;
  top: 50%;
  height: 5px;
  border-radius: 3px;
  transform: translateY(-50%);
  background: #fff;
  box-shadow: 0 0 10px 2px rgba(255,255,255,0.7);
  opacity: 0.9;
  pointer-events: none;
}
.anim-endpoint {
  position: absolute;
  top: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  transform: translate(-50%,-50%);
  animation: ping 0.65s ease-out forwards;
  pointer-events: none;
  z-index: 5;
  background: var(--pri);
}
.legacy .anim-endpoint { background: #888; }

@keyframes holdIn  { from{opacity:0;}to{opacity:0.9;} }
@keyframes holdOut { from{opacity:0.9;}to{opacity:0;} }
.hold-dot {
  position: absolute;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
  transform: translate(-50%,-50%);
  opacity: 0;
  pointer-events: none;
  z-index: 4;
}
.legacy .hold-dot { background: #f4f4f4; }

/* Tablet */
@media (max-width: 768px) {
  .ttft .title { font-size: 24px; line-height: 1.2; }
  .ttft .desc  { font-size: 16px; max-width: 90%; }
  .conn {
    width: clamp(300px, 90%, 100%);
    grid-template-columns: 1fr 3fr  auto;
    gap: 8px 12px;
    padding: 8px 0;
  }
  .latency { font-size: 14px; }
  .user    { width: 28px; height: 28px; padding: 4px; }
}

/* Mobile */
@media (max-width: 480px) {
  .ttft .title { font-size: 20px; }
  .ttft .desc  { font-size: 14px; }
  .conn {
    width: 100%;
    grid-template-columns: 1fr  auto;
    gap: 6px 8px;
    padding: 6px 0;
  }
  .logos-right, .latency, .user, .disclaimer-note {
    display: none;
  }
  .line {
    height: 20px;
    border-radius: 10px;
  }
}

/* Disclaimer Note */
.disclaimer-note {
  margin-top: 20px;
  font-style: italic;
}
`

/* ------------------------------------------------------------------ */
/* 2. HELPERS                                                        */
/* ------------------------------------------------------------------ */
const clearTimers = (ref: MutableRefObject<NodeJS.Timeout[]>) => {
    ref.current.forEach(clearTimeout)
    ref.current = []
}
const addTimer = (
    ref: MutableRefObject<NodeJS.Timeout[]>,
    cb: () => void,
    delay: number
) => {
    const id = setTimeout(cb, delay)
    ref.current.push(id)
}
const addEndpoints = (line: HTMLElement | null) => {
    if (!line) return
    line.querySelectorAll(".endpoint").forEach((e) => e.remove())
    ;(["left", "right"] as const).forEach((side) => {
        const d = document.createElement("div")
        d.className = `endpoint ${side}`
        line.appendChild(d)
    })
}

/* ------------------------------------------------------------------ */
/* 3. COMPONENT                                                      */
/* ------------------------------------------------------------------ */
interface Props {
    maitaiLatency?: number
    legacyLatency?: number
    maitaiLogo?: string
    phonelyLogo?: string
    className?: string
}

export function TTFTComparison({
    maitaiLatency = 179,
    legacyLatency = 661,
    maitaiLogo,
    phonelyLogo,
    className = "",
}: Props): React.ReactElement {
    const mLine = useRef<HTMLDivElement>(null)
    const lLine = useRef<HTMLDivElement>(null)
    const timersM = useRef<NodeJS.Timeout[]>([])
    const timersL = useRef<NodeJS.Timeout[]>([])

    const setRowWidth = useCallback(() => {
        // Width is now handled by CSS clamp(), this function might be removable
        // or adjusted if needed for other dynamic calculations.
        // For now, let's keep it minimal or comment out if unused.
        const rows = document.querySelectorAll(
            ".conn"
        ) as NodeListOf<HTMLElement>
        // Original logic (potentially remove if CSS handles all width):
        // const parent = rows[0]?.closest(".ttft") as HTMLElement | null
        // const w = parent ? Math.floor(parent.offsetWidth * 0.75) : 0;
        // rows.forEach((r) => (r.style.width = `${w}px`))
        // No-op for now, as CSS handles width
    }, [])

    const bar = (line: HTMLElement, right: boolean, hop: number) => {
        const b = document.createElement("div")
        b.className = "msg"
        const grow = right ? "growRight" : "growLeft"
        const collapse = right ? "collapseLeft" : "collapseRight"
        b.style.animation = `${grow} ${hop}ms linear forwards, ${collapse} 200ms ${hop}ms ease-in forwards`
        line.appendChild(b)
    }

    const run = useCallback(
        (line: HTMLDivElement | null, isM: boolean) => {
            if (!line) return
            line.querySelectorAll(".msg,.anim-endpoint").forEach((e) =>
                e.remove()
            )
            const timers = isM ? timersM : timersL
            const hop = 300
            const think = (isM ? maitaiLatency : legacyLatency) * 3

            const ping = (side: "left" | "right", hold: number) => {
                if (!line.isConnected) return
                const f = document.createElement("div")
                f.className = "anim-endpoint"
                f.style[side] = "0px"
                line.appendChild(f)
                addTimer(timers, () => f.remove(), 700)

                const d = document.createElement("div")
                d.className = "hold-dot"
                d.style[side] = "0px"
                line.appendChild(d)
                d.style.animation = "holdIn 120ms ease-out forwards"
                addTimer(
                    timers,
                    () => {
                        d.style.animation = "holdOut 180ms ease-in forwards"
                        addTimer(timers, () => d.remove(), 200)
                    },
                    hold
                )
            }

            bar(line, true, hop)
            addTimer(timers, () => ping("left", think), hop)
            addTimer(
                timers,
                () => {
                    bar(line, false, hop)
                    addTimer(timers, () => ping("right", 300), hop)
                },
                hop + think
            )

            addTimer(timers, () => run(line, isM), hop + think + hop + 500)
        },
        [maitaiLatency, legacyLatency]
    )

    useEffect(() => {
        let raf: number
        const start = () => {
            addEndpoints(mLine.current)
            addEndpoints(lLine.current)
            setRowWidth()
            run(mLine.current, true)
            run(lLine.current, false)
        }
        const container = mLine.current?.closest(".ttft") as HTMLElement | null
        const ro = new ResizeObserver(() => setRowWidth())
        const init = () => {
            if (mLine.current && lLine.current && container) {
                ro.observe(container)
                start()
            } else {
                raf = requestAnimationFrame(init)
            }
        }
        raf = requestAnimationFrame(init)
        return () => {
            cancelAnimationFrame(raf)
            ro.disconnect()
            clearTimers(timersM)
            clearTimers(timersL)
        }
    }, [setRowWidth, run])

    return (
        <div className={`ttft ${className}`}>
            <style>{css}</style>
            <div className="conn-wrap">
                <div className="conn maitai">
                    <span className="logos">
                        <span className="logos-left">
                            {maitaiLogo ? (
                                <img src={maitaiLogo} alt="Maitai" />
                            ) : null}
                        </span>
                        <span className="logos-right">
                            <span className="plus">+</span>
                            {phonelyLogo ? (
                                <img src={phonelyLogo} alt="Phonely" />
                            ) : null}
                        </span>
                    </span>
                    <div className="line" ref={mLine} />
                    <span className="latency">{maitaiLatency} ms</span>
                    <UserIcon />
                </div>
                <div className="conn legacy">
                    <span className="logos">
                        <span className="logos-left">
                            <span className="legacy-text">Legacy</span>
                        </span>
                        <span className="logos-right">
                            <span className="plus">+</span>
                            {phonelyLogo ? (
                                <img src={phonelyLogo} alt="Phonely" />
                            ) : null}
                        </span>
                    </span>
                    <div className="line" ref={lLine} />
                    <span className="latency">{legacyLatency} ms</span>
                    <UserIcon />
                </div>
            </div>
            {/* Disclaimer Note */}
            <p className="disclaimer-note">
                Note: Animation speed slowed 3x for demonstration.
            </p>
        </div>
    )
}

/* ------------------------------------------------------------------ */
/* 4. USER ICON                                                       */
/* ------------------------------------------------------------------ */
const UserIcon: React.FC = () => (
    <svg
        className="user"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx={12} cy={7} r={4} />
    </svg>
)

/* ------------------------------------------------------------------ */
/* 5. DEFAULTS & PROPERTY CONTROLS                                   */
/* ------------------------------------------------------------------ */
TTFTComparison.defaultProps = {
    maitaiLatency: 179,
    legacyLatency: 661,
    maitaiLogo: "",
    phonelyLogo: "",
} as Partial<Props>

addPropertyControls(TTFTComparison, {
    maitaiLatency: {
        type: ControlType.Number,
        title: "Maitai Latency",
        defaultValue: 179,
        min: 50,
    },
    legacyLatency: {
        type: ControlType.Number,
        title: "Legacy Latency",
        defaultValue: 661,
        min: 100,
    },
    maitaiLogo: {
        type: ControlType.File,
        title: "Maitai Logo",
        allowedFileTypes: ["png", "jpg", "jpeg", "svg", "webp"],
    },
    phonelyLogo: {
        type: ControlType.File,
        title: "Phonely Logo",
        allowedFileTypes: ["png", "jpg", "jpeg", "svg", "webp"],
    },
})
