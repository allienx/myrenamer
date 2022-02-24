import fs from 'fs'
import path from 'path'
import sortBy from 'lodash/sortBy.js'

import getNewDirectoryName from './getNewDirectoryName.js'
import getNewFilename from './getNewFilename.js'

let numDirectories = 0
let numFiles = 0

export default function processPath({
  dryRun = false,
  renameDirectories = false,
  prefix,
  src,
}) {
  const dirents = fs.readdirSync(src, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  sortBy(dirents, 'name').forEach((dirent, index) => {
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
      processPath({ dryRun, renameDirectories, src: oldPath })

      numDirectories += 1

      return
    }

    if (dirent.isFile()) {
      const newPath = getNewFilename({ index, prefix, filePath: oldPath })

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
