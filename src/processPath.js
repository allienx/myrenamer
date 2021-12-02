import fs from 'fs'
import path from 'path'

import sortBy from 'lodash/sortBy.js'

import getNewFilename from './getNewFilename.js'

let numDirectories = 0
let numFiles = 0

export default function processPath({ dryRun = false, src }) {
  const dirents = fs.readdirSync(src, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  const fileNameGroupings = {}
  const fileNames = sortBy(
    dirents
      .filter((dirent) => dirent.isFile())
      .filter((dirent) => dirent.name !== '.DS_Store')
      .map((dirent) => dirent.name),
  )

  fileNames.forEach((fileName) => {
    const { name } = path.parse(fileName)

    const grouping = fileNameGroupings[name] || []

    grouping.push(path.join(src, fileName))

    fileNameGroupings[name] = grouping
  })

  Object.values(fileNameGroupings).forEach((filePaths, index) => {
    const newPaths = getNewFilename({ index, filePaths })

    newPaths.forEach((newPath, i) => {
      const oldPath = filePaths[i]

      if (dryRun) {
        console.log(`${oldPath} => ${newPath}`)
      } else {
        fs.renameSync(oldPath, newPath)
      }

      numFiles += 1
    })
  })

  return {
    numDirectories,
    numFiles,
  }
}
