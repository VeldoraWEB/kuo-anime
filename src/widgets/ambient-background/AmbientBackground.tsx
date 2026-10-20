export default function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="animate-float absolute -left-40 -top-40 size-[36rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.3)_0%,transparent_70%)]" />
      
      <div className="animate-float-slow absolute -right-32 top-1/3 size-[32rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)]" />
      
      <div className="absolute -bottom-48 left-1/4 size-[40rem] animate-pulse rounded-full bg-[radial-gradient(circle_at_center,rgba(49,46,129,0.4)_0%,transparent_70%)]" />
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,#09090b_75%)]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />
    </div>
  )
}