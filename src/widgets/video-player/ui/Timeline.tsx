import type { RefObject } from 'react'

type Props = {
  progressFillRef: RefObject<HTMLDivElement | null>
  progressKnobRef: RefObject<HTMLDivElement | null>
  tooltipRef: RefObject<HTMLDivElement | null>
  tooltipTimeRef: RefObject<HTMLSpanElement | null>
  onMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onClick: (e: React.PointerEvent<HTMLDivElement>) => void
}

export default function Timeline({
  progressFillRef,
  progressKnobRef,
  tooltipRef,
  tooltipTimeRef,
  onMove,
  onClick,
}: Props) {
  return (
    <div className="group/timeline relative flex h-4 items-center" onMouseMove={onMove}>
      <div className="relative h-1 w-full rounded-full bg-white/15 transition-all duration-200 group-hover/timeline:h-1.5">
        <div
          ref={progressFillRef}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
          style={{ width: '0%' }}
        />
        <div
          ref={progressKnobRef}
          className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white shadow-[0_0_12px_rgba(34,211,238,0.9)] transition-transform duration-200 group-hover/timeline:scale-100"
          style={{ left: '0%' }}
        />
      </div>

      <div
        ref={tooltipRef}
        className="pointer-events-none absolute bottom-full mb-4 -translate-x-1/2 rounded-lg bg-zinc-950/95 px-3 py-1.5 font-mono text-[15px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover/timeline:opacity-100"
        style={{ left: '0%' }}
      >
        <span ref={tooltipTimeRef}>0:00</span>
      </div>

      <div
        role="slider"
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onPointerDown={onClick}
        className="absolute inset-0 w-full cursor-pointer"
      />
    </div>
  )
}