// Default cross-platform EvMenu
const isMac = process.platform === 'darwin'

const menu = [
  {
    label: 'File',
    id: 'file',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Edit',
    id: 'edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'selectAll' },
      ...(isMac ? [
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      ] : [])
    ]
  },
  {
    label: 'View',
    id: 'view',
    submenu: [
      { role: 'toggledevtools' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    label: 'Window',
    id: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      { type: 'separator' },
      ...(isMac ? [
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]

if (isMac) {
  menu.unshift({ role: 'appMenu' })
}

export default menu
