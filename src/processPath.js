const fs = require('fs')
const path = require('path')

const renameDirectory = require('./renameDirectory')
const renameFile = require('./renameFile')

module.exports = processPath

function processPath({ renameDirectories = false, src, dest }) {
  let numDirectories = 0
  let numFiles = 0

  const dirents = fs.readdirSync(src, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  dirents.forEach((dirent) => {
    const oldPath = path.join(src, dirent.name)

    if (renameDirectories) {
      const newPath = renameDirectory({ dirPath: oldPath })

      fs.renameSync(oldPath, newPath)

      numDirectories += 1

      return
    }

    if (dirent.isDirectory()) {
      processPath({ src: oldPath, dest })

      numDirectories += 1

      return
    }

    if (dirent.isFile()) {
      const newPath = renameFile({ filePath: oldPath })

      fs.renameSync(oldPath, newPath)

      numFiles += 1
    }
  })

  return {
    numDirectories,
    numFiles,
  }
}
