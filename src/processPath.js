import fs from 'fs'
import path from 'path'

let numDirectories = 0
let numFiles = 0

export default function processPath({
  dryRun = false,
  renameDirectories = false,
  src,
}) {
  const dirents = fs.readdirSync(src, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  dirents
    .filter((dirent) => {
      const { ext } = path.parse(dirent.name)

      return dirent.isFile() && ext === '.heic'
    })
    .forEach((dirent) => {
      const { name } = path.parse(dirent.name)

      const duplicateJpgDirent = dirents.find((dirent) => {
        const { name: jpgName, ext } = path.parse(dirent.name)

        return ext === '.jpg' && jpgName === name
      })

      if (!duplicateJpgDirent) {
        return
      }

      const jpgPath = path.join(src, duplicateJpgDirent.name)

      if (dryRun) {
        console.log(`rm ${jpgPath}`)
      } else {
        fs.rmSync(jpgPath)
      }

      numFiles += 1
    })

  return {
    numDirectories,
    numFiles,
  }
}
