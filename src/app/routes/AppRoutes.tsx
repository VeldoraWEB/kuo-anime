import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/app/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import ProfilePage from '@/pages/ProfilePage'
import MyListPage from '@/pages/MyListPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'

const WatchPage = lazy(() => import('@/pages/WatchPage'))
const PageLoader = () => (
  <div className="flex h-[50vh] items-center justify-center text-zinc-500">
    Загрузка плеера...
  </div>
)

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/anime/:slug" element={<WatchPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/my-list" element={<MyListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}