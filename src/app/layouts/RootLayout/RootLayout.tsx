import { Outlet } from 'react-router-dom'
import { Header } from '@/widgets/header'
import AmbientBackground from '@/widgets/ambient-background'
import { useAuthSync } from '@/app/model/useAuthSync'

export default function RootLayout() {
  useAuthSync()

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-[#09090b] text-zinc-100 selection:bg-violet-500/40">
      <AmbientBackground />
      <div className="fixed inset-x-0 top-0 z-50">
        <Header />
      </div>
      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}