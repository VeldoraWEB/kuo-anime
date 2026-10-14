import { useState, useEffect } from 'react'
import { useAuthStore, updateProfile } from '@/entities/user'
import AvatarSection from './AvatarSection'
import ProfileInfoForm from './ProfileInfoForm'

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user)
  const updateUserData = useAuthStore((s) => s.updateUserData)

  const [displayName, setDisplayName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState(false)

  useEffect(() => {
    if (user) {
      setDisplayName(user.name)
      setSelectedAvatar(user.avatarId ?? 1)
    }
  }, [user?.id])

  const handleCancel = () => {
    setDisplayName(user?.name ?? '')
    setSelectedAvatar(user?.avatarId ?? 1)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateProfile({ name: displayName, avatarId: selectedAvatar })
      updateUserData({ name: displayName, avatarId: selectedAvatar })
      setSavedMessage(true)
      setTimeout(() => setSavedMessage(false), 2000)
    } catch (e) {
      console.error('Save failed:', e)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Profile</h1>
        <p className="mt-1.5 text-sm text-zinc-500">Manage your identity</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <AvatarSection
          selectedAvatar={selectedAvatar}
          onSelect={setSelectedAvatar}
        />
        <ProfileInfoForm
          displayName={displayName}
          onDisplayNameChange={setDisplayName}
          email={user?.email ?? ''}
          isSaving={isSaving}
          savedMessage={savedMessage}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}