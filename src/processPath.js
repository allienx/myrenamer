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
    const fullPathStr = path.join(src, dirent.name)

    if (renameDirectories) {
      renameDirectory({ dirPath: fullPathStr })

      numDirectories += 1

      return
    }

    if (dirent.isDirectory()) {
      processPath({ src: fullPathStr, dest })

      numDirectories += 1

      return
    }

    if (dirent.isFile()) {
      renameFile({ filePath: fullPathStr })

      numFiles += 1
    }
  })

  return {
    numDirectories,
    numFiles,
  }
}
