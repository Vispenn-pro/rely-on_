import { Content, RootLayout, Sidebar, DraggableTopBar } from '@/components'
import { useAtomValue } from 'jotai'
import { currentApplicationAtom } from './store'
import { useEffect, useState } from 'react'
import { AppComponents, APPLICATIONS_MAP } from './components/applications'

const App = () => {

  const currentApplication = useAtomValue(currentApplicationAtom)
  const [currentApp, setCurrentApp] = useState<AppComponents | null>(null)

  useEffect(() => {
    if (currentApplication && currentApplication.name in APPLICATIONS_MAP) {
      setCurrentApp(APPLICATIONS_MAP[currentApplication.name])
    } else {
      setCurrentApp(null)
    }
  }, [currentApplication])

  return (
    <>
      <DraggableTopBar />
      <RootLayout>
        <Sidebar className="p-2">
          {currentApp && <currentApp.Sidebar />}
        </Sidebar>
        <Content className="border-l bg-zinc-900/50 border-l-white/20">
          {currentApp && <currentApp.Content />}
        </Content>
      </RootLayout>
    </>
  )
}

export default App
