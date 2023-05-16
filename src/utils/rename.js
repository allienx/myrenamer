import fsPromises from 'fs/promises'
import { glob } from 'glob'
import path from 'path'

export default async function rename({
  dir,
  dryRun,
  recursive,
  getSortedPaths,
  getNewName,
}) {
  let numFiles = 0

  // Per node-glob documentation, always use '/' as the path separator.
  const globDir = dir.replace('\\', '/')
  const globPaths = await glob(recursive ? `${globDir}/**/*` : `${globDir}/*`)
  const filePaths = getSortedPaths ? getSortedPaths(globPaths) : globPaths

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i]
    const stats = await fsPromises.stat(filePath)

    if (!stats.isFile()) {
      continue
    }

    const { dir: fileDir, name, ext } = path.parse(filePath)
    const newFileName = getNewName({
      index: i,
      filePath,
      fileDir,
      name,
      ext,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
    })

    const newFilePath = `${path.join(dir, newFileName)}`

    if (dryRun) {
      console.log(`[DRY-RUN] ${filePath} -> ${newFilePath}`)
    } else {
      await fsPromises.rename(filePath, newFilePath)
    }

    numFiles += 1
  }

  console.log(
    dryRun
      ? `[DRY-RUN] Renamed ${numFiles} files.`
      : `Renamed ${numFiles} files.`,
  )

  return {
    numFiles,
  }
}
