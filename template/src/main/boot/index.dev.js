/* eslint-disable */
import fs from 'fs'
import path from 'path'
import { Menu, MenuItem, app } from 'electron'
import { ELECTRON_RELAUNCH_CODE } from '../../../.electron-nuxt/config'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'


// work around https://github.com/MarshallOfSound/electron-devtools-installer/issues/122
// which seems to be a result of https://github.com/electron/electron/issues/19468
if (process.platform === 'win32') {
  const appUserDataPath = app.getPath('userData');
  const devToolsExtensionsPath = path.join(appUserDataPath, 'DevTools Extensions');
  try {
    fs.unlinkSync(devToolsExtensionsPath);
  } catch (_) {
    // don't complain if the file doesn't exist
  }
}

app.on('ready', () => {
  const menu = Menu.getApplicationMenu()
  const refreshButton = new MenuItem({
    label: 'Relaunch electron',
    accelerator: 'CommandOrControl+E',
    click: () => {
      app.exit(ELECTRON_RELAUNCH_CODE)
    }
  })
  menu.append(refreshButton)
  Menu.setApplicationMenu(menu)
})


// Require `main` process to boot app
require('../index')
