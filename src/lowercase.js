import rename from './utils/rename.js'

export default async function lowercase({ dir, dryRun, recursive }) {
  await rename({
    dir,
    dryRun,
    recursive,

    getNewName: ({ name, ext }) => {
      return `${name.toLowerCase()}${ext.toLowerCase()}`
    },
  })
}
