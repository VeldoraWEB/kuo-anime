import { Routes, Route } from 'react-router-dom'
import RootLayout from '@/app/layouts/RootLayout'
import HomePage from '@/pages/HomePage'
import ProfilePage from '@/pages/ProfilePage'
import MyListPage from '@/pages/MyListPage'
import LoginPage from '@/pages/LoginPage'
import WatchPage from '@/pages/WatchPage'
import NotFoundPage from '@/pages/NotFoundPage'

export default function AppRoutes() {
  return (
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
  )
}