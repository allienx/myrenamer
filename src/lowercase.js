import path from 'path'
import rename from './utils/rename.js'

export default async function lowercase({ dir, dryRun, recursive }) {
  await rename({
    dir,
    dryRun,
    recursive,

    getNewName: ({ filePath }) => {
      const { name } = path.parse(filePath)

      return name.toLowerCase()
    },
  })
}
