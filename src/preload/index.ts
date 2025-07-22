import { contextBridge, ipcRenderer } from 'electron'
import kanbanContextBrigde from './kanbanContextBrigde'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    close: () => ipcRenderer.send('close-window'),
    maximize: () => ipcRenderer.send('toggle-maximize-window'),
    minimize: () => ipcRenderer.send('minimize-window')
  })

  contextBridge.exposeInMainWorld('kanban', kanbanContextBrigde)
} catch (error) {
  console.log(error)
}
