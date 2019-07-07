/* globals INCLUDE_RESOURCES_PATH */

// Set `__resources` path to resources files in main process
import { app } from 'electron'

// Load here all startup windows
import './mainWindow'

global.__resources = INCLUDE_RESOURCES_PATH // eslint-disable-line no-unused-expressions
// noinspection BadExpressionStatementJS

if (__resources === undefined) console.error('[Main-process]: Resources path is undefined')

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})
