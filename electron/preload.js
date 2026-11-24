const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('velaDesktop', {
  isElectron: true,
  window: {
    minimize: () => ipcRenderer.send('win:minimize'),
    maximize: () => ipcRenderer.send('win:maximize'),
    close: () => ipcRenderer.send('win:close')
  },
  dialogs: {
    openFiles: () => ipcRenderer.invoke('dialog:openFiles'),
    openFolder: () => ipcRenderer.invoke('dialog:openFolder')
  },
  media: {
    probe: (filePath) => ipcRenderer.invoke('media:probe', filePath)
  },
  mpv: {
    command: (args) => ipcRenderer.invoke('mpv:command', args),
    setProperty: (name, value) => ipcRenderer.invoke('mpv:setProperty', name, value),
    getProperty: (name) => ipcRenderer.invoke('mpv:getProperty', name),
    getMediaInfo: () => ipcRenderer.invoke('mpv:getMediaInfo'),
    onEvent: (cb) => {
      const listener = (_e, data) => cb(data);
      ipcRenderer.on('mpv:event', listener);
      return () => ipcRenderer.removeListener('mpv:event', listener);
    }
  }
});
