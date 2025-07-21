import { ActionButton, ActionButtonProps } from '@/components'
import { FaEllipsis } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'

export const SettingsButton = ({ ...props }: ActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCreateProfileClick = () => {
    setIsOpen(false)
  }

  const handleSelectProfileClick = () => {
    setIsOpen(false)
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <ActionButton {...props} onClick={toggleMenu}>
        <FaEllipsis className="w-4 h-4 text-zinc-300" />
      </ActionButton>
      {isOpen && (
        <div className="absolute top-full right-0 left-auto mt-2 w-55 rounded-2xl bg-zinc-800 shadow-2xl z-50">
          <div className="grid grid-rows-2 gap-2 p-2">
            <button
              key="Creer un profil"
              onClick={handleCreateProfileClick}
              className="flex flex-col text-zinc-300 hover:bg-zinc-700 rounded-lg p-2 transition cursor-pointer"
            >
              <span className="text-xs text-right mt-1">Creer un profil</span>
            </button>
            <button
              key="Selectionner un profil"
              onClick={handleSelectProfileClick}
              className="flex flex-col text-zinc-300 hover:bg-zinc-700 rounded-lg p-2 transition cursor-pointer"
            >
              <span className="text-xs text-right mt-1">Selectionner un profil</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
