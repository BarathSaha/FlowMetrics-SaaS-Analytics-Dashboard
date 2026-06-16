import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { useAppStore } from '../store/useAppStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'

function Toggle({ enabled, onChange }) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        enabled ? 'bg-brand-500 shadow-glow' : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow`}
      />
    </motion.button>
  )
}

export default function Settings() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
  })
  const [avatar, setAvatar] = useState(null)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
  })

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setAvatar(ev.target.result)
      reader.readAsDataURL(file)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl space-y-6">
      <motion.div variants={item} className="card">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Profile</h3>
        <div className="mb-6 flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-200 ring-2 ring-brand-500/20 dark:bg-gray-700"
          >
            {avatar ? (
              <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-2xl font-bold text-gray-400">
                JD
              </div>
            )}
          </motion.div>
          <div>
            <label className="cursor-pointer rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              Upload photo
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            <p className="mt-1 text-xs text-gray-400">PNG or JPG, max 2MB</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
            <Input
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <Input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>
        </div>
      </motion.div>

      <motion.div variants={item} className="card">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode</p>
            <p className="text-xs text-gray-400">Toggle between light and dark theme</p>
          </div>
          <Toggle enabled={theme === 'dark'} onChange={toggleTheme} />
        </div>
      </motion.div>

      <motion.div variants={item} className="card">
        <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <p className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                {key.replace('_', ' ')} notifications
              </p>
              <Toggle
                enabled={value}
                onChange={() => setNotifications({ ...notifications, [key]: !value })}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={item}>
        <Button variant="gradient" onClick={handleSave} size="lg">
          Save Settings
        </Button>
      </motion.div>
    </motion.div>
  )
}
