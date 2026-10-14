export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="animate-float absolute -left-40 -top-40 size-[36rem] rounded-full bg-violet-700/30 blur-[140px]" />
      <div className="animate-float-slow absolute -right-32 top-1/3 size-[32rem] rounded-full bg-cyan-500/20 blur-[140px]" />
      <div className="absolute -bottom-48 left-1/4 size-[40rem] animate-pulse rounded-full bg-indigo-900/40 blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#09090b_75%)]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  )
}