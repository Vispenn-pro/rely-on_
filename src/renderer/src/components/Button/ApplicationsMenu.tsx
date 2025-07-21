import { useState, useRef, useEffect } from 'react'
import { TbGridDots } from 'react-icons/tb'
import { ActionButton, ActionButtonProps } from './ActionButton'

import { APPLICATIONS } from '@shared/constant'
import { ApplicationType } from '@shared/types'
import { useSetAtom } from 'jotai'
import { currentApplicationAtom } from '@renderer/store'

type ApplicationsMenuProps = ActionButtonProps

export default function ApplicationsMenu(props: ApplicationsMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const setCurrentApplication = useSetAtom(currentApplicationAtom)

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

  const handleAppClick = (application: ApplicationType) => {
    setIsOpen(false)
    setCurrentApplication(application)
  }

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <ActionButton {...props} onClick={toggleMenu}>
        <TbGridDots />
      </ActionButton>

      {isOpen && (
        <div className="absolute top-full right-0 left-auto mt-2 w-55 rounded-2xl bg-white shadow-2xl z-50">
          <div className="grid grid-cols-3 gap-2 p-2">
            {APPLICATIONS.map((application) => (
              <button
                key={application.name}
                onClick={() => handleAppClick(application)}
                className="flex flex-col items-center text-gray-700 hover:bg-gray-100 rounded-lg p-2 transition cursor-pointer"
              >
                {application.icon}
                <span className="text-xs mt-1">{application.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
