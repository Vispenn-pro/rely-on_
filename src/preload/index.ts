import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    close: () => ipcRenderer.send('close-window'),
    maximize: () => ipcRenderer.send('toggle-maximize-window'),
    minimize: () => ipcRenderer.send('minimize-window')
  })
} catch (error) {
  console.log(error)
}
