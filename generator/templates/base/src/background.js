'use strict'

import path from 'path'
import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { EvContextMenu, EvMenu, EvStore, EvWindow } from 'evwt/background'

// EvStore returns the electron-store instance the frontend uses
// See: https://github.com/sindresorhus/electron-store
const store = EvStore.activate();

// Set up IPC event handlers for EvContextMenu
EvContextMenu.activate();

// Set up IPC event handlers for EvMenu
EvMenu.activate()

<% if (devtoolsExtensionsBroken) { %>// <% } %>import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const options = {
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      preload: path.join(__dirname, 'preload.js')
    }
  }

  const restoreId = 'main'; // can be a file path, database ID, etc in multiwindow apps
  const evWindow = new EvWindow(restoreId, options);
  const win = evWindow.browserWindow; // access the browserWindow for the full Electron API

  // Starting using EvMenu with this window
  EvMenu.attach(win)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    <% if (devtoolsExtensionsBroken) { %>// Devtools extensions are broken in Electron  6/7/<8.25 on Windows
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment the following lines (and the import at the top of the file)
    // In addition, if you upgrade to Electron ^8.2.5 or ^9.0.0 then devtools should work fine

    // try {
    //   await installExtension(VUEJS_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
<% } else { %>try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }<% } %>
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
