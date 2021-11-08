import fs from 'fs'
import path from 'path'

import getNewDirectoryName from './getNewDirectoryName.js'
import getNewFilename from './getNewFilename.js'

let numDirectories = 0
let numFiles = 0

export default function processPath({
  dryRun = false,
  renameDirectories = false,
  src,
  dest,
}) {
  const dirents = fs.readdirSync(src, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  dirents.forEach((dirent, index) => {
    const oldPath = path.join(src, dirent.name)

    if (renameDirectories) {
      const newPath = getNewDirectoryName({ index, dirPath: oldPath })

      if (dryRun) {
        console.log(`${oldPath} => ${newPath}`)
      } else {
        fs.renameSync(oldPath, newPath)
      }

      numDirectories += 1

      return
    }

    if (dirent.isDirectory()) {
      processPath({ src: oldPath, dest })

      numDirectories += 1

      return
    }

    if (dirent.isFile()) {
      const newPath = getNewFilename({ index, filePath: oldPath })

      if (dryRun) {
        console.log(`${oldPath} => ${newPath}`)
      } else {
        fs.renameSync(oldPath, newPath)
      }

      numFiles += 1
    }
  })

  return {
    numDirectories,
    numFiles,
  }
}
